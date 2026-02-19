import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';
import { AuthService } from '../../shared/auth.service';

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
    price: null as number | null,
    unit: 'tonne',
    region: '',
  };

  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  submitting = false;

  private apiUrl = '/api/products';

  constructor(private router: Router, private auth: AuthService, private zone: NgZone) {}

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => { this.imagePreview = reader.result; };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.formData.title || !this.formData.category || !this.formData.description || !this.formData.price || !this.formData.region || !this.imageFile) {
      alert('Veuillez remplir tous les champs requis et ajouter une image.');
      return;
    }

    const token = this.auth.getToken();
    if (!token) {
      alert('Vous devez vous connecter pour publier une annonce.');
      this.router.navigate(['/login']);
      return;
    }

    const form = new FormData();
    form.append('title', this.formData.title);
    form.append('description', this.formData.description);
    form.append('category', this.formData.category);
    form.append('price', String(this.formData.price));
    form.append('unit', this.formData.unit || 'tonne');
    form.append('region', this.formData.region);
    // Append File directly — browser sets correct MIME type and multipart boundary
    form.append('image', this.imageFile, this.imageFile.name);

    this.submitting = true;

    // Use native fetch instead of Angular HttpClient to avoid dev-proxy stripping the multipart boundary
    fetch(this.apiUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      // DO NOT set Content-Type — browser sets multipart/form-data; boundary=... automatically for FormData
      body: form,
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
        return text;
      })
      .then(() => {
        this.zone.run(() => {
          this.submitting = false;
          alert('Félicitations ! Votre annonce est en ligne.');
          this.router.navigate(['/market'], { queryParams: { t: Date.now() } });
        });
      })
      .catch((err: Error) => {
        this.zone.run(() => {
          this.submitting = false;
          console.error('Publish error', err);
          if (err.message && err.message.includes('403')) {
            // Session expired — clear token and force re-login
            this.auth.logout();
            alert('Votre session a expiré. Veuillez vous reconnecter.');
            this.router.navigate(['/login']);
          } else {
            alert(err.message || 'Erreur serveur. Veuillez réessayer.');
          }
        });
      });
  }
}
