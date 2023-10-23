import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public constructor(
    public sessionService: SessionService,
    public router: Router,
  ) { }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
