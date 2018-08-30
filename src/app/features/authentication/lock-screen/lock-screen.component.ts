import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {
  lockForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.lockForm = this._formBuilder.group({
      username: [
        {
          value: 'Katherine',
          disabled: true
        }, Validators.required
      ],
      password: ['', Validators.required]
    });
  }

}
