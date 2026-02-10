import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="main-container">
        <div class="signup-card">
            
            <div class="card-header">
                <h2>Bienvenue chez Firma <i class="fa-solid fa-leaf"></i></h2>
                <p>Créez votre compte pour accéder au marketplace et aux outils d'analyse.</p>
            </div>

            <form action="#" method="POST">
                
                <div class="form-row">
                    <div class="input-group">
                        <label for="nom">Nom</label>
                        <input type="text" id="nom" name="nom" placeholder="Votre nom" required>
                    </div>
                    <div class="input-group">
                        <label for="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required>
                    </div>
                </div>

                <div class="input-group">
                    <label for="phone">Numéro de téléphone</label>
                    <input type="tel" id="phone" name="phone" placeholder="ex: 06 12 34 56 78" required>
                </div>

                <div class="input-group">
                    <label for="email">Adresse E-mail</label>
                    <input type="email" id="email" name="email" placeholder="exemple@mail.com" required>
                </div>

                <div class="input-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" placeholder="Minimum 8 caractères" required>
                </div>

                <div class="input-group">
                    <label for="confirm-password">Confirmer le mot de passe</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="Répétez le mot de passe" required>
                </div>

                <button type="submit" class="btn-submit">Créer mon compte</button>
            
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
        /* Image de fond agricole */
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1625246333195-f8196ba00896?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
        background-size: cover;
        background-position: center;
        display: flex; /* Flexbox pour centrer le formulaire */
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    /* --- Conteneur Carte --- */
    .signup-card {
        background-color: white;
        width: 100%;
        max-width: 500px; /* Largeur maximale du formulaire */
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
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    .card-header p {
        color: #666;
        font-size: 0.9rem;
    }

    /* --- Formulaire --- */
    .form-row {
        display: flex;
        gap: 15px; /* Espace entre Nom et Prénom */
    }

    /* Si l'écran est petit, on empile Nom et Prénom */
    @media (max-width: 480px) {
        .form-row {
            flex-direction: column;
            gap: 0;
        }
    }

    .input-group {
        margin-bottom: 1.2rem;
        width: 100%;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: var(--text-dark);
        font-size: 0.9rem;
    }

    .input-group input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s;
    }

    .input-group input:focus {
        border-color: var(--primary-green);
        outline: none;
        box-shadow: 0 0 5px rgba(46, 204, 113, 0.2);
    }

    /* --- Bouton Soumettre --- */
    .btn-submit {
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
        margin-top: 10px;
    }

    .btn-submit:hover {
        background-color: var(--primary-green);
        transform: translateY(-2px);
    }

    /* --- Footer (Liens) --- */
    .card-footer {
        text-align: center;
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: #666;
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
export class SignupComponent { }
