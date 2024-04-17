import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { Param } from '@nestjs/common'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'

import { CarService } from '../services/car.service'
import { Logger } from '@nestjs/common'
@Controller('/v1/')
export class CarQueryController {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Get('cars/:carId')
	async get(@Param('carId') carId: string, @ContextDecor() context: Context) {
		this.logger.log(`Received a get request for Car: ${carId}`)
		const existingCar = await this.carService.get(carId, context)
		this.logger.log(`Get request for Car ${carId} is complete `)
		return existingCar
	}

	constructor(private carService: CarService) {}
}
