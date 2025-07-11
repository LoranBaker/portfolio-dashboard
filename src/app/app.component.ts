import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioDashboardComponent } from "./components/portfolio-dashboard/portfolio-dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PortfolioDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-dashboard';
}
