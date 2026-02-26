import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // GET all users (Admin)
  getAllUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/user`);
  }

  // DELETE user
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/user/${id}`);
  }

  // Toggle active / inactive
  toggleUserStatus(id: string) {
    return this.http.patch(`${this.apiUrl}/user/${id}/status`, {});
  }
}