import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.apiUrl}/content`);
  }

  getMyPosts() {
    return this.http.get<any[]>(`${this.apiUrl}/content/my-posts`);
  }

  create(data: any) {
    return this.http.post(`${this.apiUrl}/content`, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/content/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/content/${id}`);
  }
}