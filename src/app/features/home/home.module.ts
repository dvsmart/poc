import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreSharedModule } from '@core/core.module';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
