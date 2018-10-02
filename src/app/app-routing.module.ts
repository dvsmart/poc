import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/errors/error404/error404.component';

const appRoutes: Routes = [
    {
        path:'**',component:Error404Component
    }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
