import {Component, Input, ViewChild, forwardRef, OnChanges, SimpleChanges} from '@angular/core';
import {
  MatInput
} from '@angular/material/input';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from '@angular/material/autocomplete';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { AnalyticsService } from 'app/services/analytics.service';

export interface Tag {
  id: number;
  text: string;
  imageUrl: string;
}

export function arrayDiffObj(s: any[], v: any[], key: string) {
  const reducedIds = v.map((o) => o[key]);
  return s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1);
}

const CUSTOM_INPUT_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatTagsComponent),
  multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatTagsComponent),
  multi: true
};

@Component({
  selector: 'app-mat-tags',
  templateUrl: './mat-tags.component.html',
  styleUrls: ['./mat-tags.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ]
})
export class MatTagsComponent implements ControlValueAccessor, OnChanges {

  public _value: Tag[] = [];

  filteredSources: Tag[] = [];

  @ViewChild('chipInput') chipInput: MatInput;
  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  @Input() source: Tag[] = [];
  @Input() addNew = true;

  @Input() placeholder = '';

  constructor(public analyticsService: AnalyticsService) {}

  @Input()
  set value(v: Tag[]) {
    this.onChange(v);
  }

  get value(): Tag[] {
    return this._value;
  }

  isDisabled : boolean;

  onChange = (_: any): void => {
    // mock
  };
  onTouched = (_: any): void => {
    // mock
  };

  setDisabledState(isDisabled){
    this.isDisabled = isDisabled;
  }

  writeValue(v: Tag[]): void {
    this._value = v;

    // If value changes and source exists, then populate _value with Tag objects
    if (this.source && this.source.length) {
      this.populateTags();
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(c: FormControl): any {
    return (this._value) ? undefined : {
      tinyError: {
        valid: false
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source && (!this.chipInput || !this.chipInput.value)) {
      this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
    }

    // Update _value with real tag information when source has been updated
    if (changes.source && !changes.source.firstChange && changes.source.previousValue.length === 0) {
      this.populateTags();
    }
  }

  private populateTags() {
    const reducedIds = this._value.map((o) => o.id);
    this._value = this.source.filter((obj: any) => reducedIds.indexOf(obj.id) > -1);
  }

  public textChanged(text: string) {
    this.filteredSources = arrayDiffObj(this.source, this._value, 'id')
      .filter((obj: Tag) => obj.text.toLowerCase().indexOf(text.toLowerCase()) === 0);
  }

  add(event: MatAutocompleteSelectedEvent, input: any): void {
    this.addTag(event.option.value, input);
    this.placeholder.search('person') != -1 ? this.analyticsService.trackUserExperience('Filter panel', 'refine by person') : this.analyticsService.trackUserExperience('Filter panel', 'refine by org unit');
  }

  triggerAutocomplete(){
    if (this.isDisabled){
      return;
    }
    if (!this.autoTrigger.panelOpen){
      this.autoTrigger.openPanel();
    }
  }

  addTextChip(input: MatInput): void {
    if (this.addNew) {
      if (input.value && !this.autoTrigger.activeOption) {
        const newId: number = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
        const newTag: Tag = {id: newId, text: input.value, imageUrl: undefined};
        this.source.push(newTag);
        this.addTag(newTag, input);
      }
    } else {
      if (this.filteredSources.length) {
        this.addTag(this.filteredSources[0], input);
      }
    }
  }

  remove(tag: Tag, input: any): void {
    this._value = this._value.filter((i) => i !== tag);
    this.value = this._value;
    this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
    input.focus();
  }

  selectInput(event: MouseEvent, input: any) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.textChanged(input.value);
    input.focus();
    return false;
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.text : value;
  }

  private addTag(value: Tag, input: any) {
    if (!isNaN(Number(value))) {
      value = this.source.find((tag) => tag.id === Number(value));
    }
    if (!value || !value.text || this._value.indexOf(value) !== -1) {
      return;
    }
    this._value.push(value);
    this.value = this._value;
    input.value = '';
    this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
    input.focus();
  }
}
