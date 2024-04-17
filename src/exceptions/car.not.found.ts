import { HttpStatus } from '@nestjs/common'

import { GraphtestCustomException } from './graphtest.custom.exception'

export class CarNotFound extends GraphtestCustomException {
	constructor(message: string) {
		super(message, HttpStatus.NOT_FOUND)
	}
}
