import { NgModule } from '@angular/core';
import { TreeListComponent } from './components/tree-list/tree-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { MatTreeModule, MatIconModule, MatListModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component:TreeListComponent    
  },
];


@NgModule({
  imports: [
    CoreSharedModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TreeListComponent]
})
export class CustomEntityModule { }
