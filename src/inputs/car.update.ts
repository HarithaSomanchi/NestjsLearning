import { InputType } from '@nestjs/graphql'

import { Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Owner } from '../models/owner'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Award } from '../models/award'
import { CreateOwnerInput } from './owner.input'
import { CreateAwardInput } from './award.input'
@InputType()
export class UpdateCarInput {
	@Field()
	@ApiProperty()
	name: string

	@ValidateNested({ each: true })
	@Type(() => Owner)
	@Field(() => Owner)
	@ApiProperty({ type: Owner })
	owner: Owner

	@Field()
	@ApiProperty()
	vehicleType: string

	@ValidateNested({ each: true })
	@Type(() => Award)
	@Field(() => [Award])
	@ApiProperty({ type: Award, isArray: true })
	awards: Award[]
}
