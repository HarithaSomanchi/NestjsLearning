import { Resolver } from '@nestjs/graphql'
import { Query } from '@nestjs/graphql'
import { Args } from '@nestjs/graphql'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'

import { Car } from '../models/car'
import { CarService } from '../services/car.service'
import { Logger } from '@nestjs/common'
@Resolver(() => Car)
export class CarQueryResolver {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Query(() => Car)
	async GetCar(
		@Args('carId') carId: string,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a get request for Car: ${carId}`)
		const existingCar = await this.carService.get(carId, context)
		this.logger.log(`Get request for Car ${carId} is complete `)
		return existingCar
	}

	constructor(private carService: CarService) {}
}
