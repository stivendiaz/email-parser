import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class WebpageService {
    private async getWebpage(url: string): Promise<string> {
        const { data } = await axios.get(url);
        return data;
    }

    async getJsonFromUrl(url: string) {
        try {
            const response = await this.getWebpage(url);
            if (typeof response === 'object') {
                return response;
            }

            return null;
        } catch (err) {
            console.error(
                `Error fetching JSON from URL (${url}):`,
                err.message,
            );
        }
        return null;
    }

    async getJsonFromUrls(urls: Array<string>) {
        try {
            const responses = await Promise.allSettled(
                urls.map((url) => this.getJsonFromUrl(url)),
            );
            const jsonResponses = responses
                .filter((response) => response.status === 'fulfilled')
                .map((response) => response.value);

            return jsonResponses.find((response) => response !== null);
        } catch (err) {
            console.error('Error fetching JSON from URLs:', err);
            return [];
        }
    }

    private getValidUrls(urls) {
        const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*$/i;
        const filtered = urls.filter((url) => urlRegex.test(url));
        return [...new Set(filtered)];
    }

    async getUrlsFromUrls(urls: Array<string>) {
        try {
            const responses = await Promise.allSettled(
                urls.map((url) => this.getWebpage(url)),
            );
            const htmlResponses = responses
                .filter((response) => response.status === 'fulfilled')
                .map((response) => response.value);

            let innerUrls = [];
            htmlResponses.forEach((html) => {
                const validUrls = this.getValidUrls(
                    this.extractUrlsFromHtml(html),
                );
                innerUrls = innerUrls.concat(validUrls);
            });
            return innerUrls;
        } catch (err) {
            console.error('Error fetching URLs from URLs:', err);
            return [];
        }
    }

    extractUrlsFromHtml(html) {
        const $ = load(html);
        let urls = [];

        // Extract URLs from <a> tags
        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                urls.push(href);
            }
        });

        // Extract plain text URLs using regex
        const plainText = $.text();
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const textUrls = plainText.match(urlRegex);
        if (textUrls) {
            urls = urls.concat(textUrls);
        }

        return urls;
    }
}
