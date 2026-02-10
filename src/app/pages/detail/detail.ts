import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailComponent implements OnInit {
  product: any = null;
  loading: boolean = true;
  error: string | null = null;
  quantity: number = 1;
  totalPrice: number = 0;

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProductDetails(productId);
      } else {
        // Handle case where id is missing or error
        this.error = "Erreur : Aucun produit sélectionné.";
        this.loading = false;
      }
    });
  }

  async loadProductDetails(id: string) {
    try {
      // In a real scenario, use HttpClient. Here using fetch as per migration.
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new Error("Produit introuvable");

      this.product = await response.json();
      this.updatePrice();
      this.loading = false;
    } catch (err: any) {
      console.error(err);
      this.error = "Erreur : Produit introuvable ou serveur éteint.";
      this.loading = false;

      // Fallback for demo purposes if backend is not running
      // this.product = {
      //   id: id,
      //   title: 'Produit Démo',
      //   description: 'Description du produit de démonstration.',
      //   price: 50,
      //   unit: 'Tonne',
      //   category: 'Fumier',
      //   address: 'Tunis',
      //   image: 'https://via.placeholder.com/400'
      // };
      // this.updatePrice();
    }
  }

  updatePrice() {
    if (this.product) {
      this.totalPrice = this.quantity * parseFloat(this.product.price);
    }
  }

  goToPayment() {
    if (!this.product) return;

    this.router.navigate(['/payment'], {
      queryParams: {
        type: 'product',
        price: this.totalPrice,
        qty: this.quantity,
        title: this.product.title // Optional: pass title for clarity
      }
    });
  }
}
