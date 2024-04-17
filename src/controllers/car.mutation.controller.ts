import { Controller } from '@nestjs/common'
import { Response } from 'express'
import { v4 } from 'uuid'
import { Delete } from '@nestjs/common'
import { Param } from '@nestjs/common'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'

import { Put } from '@nestjs/common'
import { Body } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { UpdateCarInput } from '../inputs/car.update'
import { Res } from '@nestjs/common'

import { Post } from '@nestjs/common'
import { HttpCode } from '@nestjs/common'
import { CreateCarInput } from '../inputs/car.input'
import { CarService } from '../services/car.service'
import { Logger } from '@nestjs/common'
@Controller('/v1/')
export class CarController {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Delete('cars/:carId')
	async delete(
		@Param('carId') carId: string,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a delete request for : ${carId} `)
		await this.carService.delete(carId, context)
		this.logger.log(`Delete request completed for  ${carId} is complete `)
	}

	@Put('cars/:carId')
	async update(
		@Param('carId') carId: string,
		@Body(new ValidationPipe()) updateCarInput: UpdateCarInput,
		@ContextDecor() context: Context,
		@Res() response: Response
	) {
		this.logger.log(`Received a update request for : ${carId}`)
		const updtedCar = await this.carService.update(
			carId,
			updateCarInput,
			context
		)
		response.setHeader('Location', '/v1/cars/' + carId)
		response.json(updtedCar)
		this.logger.log(`Update request for  is complete: ${carId}`)
		return response
	}

	@Post('cars')
	@HttpCode(200)
	async create(
		@Body(new ValidationPipe()) createCarInput: CreateCarInput,
		@ContextDecor() context: Context,
		@Res() response: Response
	) {
		this.logger.log(`Received a new create request `)
		const carId = v4()
		const created = await this.carService.create(
			carId,
			createCarInput,
			context
		)
		response.setHeader('Location', '/v1/cars/' + carId)
		response.json(created)
		this.logger.log(`Create request for Car ${carId} is complete`)
		return response
	}

	constructor(private carService: CarService) {}
}
