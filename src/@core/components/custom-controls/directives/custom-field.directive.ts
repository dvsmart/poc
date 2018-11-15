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

const componentMapper = {
  "Text Box": InputComponent,
  button: ButtonComponent,
  "Select / List": SelectComponent,
  Calender: DateComponent,
  radiobutton: RadiobuttonComponent,
  Checkbox: CheckboxComponent,
  "Text Area": TextAreaComponent,
  "Currency Input": InputComponent,
  "Numerical Input": InputComponent,
  "EmailAddress Input": InputComponent,
  "Percentage Input": InputComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: any;
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