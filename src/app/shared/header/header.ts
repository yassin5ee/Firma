import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    template: `
    <nav class="navbar">
        <div class="logo" routerLink="/" style="cursor: pointer;">
            <i class="fa-solid fa-leaf"></i> Firma
        </div>
        
        <div class="nav-menu">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
                <i class="fa-solid fa-home"></i> Accueil
            </a>
            <a routerLink="/market" routerLinkActive="active" class="nav-link">
                <i class="fa-solid fa-store"></i> Marketplace
            </a>
            <a routerLink="/recom" routerLinkActive="active" class="nav-link">
                <i class="fa-solid fa-chart-line"></i> Analyses
            </a>
            <a routerLink="/post" routerLinkActive="active" class="nav-link">
                <i class="fa-solid fa-plus-circle"></i> Vendre
            </a>
            <a routerLink="/premium" routerLinkActive="active" class="nav-link">
                <i class="fa-solid fa-crown"></i> Premium
            </a>
        </div>

        <div class="nav-buttons">
            <a routerLink="/login">
                <button class="btn-login">
                    <i class="fa-solid fa-sign-in-alt"></i> Connexion
                </button>
            </a>
            <a routerLink="/signup">
                <button class="btn-signup">
                    <i class="fa-solid fa-user-plus"></i> S'inscrire
                </button>
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
        gap: 2rem;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--dark-green);
        white-space: nowrap;
    }

    .nav-menu {
        display: flex;
        gap: 1.5rem;
        align-items: center;
        flex: 1;
        justify-content: center;
    }

    .nav-link {
        text-decoration: none;
        color: #555;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: all 0.3s;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    .nav-link:hover {
        background-color: #f0f9f4;
        color: var(--dark-green);
    }

    .nav-link.active {
        background-color: var(--dark-green);
        color: white;
    }

    .nav-link i {
        font-size: 0.9rem;
    }

    .nav-buttons {
        display: flex;
        gap: 0.5rem;
        white-space: nowrap;
    }

    .nav-buttons button {
        padding: 0.5rem 1.2rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s;
        display: flex;
        align-items: center;
        gap: 0.4rem;
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

    /* Mobile Responsive */
    @media (max-width: 968px) {
        .navbar {
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .nav-menu {
            order: 3;
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
            padding: 0.5rem 0;
        }

        .nav-link {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
        }
    }

    @media (max-width: 576px) {
        .nav-menu {
            gap: 0.5rem;
        }
        
        .nav-link span {
            display: none;
        }
        
        .nav-buttons button {
            padding: 0.5rem 0.8rem;
            font-size: 0.85rem;
        }
    }
  `]
})
export class HeaderComponent { }
