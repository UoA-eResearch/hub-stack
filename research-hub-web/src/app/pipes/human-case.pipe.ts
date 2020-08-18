/**
 * Transforms camelCase to a human readable format.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'humanCase'
})
export class HumanCasePipe implements PipeTransform {

    transform(value: string): string {
        if ((typeof value) !== 'string') {
            return value;
        }

        value = value.split(/(?=[A-Z])/).join(' ');
        return value[0].toUpperCase() + value.slice(1);
    }
}
