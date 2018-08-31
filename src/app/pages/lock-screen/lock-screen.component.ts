import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {
  lockForm: FormGroup;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder
)
{
    // Configure the layout
    this._fuseConfigService.config = {
        layout: {
            navbar   : {
                hidden: true
            },
            toolbar  : {
                hidden: true
            },
            footer   : {
                hidden: true
            },
            sidepanel: {
                hidden: true
            }
        }
    };
}

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
