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
             <ng-container *ngFor="let field of config;" dynamicField [config]="field" [group]="form"></ng-container>
            </div>
            `,
  styles: [`.mt-12{
    margin-top: 12px
  }`]//,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  @Input() config: FieldConfig[] = [];

  @Input() form: FormGroup;

}