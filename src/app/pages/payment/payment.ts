import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class PaymentComponent implements OnInit {
  itemName: string = "Abonnement Premium (1 Mois)";
  itemPrice: string = "29.00";
  totalAmount: string = "29.00";

  cardHolder: string = "";
  cardNumber: string = "";
  cardExpiry: string = "";
  cardCvc: string = "";

  processing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const type = params.get('type');
      const price = params.get('price');
      const qty = params.get('qty');
      const title = params.get('title');

      if (type === 'product' && price) {
        this.itemName = title ? `Achat : ${title}` : "Achat : Engrais Organique";
        if (qty && parseInt(qty) > 1) {
          this.itemName += ` (x${qty})`;
        }
        this.itemPrice = parseFloat(price).toFixed(2);
        this.totalAmount = this.itemPrice;
      }
    });
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    this.cardNumber = formattedValue;
  }

  onPay() {
    this.processing = true;

    // Simulation of payment processing
    setTimeout(() => {
      alert("Paiement accepté ! Merci de votre confiance.");
      this.router.navigate(['/']); // Redirect to home
      this.processing = false;
    }, 2000);
  }

  cancel() {
    this.location.back();
  }
}
