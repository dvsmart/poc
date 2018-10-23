import { NgModule } from '@angular/core';
import { RiskListComponent } from './risk-list/risk-list.component';
import { CoreSharedModule } from '@core/core.module';
import { Routes, RouterModule } from '@angular/router';
import { GridLayoutModule } from '@core/components/gridLayout/grid-layout.module';

const riskRoutes: Routes = [
  {
    path: '',
    component: RiskListComponent,
  }
];



@NgModule({
  imports: [
    CoreSharedModule,
    GridLayoutModule,
    RouterModule.forChild(riskRoutes)
  ],
  declarations: [RiskListComponent]
})
export class RiskModule { }
