import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class PostComponent {
  formData = {
    category: '',
    title: '',
    description: '',
    price: null,
    unit: 'tonne',
    image: '' as string | ArrayBuffer | null
  };

  imagePreview: string | ArrayBuffer | null = null;
  submitting: boolean = false;

  private apiUrl = "http://localhost:3000/api/products";

  constructor(private router: Router) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.formData.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    this.submitting = true;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      });

      if (response.ok) {
        alert("Félicitations ! Votre annonce est en ligne.");
        this.router.navigate(['/market']);
      } else {
        alert("Erreur serveur. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de contacter le serveur.");
    } finally {
      this.submitting = false;
    }
  }
}
