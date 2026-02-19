import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailComponent implements OnInit, OnDestroy {
  product = signal<any>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  quantity = signal(1);
  totalPrice = signal(0);

  private apiUrl = '/api/products';
  private routeSub: Subscription | null = null;
  private httpSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProduct(productId);
      } else {
        this.error.set('Erreur : Aucun produit sélectionné.');
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.httpSub?.unsubscribe();
  }

  loadProduct(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.product.set(null);
    this.httpSub?.unsubscribe();

    this.httpSub = this.http.get(`${this.apiUrl}/${id}`).pipe(
      finalize(() => { this.loading.set(false); })
    ).subscribe({
      next: (data: any) => {
        this.product.set(data);
        this.updatePrice();
      },
      error: (err) => {
        if (err.status === 404) {
          this.error.set('Produit introuvable (404).');
        } else {
          this.error.set('Erreur lors du chargement du produit.');
        }
        console.error('Product load error', err);
      }
    });
  }

  onQuantityChange(val: number): void {
    this.quantity.set(Number(val));
    this.updatePrice();
  }

  updatePrice(): void {
    this.totalPrice.set(this.quantity() * Number(this.product()?.price ?? 0));
  }

  goToPayment(): void {
    if (!this.product()) return;
    this.router.navigate(['/payment'], {
      queryParams: {
        type: 'product',
        price: this.totalPrice(),
        qty: this.quantity(),
        title: this.product().title
      }
    });
  }
}

