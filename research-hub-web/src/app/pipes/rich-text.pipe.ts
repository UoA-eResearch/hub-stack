/**
 * Transforms Contentful rich text to HTML.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import * as contentful from 'contentful';

@Pipe({
    name: 'richTextToHTML'
})
export class RichTextToHTML implements PipeTransform {
    transform(value: any): string {
        const options = {
            renderNode: {
              [BLOCKS.EMBEDDED_ENTRY]: (node) => `<p>Embedded Entry Block: ${node.data.target.sys.id}</p>`,
              [BLOCKS.EMBEDDED_ASSET]: (node) => `<p>Embedded Asset Block: ${node.data.target.sys.id}</p>`,
              [INLINES.EMBEDDED_ENTRY]: (node) => `<p>Embedded Entry Inline: ${node.data.target.sys.id}</p>`,
            }
        }
        return documentToHtmlString(value, options);
    }
}
