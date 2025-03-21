import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';


interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CampaignListComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'marketing-frontend';
}
