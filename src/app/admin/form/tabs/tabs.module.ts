import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent
  }
]

@NgModule({
  declarations: [TabsComponent, TabComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TabsModule { }
