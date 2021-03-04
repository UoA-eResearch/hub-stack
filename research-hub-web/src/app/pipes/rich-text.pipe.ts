/**
 * Transforms Contentful rich text to HTML.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Pipe({
    name: 'richTextToHTML'
})
export class RichTextToHTML implements PipeTransform {
    transform(value: any): string {
        const options = {
            renderNode: {
                [BLOCKS.EMBEDDED_ENTRY]: (node) => `<p>Embedded Asset Block: ${node.data.target.sys.id} | ${node.nodeType}</p>`,
                [BLOCKS.EMBEDDED_ASSET]: (node) => `<p>Embedded Asset Block: ${node.data.target.sys.id} | ${node.nodeType}</p>`,
                [INLINES.EMBEDDED_ENTRY]: (node) => `<p>Embedded Entry Inline: ${node.data.target.sys.id} | ${node.nodeType}</p>`,
                [INLINES.ENTRY_HYPERLINK]: (node) => `<p>Entry Hyperlink: ${node.data.target.sys.id} | ${node.nodeType}</p>`,
            }
        }
        return documentToHtmlString(value, options);
    }
}
