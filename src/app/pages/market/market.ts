import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';
import { FooterComponent } from '../../shared/footer/footer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, timeout, catchError, finalize, map } from 'rxjs/operators';

@Component({
    selector: 'app-market',
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink, NgForOf, NgIf],
    template: `
    <app-header></app-header>
    
    <header class="market-header">
        <div class="header-content">
            <h1>Marché des Engrais Organiques</h1>
            <p>Achetez local ou vendez vos surplus à d'autres agriculteurs.</p>
            
            <div class="search-bar">
                <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange($event)"
                       placeholder="Rechercher un produit (ex: Fumier de cheval)...">
                <button (click)="loadProducts()"><i class="fa-solid fa-search"></i></button>
            </div>
            
            <button class="btn-sell-product" routerLink="/post">
                <i class="fa-solid fa-plus-circle"></i> Publier une annonce
            </button>
        </div>
    </header>

    <div class="main-container">
        
        <aside class="filters">
            <h3>Filtres</h3>
            
            <div class="filter-group">
                <h4>Type d'engrais</h4>
                <label *ngFor="let cat of categories">
                    <input type="checkbox" [checked]="selectedCategories.has(cat.value)"
                           (change)="onCategoryChange(cat.value, $event)"> {{ cat.label }}
                </label>
            </div>

            <div class="filter-group">
                <h4>Localisation</h4>
                <select [(ngModel)]="selectedRegion" (ngModelChange)="loadProducts()">
                    <option value="">Toutes les régions</option>
                    <option value="nord">Zone Nord</option>
                    <option value="centre">Zone Centre</option>
                    <option value="sud">Zone Sud</option>
                </select>
            </div>

            <div class="filter-group">
                <h4>Prix max (par Tonne/L)</h4>
                <input type="range" min="0" max="500" [value]="maxPrice"
                       (input)="onPriceChange($event)">
                <div class="price-display">
                    <span>0 TND</span>
                    <span class="price-val">{{ maxPrice === 500 ? 'Tous' : maxPrice + ' TND' }}</span>
                </div>
            </div>

            <button class="btn-reset" (click)="resetFilters()">
                <i class="fa-solid fa-rotate-left"></i> Réinitialiser
            </button>
        </aside>

        <section class="product-section">
            <div class="results-header">
                <span class="result-count" *ngIf="!loading() && !error()">
                    {{ total() }} produit{{ total() !== 1 ? 's' : '' }} trouvé{{ total() !== 1 ? 's' : '' }}
                </span>
                <div class="active-tags">
                    <span class="tag" *ngIf="searchQuery">
                        <i class="fa-solid fa-search"></i> "{{ searchQuery }}"
                        <button (click)="searchQuery=''; loadProducts()">×</button>
                    </span>
                    <span class="tag" *ngFor="let cat of selectedCategoriesArray()">
                        {{ cat }}
                        <button (click)="removeCategory(cat)">×</button>
                    </span>
                    <span class="tag" *ngIf="selectedRegion">
                        <i class="fa-solid fa-map-marker-alt"></i> {{ regionLabel(selectedRegion) }}
                        <button (click)="selectedRegion=''; loadProducts()">×</button>
                    </span>
                    <span class="tag" *ngIf="maxPrice < 500">
                        Max {{ maxPrice }} TND
                        <button (click)="maxPrice=500; loadProducts()">×</button>
                    </span>
                </div>
            </div>

            <div class="product-grid">
            <div *ngIf="error()" class="empty-container" style="color:#c0392b;padding:2rem;text-align:center"><i class="fa-solid fa-circle-exclamation"></i> {{ error() }}</div>
            <div *ngIf="loading()" class="empty-container" style="text-align:center;padding:2rem;color:#555"><i class="fa-solid fa-spinner fa-spin"></i> Chargement des produits...</div>
            <div *ngIf="!loading() && !error() && products().length === 0" class="empty-container">Aucun produit ne correspond à vos critères.</div>

            <div class="product-card" *ngFor="let p of products()">
                <div class="product-image" [ngStyle]="{'background-image': 'url(' + (p.imageUrl || 'https://via.placeholder.com/800') + ')'}">
                    <span class="badge-type">{{ p.category }}</span>
                </div>
                <div class="product-info">
                    <h3>{{ p.title }}</h3>
                    <p class="location"><i class="fa-solid fa-map-marker-alt"></i> {{ regionLabel(p.region) || p.address || 'Zone non précisée' }}</p>
                    <p class="description">{{ p.description }}</p>
                    <div class="price-row">
                        <span class="price">{{ p.price }} TND / {{ p.unit }}</span>
                        <span class="seller">Par: {{ p.seller?.firstName || p.sellerId || 'Vendeur' }}</span>
                    </div>
                    <button class="btn-buy" [routerLink]="['/detail']" [queryParams]="{ id: p.id }">Voir détails</button>
                </div>
            </div>
            </div><!-- /.product-grid -->
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

    .price-display { display: flex; justify-content: space-between; font-size: 0.8rem; color: #666; margin-top: 4px; }
    .price-val { font-weight: 600; color: var(--dark-green); }

    .btn-reset {
        width: 100%; padding: 8px; background: none; border: 1.5px solid #ccc;
        border-radius: 6px; cursor: pointer; color: #666; font-size: 0.85rem;
        margin-top: 0.5rem; transition: 0.2s;
    }
    .btn-reset:hover { border-color: var(--primary-green); color: var(--primary-green); }

    /* Product section */
    .product-section { flex: 1; display: flex; flex-direction: column; min-width: 0; }

    .results-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 1rem; }
    .result-count { font-size: 0.85rem; color: #888; white-space: nowrap; }
    .active-tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag {
        display: inline-flex; align-items: center; gap: 4px;
        background: #eafaf1; border: 1px solid #a9dfbf; color: #1e8449;
        padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 500;
    }
    .tag button { background: none; border: none; cursor: pointer; color: #1e8449; font-size: 0.85rem; padding: 0; line-height: 1; }

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
export class MarketComponent implements OnInit, OnDestroy {
    products = signal<any[]>([]);
    loading = signal(true);
    error = signal<string | null>(null);
    total = signal(0);

    // Filter state
    searchQuery = '';
    selectedCategories = new Set<string>();
    selectedRegion = '';
    maxPrice = 500;

    readonly categories = [
        { value: 'fumier',   label: 'Fumier' },
        { value: 'liquide',  label: 'Déchets Liquides / Purin' },
        { value: 'compost',  label: 'Compost' },
        { value: 'cendres',  label: 'Cendres' },
        { value: 'biomasse', label: 'Biomasse végétale' },
        { value: 'autre',    label: 'Autre' },
    ];

    private api = '/api/products';
    private loadSub: Subscription | null = null;
    private search$ = new Subject<string>();
    private searchSub: Subscription | null = null;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // Debounce the search input — wait 400ms after user stops typing
        this.searchSub = this.search$.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(() => this.loadProducts());

        this.loadProducts();
    }

    ngOnDestroy(): void {
        this.loadSub?.unsubscribe();
        this.searchSub?.unsubscribe();
    }

    onSearchChange(val: string): void {
        this.search$.next(val);
    }

    onCategoryChange(value: string, event: Event): void {
        const checked = (event.target as HTMLInputElement).checked;
        if (checked) this.selectedCategories.add(value);
        else this.selectedCategories.delete(value);
        this.loadProducts();
    }

    onPriceChange(event: Event): void {
        this.maxPrice = Number((event.target as HTMLInputElement).value);
        this.loadProducts();
    }

    removeCategory(cat: string): void {
        this.selectedCategories.delete(cat);
        this.loadProducts();
    }

    selectedCategoriesArray(): string[] {
        return Array.from(this.selectedCategories);
    }

    regionLabel(region: string): string {
        const map: Record<string, string> = { nord: 'Zone Nord', centre: 'Zone Centre', sud: 'Zone Sud' };
        return map[region] ?? region ?? '';
    }

    resetFilters(): void {
        this.searchQuery = '';
        this.selectedCategories.clear();
        this.selectedRegion = '';
        this.maxPrice = 500;
        this.loadProducts();
    }

    loadProducts() {
        this.loading.set(true);
        this.error.set(null);
        this.loadSub?.unsubscribe();

        let params = new HttpParams();
        if (this.searchQuery.trim())          params = params.set('q', this.searchQuery.trim());
        if (this.selectedCategories.size > 0) params = params.set('category', Array.from(this.selectedCategories).join(','));
        if (this.selectedRegion)              params = params.set('region', this.selectedRegion);
        if (this.maxPrice < 500)              params = params.set('maxPrice', String(this.maxPrice));
        params = params.set('size', '50');

        this.loadSub = this.http.get<any>(this.api, { params }).pipe(
            timeout(8000),
            map((res: any) => {
                this.total.set(res?.total ?? 0);
                return res?.items ?? (Array.isArray(res) ? res : []);
            }),
            catchError(err => {
                console.error('Failed to load products', err);
                this.error.set('Impossible de charger les produits.');
                this.total.set(0);
                return of([] as any[]);
            }),
            finalize(() => { this.loading.set(false); })
        ).subscribe({
            next: (items: any[]) => { this.products.set(items || []); }
        });
    }
}
