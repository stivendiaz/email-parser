import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailParserUseCaseModule } from '../module/mailUseCaseModule';
import { UseCaseProxy } from '@shared/infrastructure/usecases-proxy/usecases-proxy';
import { GetJsonFileUseCase } from 'src/mailparser/application';
import { ExceptionsService } from '@shared/infrastructure/service/exceptions.service';

@Controller('mailParser')
@ApiTags('MailParser')
@ApiResponse({ status: 500, description: 'Internal server error' })
export class MailParserController {
    constructor(
        @Inject(MailParserUseCaseModule.GET_JSON_FILE_USECASES_PROXY)
        private readonly getJsonFileUseCase: UseCaseProxy<GetJsonFileUseCase>,
        private readonly exceptionService: ExceptionsService,
    ) {}

    @Get(':path')
    async findOne(@Param('path') path: string) {
        const response = await this.getJsonFileUseCase
            .getInstance()
            .execute(path);
        if (response) {
            return response;
        }

        this.exceptionService.notFoundException({
            message: 'Json not found',
        });
    }
}
