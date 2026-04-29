import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = signal<boolean>(false);

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value); // ✅ Toggle signal
    console.log('Menu open:', this.isMenuOpen());
  }
}
