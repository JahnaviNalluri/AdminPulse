import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(`${this.apiUrl}/analytics/dashboard`);
  }

  getMonthlySignups() {
    return this.http.get<any>(`${this.apiUrl}/analytics/monthly-signups`);
  }

  getContentAnalytics() {
    return this.http.get<any>(`${this.apiUrl}/analytics/content-analytics`);
  }
  
  
}