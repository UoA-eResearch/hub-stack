/**
 * Transforms Contentful rich text to HTML.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import * as contentful from 'contentful';

@Pipe({
    name: 'richTextToHTML'
})
export class RichTextToHTML implements PipeTransform {

    transform(value: any): string {
        return documentToHtmlString(value);
    }
}
