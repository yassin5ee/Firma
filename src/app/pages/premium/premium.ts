import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './premium.html',
  styleUrl: './premium.css',
})
export class PremiumComponent {

}
