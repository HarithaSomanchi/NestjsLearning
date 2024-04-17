import { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import { Context } from '../entities/context'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserContext } from '../entities/usercontext'

export const ContextDecor = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const type: string = ctx.getType()
		let request
		if (type === 'graphql') {
			const gqlContext = GqlExecutionContext.create(ctx)
			request = gqlContext.getContext().req
		} else {
			request = ctx.switchToHttp().getRequest()
		}
		if (request['user']) {
			return request['user']
		}
		return new Context(new UserContext('anonymous'), false)
	}
)
