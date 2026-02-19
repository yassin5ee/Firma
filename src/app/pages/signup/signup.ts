import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
  <div class="main-container">
      <div class="signup-card">
          <div class="card-header">
              <h2>Bienvenue chez Firma <i class="fa-solid fa-leaf"></i></h2>
              <p>Créez votre compte pour accéder au marketplace et aux outils d'analyse.</p>
          </div>

          <form (ngSubmit)="onSubmit()" #signupForm="ngForm">
              <div class="form-row">
                  <div class="input-group">
                      <label for="firstName">Nom</label>
                      <input [(ngModel)]="firstName" name="firstName" type="text" id="firstName" placeholder="Votre nom" required />
                  </div>
                  <div class="input-group">
                      <label for="lastName">Prénom</label>
                      <input [(ngModel)]="lastName" name="lastName" type="text" id="lastName" placeholder="Votre prénom" required />
                  </div>
              </div>

              <div class="input-group">
                  <label for="phone">Numéro de téléphone</label>
                  <input [(ngModel)]="phone" name="phone" type="tel" id="phone" placeholder="ex: 06 12 34 56 78" required />
              </div>

              <div class="input-group">
                  <label for="email">Adresse E-mail</label>
                  <input [(ngModel)]="email" name="email" type="email" id="email" placeholder="exemple@mail.com" required />
              </div>

              <div class="input-group">
                  <label for="password">Mot de passe</label>
                  <input [(ngModel)]="password" name="password" type="password" id="password" placeholder="Minimum 8 caractères" required />
              </div>

              <div class="input-group">
                  <label for="confirmPassword">Confirmer le mot de passe</label>
                  <input [(ngModel)]="confirmPassword" name="confirmPassword" type="password" id="confirmPassword" placeholder="Répétez le mot de passe" required />
              </div>

              <button type="submit" class="btn-submit" [disabled]="!signupForm.form.valid">Créer mon compte</button>
          </form>

          <div class="card-footer">
              <p>Vous avez déjà un compte ? <a routerLink="/login">Se connecter</a></p>
              <p><a routerLink="/">Retour à l'accueil</a></p>
          </div>
      </div>
  </div>
  `,
  styles: [`
  :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1625246333195-f8196ba00896?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
  }

  .signup-card {
      background-color: white;
      width: 100%;
      max-width: 500px;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }

  .card-header { text-align: center; margin-bottom: 2rem; }
  .card-header h2 { color: var(--dark-green); font-size: 1.8rem; margin-bottom: 0.5rem; }
  .card-header p { color: #666; font-size: 0.9rem; }

  .form-row { display: flex; gap: 15px; }
  @media (max-width: 480px) { .form-row { flex-direction: column; gap: 0; } }

  .input-group { margin-bottom: 1.2rem; width: 100%; }
  .input-group label { display:block; margin-bottom:5px; font-weight:500; color:var(--text-dark); font-size:0.9rem; }
  .input-group input { width:100%; padding:12px; border:1px solid #ddd; border-radius:6px; font-size:1rem; transition:border-color 0.3s; }
  .input-group input:focus { border-color:var(--primary-green); outline:none; box-shadow:0 0 5px rgba(46,204,113,0.2); }

  .btn-submit { width:100%; padding:12px; background-color:var(--dark-green); color:white; border:none; border-radius:6px; font-size:1.1rem; font-weight:bold; cursor:pointer; transition:background-color 0.3s, transform 0.2s; margin-top:10px; }
  .btn-submit:hover { background-color:var(--primary-green); transform:translateY(-2px); }

  .card-footer { text-align:center; margin-top:1.5rem; font-size:0.9rem; color:#666; }
  .card-footer a { color:var(--dark-green); text-decoration:none; font-weight:bold; cursor:pointer; }
  .card-footer a:hover { text-decoration:underline; }
  `]
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    const payload = { firstName: this.firstName, lastName: this.lastName, phone: this.phone, email: this.email, password: this.password };
    this.auth.signup(payload).subscribe({
      next: (res: any) => {
        alert('Inscription réussie');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Échec de l\'inscription');
      }
    });
  }
}
