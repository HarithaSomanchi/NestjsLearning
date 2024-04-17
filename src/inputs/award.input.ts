import { InputType } from '@nestjs/graphql'

import { Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
@InputType()
export class CreateAwardInput {
	@Field()
	@ApiProperty()
	name: string

	@Field()
	@ApiProperty()
	year: string
}