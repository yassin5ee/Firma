import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer>
        <p>&copy; 2024 Firma. Tous droits réservés. | <a href="#">Mentions Légales</a></p>
    </footer>
  `,
    styles: [`
    footer {
        background-color: #222;
        color: #aaa;
        text-align: center;
        padding: 1.5rem;
        margin-top: auto;
    }

    footer a {
        color: var(--primary-green);
        text-decoration: none;
    }
  `]
})
export class FooterComponent { }
