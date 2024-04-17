import { Injectable } from '@nestjs/common'
import { Context } from '../entities/context'

import { UpdateCarInput } from '../inputs/car.update'
import { CreateCarInput } from '../inputs/car.input'
import { createCarFromInput } from '../mappers/car.mapper'
import { updateCarFromInput } from '../mappers/car.mapper'
import { CarNotFound } from '../exceptions/car.not.found'
import { CarRepository } from '../repositories/car.repository'
import { Logger } from '@nestjs/common'
@Injectable()
export class CarService {
	readonly logger: Logger = new Logger(this.constructor.name)

	async delete(carId: string, context: Context) {
		const existingCarData = await this.carRepository.findById(carId)
		await this.carRepository.deleteById(carId)
	}

	async update(
		carId: string,
		updateCarInput: UpdateCarInput,
		context: Context
	) {
		const existingCarData = await this.carRepository.findById(carId)
		if (!existingCarData) {
			throw new CarNotFound('failed to getby Id carId}')
		}
		const updatedCar = updateCarFromInput(
			carId,
			updateCarInput,
			context,
			existingCarData
		)
		const savedCar = this.carRepository.save(updatedCar)
		return savedCar
	}

	async create(
		carId: string,
		createCarInput: CreateCarInput,
		context: Context
	) {
		const car = createCarFromInput(carId, createCarInput, context)
		const createdCar = await this.carRepository.save(car)
		return createdCar
	}

	async get(carId: string, context: Context) {
		const existingCar = await this.carRepository.findById(carId)
		if (!existingCar) {
			this.logger.error(`carId: ${carId} notFound`)
			throw new CarNotFound(`carId: ${carId} notFound`)
		}
		return existingCar
	}

	constructor(private carRepository: CarRepository) {}
}
