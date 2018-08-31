import { Component, Inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '../../node_modules/@angular/platform-browser';
import { Subject, Observable } from '../../node_modules/rxjs';
import { FuseSidebarService } from '../@core/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '../@core/services/splash-screen.service';
import { FuseConfigService } from '@core/services/config.service';
import { takeUntil, take, map } from '../../node_modules/rxjs/operators';
import { AuthService } from './login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  config: any;
  private _unsubscribeAll: Subject<any>;
  showMainLayout: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashscreen: FuseSplashScreenService,
    private _authservice: AuthService,
    private _platform: Platform,
    private router: Router
  ) {
    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
