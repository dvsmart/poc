import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserIdleConfig } from './idle.config';
import { LockModule } from 'app/pages/lock-screen/lock-screen.module';


@NgModule({
  imports: [LockModule]
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