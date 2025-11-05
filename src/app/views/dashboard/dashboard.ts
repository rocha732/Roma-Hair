import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  accessToken: string | null = null;

  constructor(private storage: StorageService) {
    this.accessToken = this.storage.getItem('accessToken');
  }

  logout() {
    this.storage.clear();
  }
}
