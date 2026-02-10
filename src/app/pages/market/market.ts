import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
    selector: 'app-market',
    standalone: true,
    imports: [CommonModule, HeaderComponent, FooterComponent],
    template: `
    <app-header></app-header>
    
    <header class="market-header">
        <div class="header-content">
            <h1>Marché des Engrais Organiques</h1>
            <p>Achetez local ou vendez vos surplus à d'autres agriculteurs.</p>
            
            <div class="search-bar">
                <input type="text" placeholder="Rechercher un produit (ex: Fumier de cheval)...">
                <button><i class="fa-solid fa-search"></i></button>
            </div>
            
            <button class="btn-sell-product">
                <i class="fa-solid fa-plus-circle"></i> Publier une annonce
            </button>
        </div>
    </header>

    <div class="main-container">
        
        <aside class="filters">
            <h3>Filtres</h3>
            
            <div class="filter-group">
                <h4>Type d'engrais</h4>
                <label><input type="checkbox"> Fumier (Animal)</label>
                <label><input type="checkbox"> Compost (Végétal)</label>
                <label><input type="checkbox"> Engrais Liquide</label>
                <label><input type="checkbox"> Cendres / Autres</label>
            </div>

            <div class="filter-group">
                <h4>Localisation</h4>
                <select>
                    <option value="">Toutes les régions</option>
                    <option value="nord">Zone Nord</option>
                    <option value="centre">Zone Centre</option>
                    <option value="sud">Zone Sud</option>
                </select>
            </div>

            <div class="filter-group">
                <h4>Prix max (par Tonne/L)</h4>
                <input type="range" min="0" max="500">
            </div>
        </aside>

        <section class="product-grid">
            
            <div class="product-card">
                <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');">
                    <span class="badge-type">Compost</span>
                </div>
                <div class="product-info">
                    <h3>Compost Végétal Bio</h3>
                    <p class="location"><i class="fa-solid fa-map-marker-alt"></i> Région Nord (20km)</p>
                    <p class="description">Riche en azote, idéal pour maraîchage. Disponible en vrac.</p>
                    <div class="price-row">
                        <span class="price">120 € / Tonne</span>
                        <span class="seller">Par: Jean D.</span>
                    </div>
                    <button class="btn-buy">Contacter le vendeur</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');">
                    <span class="badge-type">Fumier</span>
                </div>
                <div class="product-info">
                    <h3>Fumier de Cheval</h3>
                    <p class="location"><i class="fa-solid fa-map-marker-alt"></i> Région Centre (50km)</p>
                    <p class="description">Fumier pailleux bien décomposé (6 mois). À venir chercher.</p>
                    <div class="price-row">
                        <span class="price">80 € / Tonne</span>
                        <span class="seller">Par: Ferme du Val</span>
                    </div>
                    <button class="btn-buy">Contacter le vendeur</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-image" style="background-image: url('https://plus.unsplash.com/premium_photo-1664302152996-33923ed34703?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');">
                    <span class="badge-type">Liquide</span>
                </div>
                <div class="product-info">
                    <h3>Purin d'Ortie</h3>
                    <p class="location"><i class="fa-solid fa-map-marker-alt"></i> Région Sud (10km)</p>
                    <p class="description">Stimulant naturel et répulsif. Bidons de 20L.</p>
                    <div class="price-row">
                        <span class="price">15 € / Bidon</span>
                        <span class="seller">Par: Marie L.</span>
                    </div>
                    <button class="btn-buy">Contacter le vendeur</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');">
                    <span class="badge-type">Cendres</span>
                </div>
                <div class="product-info">
                    <h3>Cendres de bois</h3>
                    <p class="location"><i class="fa-solid fa-map-marker-alt"></i> Région Nord (5km)</p>
                    <p class="description">Excellent apport en potasse. Tamisé et sec.</p>
                    <div class="price-row">
                        <span class="price">Gratuit (Échange)</span>
                        <span class="seller">Par: Lucas P.</span>
                    </div>
                    <button class="btn-buy">Contacter le vendeur</button>
                </div>
            </div>

        </section>
    </div>
    <app-footer></app-footer>
  `,
    styles: [`
    :host {
        display: block;
        background-color: #f8f9fa;
        min-height: 100vh;
    }
    
    /* --- Header Marketplace --- */
    .market-header {
        background-color: var(--dark-green);
        color: white;
        padding: 2rem 5%;
        display: flex;
        justify-content: center;
    }

    .header-content {
        width: 100%;
        max-width: 900px;
        text-align: center;
    }

    .header-content h1 { margin-bottom: 0.5rem; }
    .header-content p { opacity: 0.9; margin-bottom: 1.5rem; }

    /* Barre de recherche et Bouton Vendre */
    .search-bar {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .search-bar input {
        width: 60%;
        padding: 10px 15px;
        border: none;
        border-radius: 5px 0 0 5px;
        outline: none;
    }

    .search-bar button {
        padding: 10px 20px;
        border: none;
        background-color: #219150;
        color: white;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }

    .btn-sell-product {
        background-color: #f1c40f; 
        color: #333;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
        transition: transform 0.2s;
    }

    .btn-sell-product:hover { transform: scale(1.05); }

    /* --- Layout Principal (Sidebar + Grid) --- */
    .main-container {
        display: flex;
        padding: 2rem 5%;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    /* Sidebar Filtres */
    .filters {
        width: 250px;
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        height: fit-content;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .filters h3 { margin-bottom: 1rem; color: var(--dark-green); border-bottom: 2px solid #eee; padding-bottom: 0.5rem;}
    .filter-group { margin-bottom: 1.5rem; }
    .filter-group h4 { font-size: 0.95rem; margin-bottom: 0.5rem; }
    .filter-group label { display: block; margin-bottom: 0.3rem; font-size: 0.9rem; color: #555; cursor: pointer; }
    .filter-group select, .filter-group input[type="range"] { width: 100%; padding: 5px; }

    /* Grille de Produits */
    .product-grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
        gap: 20px;
    }

    /* Carte Produit */
    .product-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: transform 0.3s;
        display: flex;
        flex-direction: column;
    }

    .product-card:hover { transform: translateY(-5px); }

    .product-image {
        height: 180px;
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .badge-type {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: rgba(0,0,0,0.6);
        color: white;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
    }

    .product-info { padding: 1.2rem; display: flex; flex-direction: column; flex-grow: 1; }
    .product-info h3 { font-size: 1.1rem; margin-bottom: 0.3rem; }
    .location { color: #888; font-size: 0.85rem; margin-bottom: 0.8rem; }
    .location i { color: var(--primary-green); margin-right: 5px; }
    .description { font-size: 0.9rem; color: #555; margin-bottom: 1rem; line-height: 1.4; flex-grow: 1; }

    .price-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        border-top: 1px solid #eee;
        padding-top: 10px;
    }

    .price { font-weight: bold; color: var(--dark-green); font-size: 1.1rem; }
    .seller { font-size: 0.8rem; color: #888; }

    .btn-buy {
        width: 100%;
        padding: 10px;
        background-color: white;
        border: 2px solid var(--primary-green);
        color: var(--primary-green);
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
    }

    .btn-buy:hover { background-color: var(--primary-green); color: white; }

    @media (max-width: 768px) {
        .main-container { flex-direction: column; }
        .filters { width: 100%; margin-bottom: 1rem; }
    }
  `]
})
export class MarketComponent { }
