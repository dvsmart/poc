import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingService } from './fieldSpec.service';
import { LayoutService } from '../form-layout/layout.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-field-spec',
  templateUrl: './field-spec.component.html',
  styleUrls: ['./field-spec.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldSpecComponent implements OnInit {
  //@Input() fieldType;

  settingForm: FormGroup;
  fieldOption: any[];
  type: string;
  isChoiceAvailable: boolean;

  setting: {};
  isLoading: boolean = true;

  private _unsubscribeAll: Subject<any>;

  constructor(private settingService: SettingService, private layoutservice: LayoutService) {
    this.settingForm = new FormGroup({});
    this.fieldOption = [];
    this.isChoiceAvailable = false;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    debugger;
    this.settingForm.addControl('required', new FormControl(''));
    this.settingForm.addControl('hidden', new FormControl(''));
    this.settingForm.addControl('disabled', new FormControl(''));
    this.layoutservice.fieldSetting
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.type = x.type;
        this.setting = x.setting;
        this.buildForm();
        this.isLoading = false;
      })
  }

  // ngOnChanges() {
  //   debugger;

  //   this.type = this.fieldType.type;
  //   if (this.fieldType.type === 'radio' || this.fieldType.type === 'dropDown' || this.fieldType.type === 'checkbox') {
  //     this.isChoiceAvailable = true;
  //   }
  //   this.settingService.getFieldTypeSetting(this.fieldType.id).subscribe(x => {
  //     this.type = x.type;
  //     this.setting = x.setting;
  //     this.buildForm();
  //     this.isLoading = false;
  //   });
  // }

  buildForm() {
    debugger;
    if (this.setting != null) {
      Object.keys(this.setting).forEach(key => {
        this.settingForm.addControl(key, new FormControl(this.setting[key]));
      })
    }
  }

  addOption(value: any) {
    this.fieldOption.push(value);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
