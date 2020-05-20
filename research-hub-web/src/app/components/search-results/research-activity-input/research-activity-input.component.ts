import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {OptionsService} from 'app/services/options.service';
import {AnalyticsService} from 'app/services/analytics.service';


@Component({
  selector: 'app-research-activity-input',
  templateUrl: './research-activity-input.component.html',
  styleUrls: ['./research-activity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResearchActivityInputComponent),
      multi: true
    }
  ]
})
export class ResearchActivityInputComponent implements OnInit, ControlValueAccessor {

  public model = {};

  @Input() _value: number[] = [];
  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  /**
   * Determines whether we show the larger, thicker inputs that are touch-friendly.
   */
  @Input() touchFriendly : boolean = false;

  isDisabled : boolean;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.updateState();
  }

  constructor(public optionsService: OptionsService, public analyticsService: AnalyticsService) {
    for (const activity of optionsService.researchActivityOptions) {
      this.model[activity.id] = {selected: false};
    }
  }

  ngOnInit() {
  }

  setDisabledState(isDisabled){
    this.isDisabled = isDisabled;
  }

  onToggle(activityId,toggleEvent) {
    this.model[activityId].selected = !this.model[activityId].selected;
    this.updateValue();
    this.analyticsService.trackUserExperience('Filter panel', 'filter by research activity');
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value === null || value === undefined){
      value = [];
    }
    this.value = value;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  updateState() {
    Object.keys(this.model).forEach(key => {
      this.model[key].selected = this._value.indexOf(+key) >= 0;
    });
  }

  updateValue() {
    const selectedActivities = Object.keys(this.model).map(
      key => (this.model[key].selected ? +key : null));
    const filteredActivities = selectedActivities.filter(
      key => (key !== null));
    this.value = filteredActivities;
  }
}
