import { NgModule } from '@angular/core';
import { TreeListComponent } from './components/tree-list/tree-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { MatTreeModule, MatIconModule, MatListModule } from '@angular/material';
import { FuseSidebarModule } from '@core/components/sidebar/sidebar.module';

const routes: Routes = [
  {
    path: '',
    component:TreeListComponent    
  },
];


@NgModule({
  imports: [
    CoreSharedModule,
    MatIconModule,
    MatListModule,
    FuseSidebarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TreeListComponent]
})
export class CustomEntityModule { }
