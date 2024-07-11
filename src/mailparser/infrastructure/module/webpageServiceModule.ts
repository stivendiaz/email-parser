import { Module } from '@nestjs/common';
import { WebpageService } from '../service/webpage.service';

@Module({
    providers: [WebpageService],
    exports: [WebpageService],
})
export class WebpageServiceModule {}
