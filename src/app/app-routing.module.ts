import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/errors/error404/error404.component';
import { AppPreloadingStrategy } from './_helpers/customPreloadStrategy';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { AdminGuard } from './_guards/admin.guard';
import { MenuManagementModule } from './admin/settings/menu/menu.module';

MenuManagementModule

const appRoutes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: './features/home/home.module#HomeModule'
            },
            {
                path: 'asset',
                loadChildren: './features/asset/asset.module#AssetModule',
                data: { preload: false, delay: true }
            },
            {
                path: 'assessment',
                loadChildren: './features/assessment/assessment.module#AssessmentModule',
                data: { preload: false, delay: true }
            },
            {
                path: 'risk',
                loadChildren: './features/risk/risk.module#RiskModule',
                data: { preload: false, delay: true }
            },
            {
                path: 'calender',
                loadChildren: './features/calendar/calendar.module#CalendarModule',
                data: { preload: false, delay: true }
            },
            {
                path: 'todo',
                loadChildren: './features/todo/todo.module#TodoModule',
                data: { preload: false, delay: false }
            },
            {
                path: 'task',
                loadChildren: './features/task/task.module#TaskModule',
                data: { preload: false, delay: true }
            },
            {
                path: 'checklist',
                loadChildren: './features/checklist/checklist.module#ChecklistModule',
                data: { preload: false, delay: false }
            },
            {
                path: '',
                loadChildren: './features/users/users.module#UsersModule',
                data: { preload: false, delay: true }
            }
        ]
    },
    {
        path: '',
        component: SiteLayoutComponent,
        children: [
            {
                path: 'account/login',
                loadChildren: './login/login.module#LoginModule',
            },
            {
                path: 'account/forgot-password',
                loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordModule',
            },
            {
                path: 'account/lock',
                loadChildren: './pages/lock-screen/lock-screen.module#LockModule',
            },

        ]
    },
    {
        path: 'setup',
        component: AppLayoutComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'objectManager',
                loadChildren: './admin/settings/templateManager/templateManager.module#TemplateManagerModule',
            },
            {
                path: 'menuManagement',
                loadChildren: './admin/settings/menu/menu.module#MenuManagementModule',
            }
        ]
    },
    {
        path: '**', component: Error404Component
    }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: AppPreloadingStrategy })],
    exports: [RouterModule],
    providers: [AppPreloadingStrategy]
})

export class AppRoutingModule {
}
