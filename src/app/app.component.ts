import { Component, Inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '../../node_modules/@angular/platform-browser';
import { Subject } from '../../node_modules/rxjs';
import { FuseSidebarService } from '../@core/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '../@core/services/splash-screen.service';
import { Router } from '@angular/router';
import { CoreNavigationService } from '@core/components/navigation/navigation.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  config: any;
  navigation: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _platform: Platform,
    private _splashscreen: FuseSplashScreenService,
    private _navigationservice: CoreNavigationService
  ) {
    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._navigationservice.getNavigationItems();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
