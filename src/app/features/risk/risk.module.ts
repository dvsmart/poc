import { NgModule } from '@angular/core';
import { RiskListComponent } from './risk-list/risk-list.component';
import { CoreSharedModule } from '@core/core.module';
import { Routes, RouterModule } from '@angular/router';
import { RiskDetailComponent } from './risk-detail/risk-detail.component';
import { RiskService } from './risk-detail/risk.service';

const riskRoutes: Routes = [
  {
    path: '',
    component: RiskListComponent,
    // resolve:{
    //   risks: RisksService
    // }
  },
  {
    path: ':id',
    component: RiskDetailComponent,
    resolve: {
      risk: RiskService
    }
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    
    RouterModule.forChild(riskRoutes)
  ],
  declarations: [RiskListComponent, RiskDetailComponent]
})
export class RiskModule { }
