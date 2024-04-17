import { Module } from '@nestjs/common'
import { LoggerAdapter } from './logger/logger.adapter'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import { DefaultService } from './rest/default'
import { HttpModule } from '@nestjs/axios'
import { CarController } from './controllers/car.mutation.controller'
import { CarQueryController } from './controllers/car.query.controller'
import { CarRepository } from './repositories/car.repository'
import { CarService } from './services/car.service'
import { HealthController } from './controllers/health.controller'
import { CarResolver } from './resolver/car.mutation.resolver'
import { CarQueryResolver } from './resolver/car.query.resolver'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Car } from './models/car'
import { CarSchema } from './models/Car'
import { MongoConfig } from './configurations/mongo.config'
import appconfiguration from './configurations/app.configuration'
@Module({
	controllers: [CarController, CarQueryController, HealthController],
	providers: [
		LoggerAdapter,
		DefaultService,
		CarService,
		CarRepository,
		CarQueryResolver,
		CarResolver,
	],
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
		}),
		HttpModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: MongoConfig,
		}),
		MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appconfiguration],
		}),
	],
	exports: [LoggerAdapter],
})
export class AppModule {}
