import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserIdleConfig } from './idle.config';
import { LockScreenComponent } from 'app/pages/lock-screen/lock-screen.component';
import { LockModule } from 'app/pages/lock-screen/lock-screen.module';


@NgModule({
  imports: [LockModule],

  //entryComponents: [LockScreenComponent]
})
export class UserIdleModule {
  static forRoot(config: UserIdleConfig): ModuleWithProviders {
    return {
      ngModule: UserIdleModule,
      providers: [
        { provide: UserIdleConfig, useValue: config }
      ]
    };
  }
}