import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Chart } from 'chart.js/auto';
import { UserService } from '../../../core/services/user.service';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  selectedView: string | null = null;
  usersList: any[] = [];
  contentList: any[] = [];

  dashboardData: any = null;
  loading = true;

  signupChart: any;
  contentChart: any;

  constructor(
    private analyticsService: AnalyticsService,
    private authService: AuthService,
    private userService: UserService,
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  ngAfterViewInit() {
    // Charts will load after dashboard loads
  }

  /* ================= Dashboard ================= */

  loadDashboard() {
    this.analyticsService.getDashboard().subscribe({
      next: (data: any) => {

        console.log("Dashboard API response:", data);

        this.dashboardData = {
          totalUsers: data.totalUsers,
          activeUsers: data.activeUsers,
          totalAdmins: data.totalAdmins,
          totalContent: data.totalContent
        };

        this.loading = false;

        // Delay chart creation until view updates
        setTimeout(() => {
          this.loadMonthlySignups();
          this.loadContentAnalytics();
        }, 100);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getMonthName(month: number) {
    const months = [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ];
    return months[month - 1];
  }

  /* ================= Charts ================= */

  loadMonthlySignups() {

    const canvas: any = document.getElementById('signupChart');
    if (!canvas) return;

    this.analyticsService.getMonthlySignups().subscribe((res: any) => {

      const labels = res.data.map((item: any) =>
        `${this.getMonthName(item.month)} ${item.year}`
      );

      const counts = res.data.map((item: any) => item.count);

      if (this.signupChart) this.signupChart.destroy();

      this.signupChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'User Signups',
            data: counts,
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13,110,253,0.15)',
            fill: true,
            tension: 0.4
          }]
        }
      });
    });
  }

  loadContentAnalytics() {

    const canvas: any = document.getElementById('contentChart');
    if (!canvas) return;

    this.analyticsService.getContentAnalytics().subscribe((res: any) => {

      const labels = res.data.monthlyContent.map((item: any) =>
        `${this.getMonthName(item.month)} ${item.year}`
      );

      const counts = res.data.monthlyContent.map((item: any) => item.count);

      if (this.contentChart) this.contentChart.destroy();

      this.contentChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Content Posted',
            data: counts,
            backgroundColor: 'rgba(220,53,69,0.7)'
          }]
        }
      });
    });
  }

  /* ================= Admin Controls ================= */

  showAllUsers() {
    this.selectedView = 'allUsers';
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data;
    });
  }

  showActiveUsers() {
    this.selectedView = 'activeUsers';
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data.filter(u => u.isActive);
    });
  }

  showAllContent() {
    this.selectedView = 'content';
    this.contentService.getAll().subscribe(data => {
      this.contentList = data;
    });
  }

  toggleUser(id: string) {
    this.userService.toggleUserStatus(id).subscribe(() => {
      this.showAllUsers();
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.showAllUsers();
      });
    }
  }

  deleteContent(id: string) {
    if (confirm('Delete this content?')) {
      this.contentService.delete(id).subscribe(() => {
        this.showAllContent();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}