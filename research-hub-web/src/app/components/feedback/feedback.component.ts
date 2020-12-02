// import {Component} from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';
import { Location } from '@angular/common';
import { AppComponentService } from '@app/app.component.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '@uoa/auth';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  public title: String = "Feedback";
  public summary: String = "We appreciate your visit to the beta-version of the ResearchHub, our platform for research support.";
  public coverImageUrl: String = 'url(assets/images/banner19.jpg)';

  public userInfo;
  public authenticated;
  public helloWorld;
  public loading$ = new Subject<boolean>();

  constructor(
    public analyticsService: AnalyticsService, 
    public location: Location, 
    private loginService: LoginService,
    public appCcomponentService: AppComponentService) { }

  async ngOnInit() {
    this.appCcomponentService.setTitle('Feedback');
    this.authenticated = await this.loginService.isAuthenticated();
    console.log('User is authenticated: ' + this.authenticated);
    this.userInfo = await this.loginService.getUserInfo();
    console.log('User info: ' + JSON.stringify(this.userInfo));
  }
}
