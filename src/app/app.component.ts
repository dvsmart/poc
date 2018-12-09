import { Component, Inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '../../node_modules/@angular/platform-browser';
import { Subject } from '../../node_modules/rxjs';
import { FuseSidebarService } from '../@core/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '../@core/services/splash-screen.service';
import { Router } from '@angular/router';
import { CoreNavigationService } from '@core/components/navigation/navigation.service';
import { AuthService } from './login/auth.service';
import { takeUntil } from 'rxjs/operators';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '@env/environment';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { MessageService } from '@core/services/message.service';

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
  isAuth: boolean = false;
  msgs: any[] = [];

  private _hubConnection: HubConnection;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _platform: Platform,
    private _splashscreen: FuseSplashScreenService,
    private _navigationservice: CoreNavigationService,
    private authservice:AuthService,
    private toaster: MessageService
  ) {
    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.authservice._isLoggedIn
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(x=>{
      if(x){
        this.isAuth = x;
        this._navigationservice.getMenuItems();
      }
    })

    // this._hubConnection = new HubConnectionBuilder()
    //     .withUrl('http://localhost:50001' + '/notify')
    //     .build();
    // this._hubConnection
    //   .start()
    //   .then(() => {console.log('Connection started!'); this.msgs = [];})
    //   .catch(err => console.log('Error while establishing connection :(' + err));

    // this._hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
    //   this.msgs.push({ severity: type, summary: payload });
    //   this.toaster.add(JSON.stringify(this.msgs))
    // });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._hubConnection.stop();
  }
}
