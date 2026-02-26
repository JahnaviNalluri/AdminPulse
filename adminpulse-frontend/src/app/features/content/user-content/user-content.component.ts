import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../core/services/content.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-content.component.html'
})
export class UserContentComponent implements OnInit {

  activeTab: string = 'mine';
  contents: any[] = [];

  title = '';
  description = '';
  editingId: string | null = null;

  user: any = {};

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.loadAllContent();
  }

  /* ================= TAB SWITCH ================= */
loadAllContent() {
  this.activeTab = 'all';

  this.contentService.getAll().subscribe({
    next: (data) => {
      console.log("ALL RESPONSE:", data);
      this.contents = data;
    },
    error: (err) => {
      console.log("ALL ERROR:", err);
    }
  });
}

  loadMyContent() {
    this.activeTab = 'mine';

    this.contentService.getMyPosts().subscribe({
      next: (data) => {
        this.contents = data;
      },
      error: (err) => console.error(err)
    });
  }

  /* ================= CRUD ================= */

  saveContent() {
    if (!this.title || !this.description) return;

    const payload = {
      title: this.title,
      description: this.description
    };

    if (this.editingId) {
      this.contentService.update(this.editingId, payload)
        .subscribe(() => {
          this.resetForm();
          this.loadMyContent();
        });
    } else {
      this.contentService.create(payload)
        .subscribe(() => {
          this.resetForm();
          this.loadMyContent();
        });
    }
  }

  edit(content: any) {
    this.title = content.title;
    this.description = content.description;
    this.editingId = content._id;
  }

  delete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    this.contentService.delete(id)
      .subscribe(() => {
        if (this.activeTab === 'all') {
          this.loadAllContent();
        } else {
          this.loadMyContent();
        }
      });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.editingId = null;
  }

  isOwner(content: any) {
    return String(content.createdBy?._id) === String(this.user?._id);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}