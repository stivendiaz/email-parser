import { Module } from '@nestjs/common';
import { MailParserService } from '../service/mail-parser.service';

@Module({
    providers: [MailParserService],
    exports: [MailParserService],
})
export class MailParserServiceModule {}
