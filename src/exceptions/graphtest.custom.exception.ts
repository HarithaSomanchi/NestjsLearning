import { HttpStatus } from '@nestjs/common'

import { HttpException } from '@nestjs/common'

export class GraphtestCustomException extends HttpException {
	constructor(
		message: string,
		status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
	) {
		super(message, status)
	}
}
