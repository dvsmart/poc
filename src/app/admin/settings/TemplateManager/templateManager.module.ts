import { NgModule } from '@angular/core';
import { CoreSharedModule } from '@core/core.module';
import { TemplateManagerRoutingModule } from './template-manager-routing.module';


// const routes: Routes = [
//   {
//     path: 'categories',
//     component: ManageCategoriesComponent,
//     resolve: {
//       categories: CategoriesService
//     }
//   },
//   {
//     path: 'templates',
//     component: ManageTemplatesComponent,
//     resolve: {
//       templates: TemplatesService
//     }
//   },
//   {
//     path: 'templates/:id',
//     component: SetupComponent,
//     children: [
//       {
//         path: 'details',
//         component: TemplateDetailComponent
//       },
//       {
//         path: 'tabs',
//         component: TabComponent,
//         children: [{
//           path: ':id',
//           component: TabDetailComponent
//         }]
//       },
//       {
//         path: 'fields',
//         component: FieldListComponent,
//         children: [{
//           path: ':id',
//           component: FieldDetailComponent
//         }]
//       },
//       {
//         path: '**',
//         redirectTo: 'details'
//       }
//     ],
//     resolve: {
//       tabs: SetupService
//     }
//   }
// ];

@NgModule({
  imports: [
    CoreSharedModule,
    TemplateManagerRoutingModule
  ]
})
export class TemplateManagerModule { }
