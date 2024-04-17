import { InputType, ObjectType } from '@nestjs/graphql'

import { Prop } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Field } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
@ObjectType()
@InputType("AwardInput")
export class Award {
	@Prop()
	@ApiProperty()
	@Field()
	name: string

	@Prop()
	@ApiProperty()
	@Field()
	year: string

	@Prop()
	@ApiProperty()
	@Field(() => ID)
	awardId: string
}
