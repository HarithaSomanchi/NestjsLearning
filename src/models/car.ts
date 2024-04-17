import { Schema } from '@nestjs/mongoose'
import { InputType, ObjectType } from '@nestjs/graphql'

import { Prop } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Field } from '@nestjs/graphql'
import { Owner } from './owner'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Award } from './award'
import { ID } from '@nestjs/graphql'
import { SchemaFactory } from '@nestjs/mongoose'
@InputType("CarInput")
@Schema()
@ObjectType()
export class Car {
	@Prop()
	@ApiProperty()
	@Field()
	name: string

	@Prop()
	@ApiProperty({ type: Owner })
	@Field(() => Owner)
	//@Field(() => GraphQLJSONObject, { nullable: true })
	@ValidateNested({ each: true })
	@Type(() => Owner)
	owner: Owner

	@Prop()
	@ApiProperty()
	@Field()
	vehicleType: string

	@Prop()
	@ApiProperty({ type: Award, isArray: true })
	@Field(() => [Award])
	@ValidateNested({ each: true })
	@Type(() => Award)
	awards: Award[]

	@Prop()
	@ApiProperty()
	@Field(() => ID)
	carId: string

	@Prop()
	_id: string
}

export const CarSchema: SchemaFactory = SchemaFactory.createForClass(Car)
