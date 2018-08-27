import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SelectComponent } from "../components/select/select.component";
import { DateComponent } from "../components/calender/calender.component";
import { RadiobuttonComponent } from "../components/radio/radio.component";
import { CheckboxComponent } from "../components/checkbox/checkbox.component";
import { InputComponent } from "../components/textbox/textbox.component";
import { ButtonComponent } from "../components/button/button.component";
import { FieldConfig } from "../models/fieldConfig";
import { TextAreaComponent } from "../components/textarea/textarea.component";

const componentMapper = {
  text: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  textarea: TextAreaComponent,
  phone:InputComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}