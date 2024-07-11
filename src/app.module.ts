import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { getEnvPath } from './shared/config/helpers';
import { MailParserUseCaseModule } from './mailparser/infrastructure/module/mailUseCaseModule';
import { MailParserController } from './mailparser/infrastructure/controller/mail-parser.controller';
import { ExceptionsModule } from '@shared/infrastructure/module/exceptions.module';

const dirname: string = path.dirname(__dirname);
const envFilePath: string = getEnvPath(`${dirname}/envs/`);

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath, isGlobal: true }),
        ExceptionsModule,
        MailParserUseCaseModule.register(),
    ],
    controllers: [MailParserController],
    providers: [],
})
export class AppModule {}
