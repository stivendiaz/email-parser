import { DynamicModule, Module } from '@nestjs/common';

import { GetJsonFileUseCase } from 'src/mailparser/application';

import { UseCaseProxy } from '@shared/infrastructure/usecases-proxy/usecases-proxy';
import { MailParserService } from '../service/mail-parser.service';
import { WebpageService } from '../service/webpage.service';
import { MailParserServiceModule } from './mailParserServiceModule';
import { WebpageServiceModule } from './webpageServiceModule';

@Module({
    imports: [MailParserServiceModule, WebpageServiceModule],
})
export class MailParserUseCaseModule {
    static GET_JSON_FILE_USECASES_PROXY = 'getJsonFileUsecasesProxy';

    static register(): DynamicModule {
        return {
            module: MailParserUseCaseModule,
            providers: [
                {
                    inject: [MailParserService, WebpageService],
                    provide:
                        MailParserUseCaseModule.GET_JSON_FILE_USECASES_PROXY,
                    useFactory: (
                        mailparserService: MailParserService,
                        webpageService: WebpageService,
                    ) =>
                        new UseCaseProxy(
                            new GetJsonFileUseCase(
                                mailparserService,
                                webpageService,
                            ),
                        ),
                },
            ],
            exports: [MailParserUseCaseModule.GET_JSON_FILE_USECASES_PROXY],
        };
    }
}
