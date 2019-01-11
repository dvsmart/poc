import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/fieldConfig";

@Component({
  selector: "app-checkbox",
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  field: any;
  group: FormGroup;
  options: any[] = null;
  constructor() { }

  values: any[];
  @ViewChildren('checkboxMultiple') private checkboxesMultiple: QueryList<any>;
  ngOnInit() {
    this.values = [];
    this.options = [];
    if (this.field.liveFormFieldSpecificationDto != null && this.field.liveFormFieldSpecificationDto.fieldOptions != null) {
      this.options = JSON.parse(this.field.liveFormFieldSpecificationDto.fieldOptions);
    }
  }

  selectionChange(event): void {

    // get index from template loop or so. In this case the value
    // of the mat-checkbox is an Array with the value as first and
    // the loop index as second entry
    let index = event.source.value[1];
    let checkboxesArray = this.checkboxesMultiple.toArray();
    checkboxesArray[index].checked = true;

    this.values.push(checkboxesArray[index].value[0].Id);


    this.group.get(this.field.name).setValue([...this.values]);

    // You could also loop over all checkboxes and check/uncheck
    // them based on your logic
  }
}