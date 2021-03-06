import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/errors/error404/error404.component';
import { AppPreloadingStrategy } from './_helpers/customPreloadStrategy';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { AdminGuard } from './_guards/admin.guard';


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
                path: 'assessments',
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
                path: 'tasks',
                loadChildren: './features/tasks/task.module#TaskModule',
                data: { preload: false, delay: true }
            },
            {
                path: 'audit',
                loadChildren: './features/audit/audit.module#AuditModule',
                data: { preload: false, delay: true }
            },
            {
                path: 'users',
                loadChildren: './features/users/users.module#UsersModule',
                data: { preload: false, delay: true }
            }
        ]
    },
    {
        path: 'account',
        component: SiteLayoutComponent,
        children: [
            {
                path: 'login',
                loadChildren: './login/login.module#LoginModule',
            },
            {
                path: 'forgot-password',
                loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordModule',
            },
            {
                path: 'lock',
                loadChildren: './pages/lock-screen/lock-screen.module#LockModule',
            },

        ]
    },
    {
        path: 'admin',
        component: AppLayoutComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'menu',
                loadChildren: './admin/menu/menu.module#MenuModule',
            },
            {
                path: 'form',
                loadChildren: './admin/form/dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'setup',
                loadChildren: './admin/form/setup/setup.module#SetupModule',
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
