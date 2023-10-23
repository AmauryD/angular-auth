import { Component } from '@angular/core';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-frontend';

  public constructor(
    public sessionService: SessionService,
  ) { }

  ngOnInit() {
  }
}
