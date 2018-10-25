import { NgModule } from '@angular/core';
import { RiskListComponent } from './risk-list/risk-list.component';
import { CoreSharedModule } from '@core/core.module';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from '../data-table/data-table.module';
import { GridLayoutModule } from '../gridLayout/grid-layout.module';

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
    DataTableModule,
    RouterModule.forChild(riskRoutes)
  ],
  declarations: [RiskListComponent]
})
export class RiskModule { }
