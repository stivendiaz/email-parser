import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { getEnvPath } from './shared/config/helpers';

const dirname: string = path.dirname(__dirname);
const envFilePath: string = getEnvPath(`${dirname}/envs/`);

@Module({
    imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
