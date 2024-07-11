import { promises as fs } from 'fs';
import { simpleParser } from 'mailparser';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailParserService {
    async getFileContent(route: string) {
        const fileContent = await fs.readFile(route, 'utf8');
        return fileContent;
    }

    async getAttachedJsonFiles(emailContent: string) {
        const parsed = await simpleParser(emailContent);

        const attachments = parsed.attachments;
        let jsonAttachment = null;

        attachments.forEach((attachment) => {
            if (
                attachment.contentType === 'application/json' &&
                attachment.filename.endsWith('.json')
            ) {
                jsonAttachment = attachment.content.toString('utf8');
                return;
            }
        });

        if (jsonAttachment) {
            return JSON.parse(jsonAttachment);
        }
        return null;
    }

    async getUrlsInEmailBody(emailContent: string): Promise<string[] | null> {
        const parsed = await simpleParser(emailContent);

        const urlRegex = /https?:\/\/[^\s]+/g;
        const urls = parsed.text.match(urlRegex);
        if (urls) {
            return urls;
        }
        return null;
    }
}
