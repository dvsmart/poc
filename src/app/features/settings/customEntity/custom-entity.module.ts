import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { MatTreeModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { CustomentityService } from './service/customentity.service';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCustomDialog } from './components/categories/add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: CustomentityService
    }
  },
];


@NgModule({
  imports: [
    CoreSharedModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CategoriesComponent, AddCustomDialog],
  entryComponents: [AddCustomDialog]
})
export class CustomEntityModule { }
