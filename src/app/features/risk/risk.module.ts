import { NgModule } from '@angular/core';
import { RiskListComponent } from './risk-list/risk-list.component';
import { CoreSharedModule } from '@core/core.module';
import { Routes, RouterModule } from '@angular/router';
import { GridLayoutModule } from 'app/shared/gridLayout/grid-layout.module';
import { DataTableModule } from 'app/shared/data-table/data-table.module';

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
