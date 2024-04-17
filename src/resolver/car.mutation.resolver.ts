import { Resolver } from '@nestjs/graphql'
import { v4 } from 'uuid'
import { Mutation } from '@nestjs/graphql'
import { Args } from '@nestjs/graphql'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'

import { UpdateCarInput } from '../inputs/car.update'
import { CreateCarInput } from '../inputs/car.input'
import { Car } from '../models/car'
import { CarService } from '../services/car.service'
import { Logger } from '@nestjs/common'
@Resolver(() => Car)
export class CarResolver {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Mutation(() => Car)
	async DeleteCar(
		@Args('carId') carId: string,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a delete request for : ${carId} `)
		await this.carService.delete(carId, context)
		this.logger.log(`Delete request completed for  ${carId} is complete `)
	}

	@Mutation(() => Car)
	async UpdateCar(
		@Args('carId') carId: string,
		@Args('createCarInput') updateCarInput: UpdateCarInput,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a update request for : ${carId}`)
		const updtedCar = await this.carService.update(
			carId,
			updateCarInput,
			context
		)
		this.logger.log(`Update request for  is complete: ${carId}`)
		return updtedCar
	}

	@Mutation(() => Car)
	async CreateCar(
		@Args('createCarInput') createCarInput: CreateCarInput,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a new create request `)
		const carId = v4()
		const created = await this.carService.create(
			carId,
			createCarInput,
			context
		)
		this.logger.log(`Create request for Car ${carId} is complete`)
		return created
	}

	constructor(private carService: CarService) {}
}
