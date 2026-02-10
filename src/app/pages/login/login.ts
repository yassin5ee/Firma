import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="main-container">
        <div class="login-card">
            
            <div class="card-header">
                <h2>Ravi de vous revoir ! <i class="fa-solid fa-seedling"></i></h2>
                <p>Connectez-vous pour gérer vos cultures.</p>
            </div>

            <form action="#" method="POST">
                
                <div class="input-group">
                    <label for="email">Adresse E-mail</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-envelope icon"></i>
                        <input type="email" id="email" name="email" placeholder="Entrez votre email" required>
                    </div>
                </div>

                <div class="input-group">
                    <label for="password">Mot de passe</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-lock icon"></i>
                        <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required>
                    </div>
                </div>

                <div class="forgot-password">
                    <a href="#">Mot de passe oublié ?</a>
                </div>

                <button type="submit" class="btn-login">Se connecter</button>
            
            </form>

            <div class="card-footer">
                <p>Pas encore de compte ? <a routerLink="/signup">S'inscrire</a></p>
                <p><a routerLink="/">Retour à l'accueil</a></p>
            </div>

        </div>
    </div>
  `,
    styles: [`
    :host {
        display: block;
        min-height: 100vh;
        /* Image de fond différente (ex: blé ou tracteur) pour varier légèrement */
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    /* --- Carte de Connexion --- */
    .login-card {
        background-color: white;
        width: 100%;
        max-width: 400px;
        padding: 2.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    /* --- En-tête --- */
    .card-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .card-header h2 {
        color: var(--dark-green);
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
    }

    .card-header p {
        color: #666;
        font-size: 0.9rem;
    }

    /* --- Champs de saisie avec icônes --- */
    .input-group {
        margin-bottom: 1.2rem;
    }

    .input-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text-dark);
        font-size: 0.9rem;
    }

    .input-wrapper {
        position: relative;
    }

    .input-wrapper .icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #aaa;
    }

    .input-wrapper input {
        width: 100%;
        padding: 12px 12px 12px 40px; 
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s;
    }

    .input-wrapper input:focus {
        border-color: var(--primary-green);
        outline: none;
        box-shadow: 0 0 5px rgba(46, 204, 113, 0.2);
    }

    .input-wrapper input:focus + .icon {
        color: var(--primary-green);
    }

    /* --- Lien "Mot de passe oublié" --- */
    .forgot-password {
        text-align: right;
        margin-bottom: 1.5rem;
    }

    .forgot-password a {
        color: #666;
        font-size: 0.85rem;
        text-decoration: none;
    }

    .forgot-password a:hover {
        color: var(--dark-green);
        text-decoration: underline;
    }

    /* --- Bouton --- */
    .btn-login {
        width: 100%;
        padding: 12px;
        background-color: var(--dark-green);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }

    .btn-login:hover {
        background-color: var(--primary-green);
        transform: translateY(-2px);
    }

    /* --- Footer --- */
    .card-footer {
        text-align: center;
        margin-top: 2rem;
        font-size: 0.9rem;
        color: #666;
        border-top: 1px solid #eee;
        padding-top: 1.5rem;
    }

    .card-footer p {
        margin-bottom: 0.5rem;
    }

    .card-footer a {
        color: var(--dark-green);
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
    }

    .card-footer a:hover {
        text-decoration: underline;
    }
  `]
})
export class LoginComponent { }
