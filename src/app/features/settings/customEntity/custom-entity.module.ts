import { NgModule } from '@angular/core';
import { TreeListComponent } from './components/tree-list/tree-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { MatTreeModule, MatIconModule, MatListModule } from '@angular/material';
import { SubTreeListComponent } from './components/sub-tree/sub-tree.component';
import { TabTreeComponent } from './components/tab-tree/tab-tree.component';
import { CustomentityService } from './service/customentity.service';

const routes: Routes = [
  {
    path: '',
    component: TreeListComponent,
    resolve:{
      groups: CustomentityService
    }
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
  declarations: [TreeListComponent, SubTreeListComponent, TabTreeComponent]
})
export class CustomEntityModule { }
