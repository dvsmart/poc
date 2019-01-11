import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { FieldConfig } from "./models/field.config";


@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
            <div class="p-24">
              <form
                class="dynamic-form"
                [formGroup]="form"
                (submit)="handleSubmit($event)">
                  <ng-container *ngFor="let field of config;" dynamicField [config]="field" [group]="form"></ng-container>
              </form>
            </div>
            `,
  styles: [`.mt-12{
    margin-top: 12px
  }`]//,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FieldConfig[] = [];

  form: FormGroup;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  get controls() { return this.config.filter(({ type }) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)))
    return group;
  }

  createControl(config: any) {
    const { disabled, validation, value } = config;

    if (config.type === 'Checkbox' && config.options != undefined) {
      return this.fb.array(
        config.options.map(x => {
          return this.fb.group({
            name: x.id,
            value: value ? value.indexOf(x) > - 1 : false
          })
        }));
    }

    return this.fb.control({ disabled, value }, validation);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const result = { ...this.value };
    Object.keys(result).forEach((key, index) => {
      if (this.controls[index].type === 'checkbox') {
        result[key] = result[key].filter(x => x.value).map(x => x.name);
      }
    })
    this.submit.emit(result);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }
}