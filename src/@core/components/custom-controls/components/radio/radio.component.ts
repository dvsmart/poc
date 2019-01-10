import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/fieldConfig";

@Component({
  selector: "app-radiobutton",
  templateUrl: './radio.component.html'
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
    debugger;
  }
}