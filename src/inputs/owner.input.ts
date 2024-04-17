import { InputType } from '@nestjs/graphql'

import { Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
@InputType()
export class CreateOwnerInput {
	@Field()
	@ApiProperty()
	name: string
}