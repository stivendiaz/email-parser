import { Injectable } from '@nestjs/common';
import { MailParserService } from '../infrastructure/service/mail-parser.service';
import { WebpageService } from '../infrastructure/service/webpage.service';

@Injectable()
export class GetJsonFileUseCase {
    constructor(
        private readonly mailparserService: MailParserService,
        private readonly webpageService: WebpageService,
    ) {}

    async execute(path: string) {
        const fileContent = await this.mailparserService.getFileContent(path);

        const attachedJSON =
            await this.mailparserService.getAttachedJsonFiles(fileContent);

        if (attachedJSON) {
            return attachedJSON;
        }

        const urls =
            await this.mailparserService.getUrlsInEmailBody(fileContent);

        if (urls) {
            const jsonFromUrl = await this.webpageService.getJsonFromUrls(urls);
            if (jsonFromUrl) {
                return jsonFromUrl;
            }

            const innerUrls = await this.webpageService.getUrlsFromUrls(urls);

            if (innerUrls) {
                const jsonFromInnerUrls =
                    await this.webpageService.getJsonFromUrls(innerUrls);
                if (jsonFromInnerUrls) {
                    return jsonFromInnerUrls;
                }
            }
        }

        return null;
    }
}
