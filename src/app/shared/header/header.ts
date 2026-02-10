import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-leaf"></i> Firma
        </div>
        <div class="nav-buttons">
            <a routerLink="/login">
                <button class="btn-login">Se connecter</button>
            </a>
            <a routerLink="/signup">
                <button class="btn-signup">Créer un compte</button>
            </a>
        </div>
    </nav>
  `,
  styles: [`
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 5%;
        background-color: var(--white);
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--dark-green);
    }

    .nav-buttons button {
        padding: 0.5rem 1.2rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s;
        margin-left: 10px;
    }

    .btn-login {
        background-color: transparent;
        border: 2px solid var(--dark-green) !important;
        color: var(--dark-green);
    }

    .btn-login:hover {
        background-color: var(--dark-green);
        color: var(--white);
    }

    .btn-signup {
        background-color: var(--dark-green);
        color: var(--white);
    }

    .btn-signup:hover {
        background-color: var(--primary-green);
    }
  `]
})
export class HeaderComponent {}
