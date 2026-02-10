import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, HeaderComponent, FooterComponent],
    template: `
    <app-header></app-header>
    <header class="hero">
        <div class="hero-content">
            <h1>Cultivez intelligemment, récoltez plus.</h1>
            <p>La plateforme tout-en-un pour l'échange d'engrais et l'analyse intelligente de vos sols.</p>
            <a href="#features" class="btn-cta">Découvrir nos outils</a>
        </div>
    </header>

    <section id="features" class="features-section">
        <div class="container">
            <h2>Nos Services</h2>
            <p class="subtitle">Connectez-vous pour accéder à nos outils dédiés aux agriculteurs.</p>
            
            <div class="cards-wrapper">
                
                <div class="card">
                    <div class="card-icon marketplace-icon">
                        <i class="fa-solid fa-handshake"></i>
                    </div>
                    <h3>Marketplace Engrais</h3>
                    <p>
                        Achetez ou vendez des <strong>engrais organiques</strong> directement entre agriculteurs. 
                        Trouvez les meilleurs produits à proximité pour enrichir votre terre à moindre coût.
                    </p>
                    <ul class="card-details">
                        <li><i class="fa-solid fa-check"></i> Vente directe</li>
                        <li><i class="fa-solid fa-check"></i> Produits organiques certifiés</li>
                    </ul>
                    <a routerLink="/login">
                        <button class="btn-card">Se connecter pour échanger</button>
                    </a>
                </div>

                <div class="card">
                    <div class="card-icon analysis-icon">
                        <i class="fa-solid fa-chart-pie"></i>
                    </div>
                    <h3>Analyses & Recommandations</h3>
                    <p>
                        Entrez les données de votre sol (NPK, pH, Salinité) et la météo. 
                        Notre algorithme vous suggère les <strong>cultures les plus rentables</strong> ou analyse la viabilité de votre choix.
                    </p>
                    <ul class="card-details">
                        <li><i class="fa-solid fa-check"></i> Analyse par zone de sol</li>
                        <li><i class="fa-solid fa-check"></i> Conseils de rentabilité</li>
                    </ul>
                     <a routerLink="/login">
                        <button class="btn-card">Se connecter pour analyser</button>
                    </a>
                </div>

            </div>
        </div>
    </section>
    <app-footer></app-footer>
  `,
    styles: [`
    /* --- Hero Section --- */
    .hero {
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
        background-size: cover;
        background-position: center;
        height: 80vh; 
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: var(--white);
        padding: 0 20px;
    }

    .hero h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .hero p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .btn-cta {
        display: inline-block;
        padding: 1rem 2rem;
        background-color: var(--primary-green);
        color: var(--white);
        text-decoration: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: bold;
        transition: transform 0.2s;
    }

    .btn-cta:hover {
        transform: scale(1.05);
        background-color: var(--dark-green);
    }

    /* --- Features Section --- */
    .features-section {
        padding: 4rem 5%;
        text-align: center;
    }

    .subtitle {
        color: #666;
        margin-bottom: 3rem;
    }

    .cards-wrapper {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap; 
    }

    .card {
        background: var(--white);
        border-radius: 10px;
        padding: 2rem;
        width: 350px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        transition: transform 0.3s ease;
        border-top: 5px solid var(--primary-green);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    .card-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--dark-green);
    }

    .marketplace-icon { color: var(--earth-brown); }
    .analysis-icon { color: var(--dark-green); }

    .card h3 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    .card p {
        color: #555;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
    }

    .card-details {
        list-style: none;
        text-align: left;
        margin-bottom: 2rem;
        padding-left: 1rem;
    }

    .card-details li {
        margin-bottom: 0.5rem;
        color: #444;
    }

    .card-details i {
        color: var(--primary-green);
        margin-right: 10px;
    }

    .btn-card {
        width: 100%;
        padding: 0.8rem;
        background-color: #eee;
        color: #555;
        border: none;
        border-radius: 5px;
        cursor: not-allowed; 
        font-weight: bold;
    }

    .btn-card:hover {
        background-color: #ddd;
    }

    @media (max-width: 768px) {
        .hero h1 {
            font-size: 2rem;
        }
        
        .cards-wrapper {
            flex-direction: column;
            align-items: center;
        }

        .card {
            width: 100%;
        }
    }
  `]
})
export class HomeComponent { }
