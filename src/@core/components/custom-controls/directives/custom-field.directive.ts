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
import { TextAreaComponent } from "../components/textarea/textarea.component";
import { Field } from "../models/field.interface";
import { FieldConfig } from "../models/field.config";
import { uploaderComponent } from "../components/uploader/uploader.component";

const componentMapper = {
  "text": InputComponent,
  button: ButtonComponent,
  "select": SelectComponent,
  "date": DateComponent,
  "radiobutton": RadiobuttonComponent,
  "checkbox": CheckboxComponent,
  "textarea": TextAreaComponent,
  "currency": InputComponent,
  "numerical": InputComponent,
  "email": InputComponent,
  "percent": InputComponent,
  "image": uploaderComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;
  component: ComponentRef<Field>;


  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnInit() {
    if (!componentMapper[this.config.type]) {
      const supportedTypes = Object.keys(componentMapper).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const factory = this.resolver.resolveComponentFactory<Field>(componentMapper[this.config.type]);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}