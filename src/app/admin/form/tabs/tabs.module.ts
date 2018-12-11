import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';

const routes : Routes = [
  {
    path:'',
    component: TabsComponent,
    children:[
      {
        path:':id',
        component: TabComponent
      }
    ]
  }
]


@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsComponent, TabComponent]
})
export class TabsModule { }
