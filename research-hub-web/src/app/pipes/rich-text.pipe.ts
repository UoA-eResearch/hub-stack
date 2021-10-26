/**
 * Transforms Contentful rich text to HTML.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Pipe({
    name: 'richTextToHTML'
})
export class RichTextToHTML implements PipeTransform {
    /**
     * Use this pipe for rich text fields that do not have linked assets or entries,
     * for example the location field on Event
     * 
     * @param value - the json document from a rich text field
     * @returns the rich text document serialized into an html string.
     */
    transform(value: any): string {
        return documentToHtmlString(value);
    }
}
