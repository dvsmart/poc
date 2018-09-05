import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserIdleConfig } from './idle.config';


@NgModule({
  imports: []
})
export class UserIdleModule {
  static forRoot(config: UserIdleConfig): ModuleWithProviders {
    return {
      ngModule: UserIdleModule,
      providers: [
        {provide: UserIdleConfig, useValue: config}
      ]
    };
  }
}