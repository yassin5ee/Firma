import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
    selector: 'app-recom',
    standalone: true,
    imports: [CommonModule, HeaderComponent, FooterComponent],
    template: `
    <app-header></app-header>
    
    <div class="main-container">

        <header class="page-header">
            <h1><i class="fa-solid fa-chart-line"></i> Analyse de vos Terres</h1>
            <p>Remplissez les données de vos sols pour obtenir des conseils personnalisés par notre IA.</p>
        </header>

        <section class="data-input-section">
            
            <div class="card form-card">
                <h3>1. Composition du Sol</h3>
                <p class="hint">Entrez les valeurs issues de vos analyses laboratoire.</p>
                
                <div class="table-responsive">
                    <table class="soil-table">
                        <thead>
                            <tr>
                                <th>Zone / Parcelle</th>
                                <th>Azote (N) <small>mg/kg</small></th>
                                <th>Potassium (K) <small>mg/kg</small></th>
                                <th>Calcium (Ca) <small>mg/kg</small></th>
                                <th>pH <small>0-14</small></th>
                                <th>Salinité <small>dS/m</small></th>
                                <th>Granulométrie</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" value="Zone Nord - A"></td>
                                <td><input type="number" placeholder="ex: 1.5"></td>
                                <td><input type="number" placeholder="ex: 200"></td>
                                <td><input type="number" placeholder="ex: 1500"></td>
                                <td><input type="number" step="0.1" placeholder="ex: 7.2"></td>
                                <td><input type="number" step="0.1" placeholder="ex: 1.1"></td>
                                <td>
                                    <select>
                                        <option>Argileux</option>
                                        <option>Sableux</option>
                                        <option>Limoneux</option>
                                    </select>
                                </td>
                                <td><button class="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="Nom zone..."></td>
                                <td><input type="number"></td>
                                <td><input type="number"></td>
                                <td><input type="number"></td>
                                <td><input type="number"></td>
                                <td><input type="number"></td>
                                <td>
                                    <select>
                                        <option>Argileux</option>
                                        <option>Sableux</option>
                                        <option>Limoneux</option>
                                    </select>
                                </td>
                                <td><button class="btn-delete"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="btn-add-row"><i class="fa-solid fa-plus"></i> Ajouter une zone</button>
            </div>

            <div class="card form-card">
                <h3>2. Données Météorologiques</h3>
                <div class="weather-inputs">
                    <div class="input-group">
                        <label><i class="fa-solid fa-temperature-high"></i> Température Moyenne (°C)</label>
                        <input type="number" placeholder="ex: 24">
                    </div>
                    <div class="input-group">
                        <label><i class="fa-solid fa-cloud-rain"></i> Précipitations (mm/an)</label>
                        <input type="number" placeholder="ex: 400">
                    </div>
                </div>
            </div>

            <div class="action-area">
                <button class="btn-analyze">Lancer l'Analyse IA <i class="fa-solid fa-microchip"></i></button>
            </div>

        </section>

        <hr class="divider">

        <section class="results-section">
            
            <div class="result-column">
                <div class="card result-card">
                    <div class="card-title">
                        <h2><i class="fa-solid fa-seedling"></i> Cultures Recommandées</h2>
                    </div>
                    <div class="recommendation-list">
                        <div class="rec-item">
                            <div class="rec-score high">98% Compatible</div>
                            <h4>Blé Dur</h4>
                            <p>Parfait pour votre zone argileuse et pH 7.2.</p>
                        </div>
                        <div class="rec-item">
                            <div class="rec-score medium">75% Compatible</div>
                            <h4>Orge</h4>
                            <p>Bon potentiel, mais nécessite un apport en Azote.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result-column">
                <div class="card result-card">
                    <div class="card-title">
                        <h2><i class="fa-solid fa-calculator"></i> Test de Rentabilité</h2>
                    </div>
                    
                    <div class="simulator-box">
                        <label>Quelle plante voulez-vous cultiver ?</label>
                        <div class="sim-input">
                            <input type="text" placeholder="ex: Tomates">
                            <button>Vérifier</button>
                        </div>
                    </div>

                    <div class="simulation-result">
                        <h4>Résultat pour : <span class="highlight">Tomates</span></h4>
                        <div class="status bad"><i class="fa-solid fa-exclamation-triangle"></i> Risqué</div>
                        <p class="reason">Votre sol est trop salin (1.1 dS/m) pour la tomate sans traitement.</p>
                        
                        <div class="advice-box">
                            <h5>Bonnes pratiques requises :</h5>
                            <ul>
                                <li><i class="fa-solid fa-check"></i> Ajouter du Calcium pour contrer la salinité.</li>
                                <li><i class="fa-solid fa-check"></i> Augmenter l'irrigation de 20%.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </section>

    </div>
    <app-footer></app-footer>
  `,
    styles: [`
    :host {
        display: block;
        background-color: #f0f2f5;
        min-height: 100vh;
        padding-bottom: 50px;
    }

    /* --- Container Principal --- */
    .main-container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 20px;
    }

    /* --- Header Page --- */
    .page-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    .page-header h1 { color: var(--dark-green); margin-bottom: 0.5rem; }
    .page-header p { color: #666; }

    /* --- Cartes Générales --- */
    .card {
        background: var(--white);
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        margin-bottom: 2rem;
    }

    .form-card h3 {
        border-left: 5px solid var(--primary-green);
        padding-left: 10px;
        margin-bottom: 1rem;
        color: var(--dark-green);
    }

    .hint { font-size: 0.85rem; color: #888; margin-bottom: 1rem; font-style: italic; }

    /* --- Tableau Responsive --- */
    .table-responsive {
        overflow-x: auto;
    }

    .soil-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
    }

    .soil-table th, .soil-table td {
        border: 1px solid #eee;
        padding: 12px;
        text-align: center;
    }

    .soil-table th {
        background-color: #f9f9f9;
        color: #444;
        font-weight: 500;
    }

    .soil-table th small { display: block; font-size: 0.7rem; color: #888; }

    .soil-table input, .soil-table select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .btn-delete {
        background: none;
        border: none;
        color: #e74c3c;
        cursor: pointer;
    }

    .btn-add-row {
        margin-top: 10px;
        background: none;
        border: 2px dashed var(--primary-green);
        color: var(--primary-green);
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        width: 100%;
    }

    .btn-add-row:hover { background-color: #eafaf1; }

    /* --- Section Météo --- */
    .weather-inputs {
        display: flex;
        gap: 20px;
    }

    .weather-inputs .input-group { flex: 1; }
    .weather-inputs label { display: block; margin-bottom: 8px; font-weight: 500; }
    .weather-inputs input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }

    /* --- Bouton Analyser --- */
    .action-area { text-align: center; }
    .btn-analyze {
        background-color: var(--dark-green);
        color: white;
        border: none;
        padding: 15px 40px;
        font-size: 1.1rem;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
        transition: transform 0.2s;
    }
    .btn-analyze:hover { transform: scale(1.05); background-color: var(--primary-green); }

    .divider { border: 0; height: 1px; background: #ddd; margin: 3rem 0; }

    /* --- Section Résultats --- */
    .results-section {
        display: flex;
        gap: 2rem;
    }

    .result-column { flex: 1; }

    .result-card h2 { font-size: 1.3rem; color: #333; margin-bottom: 1.5rem; }

    /* Liste Suggestions */
    .rec-item {
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
    }
    .rec-score {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
        color: white;
        margin-bottom: 5px;
    }
    .rec-score.high { background-color: #27ae60; }
    .rec-score.medium { background-color: #f1c40f; color: #333; }

    /* Simulateur */
    .simulator-box label { display: block; margin-bottom: 10px; font-weight: 500; }
    .sim-input { display: flex; gap: 10px; margin-bottom: 2rem; }
    .sim-input input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
    .sim-input button {
        padding: 0 20px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    /* Résultat Simulation */
    .simulation-result {
        background-color: #fff5f5; 
        border: 1px solid #ffcccc;
        padding: 1rem;
        border-radius: 8px;
    }
    .simulation-result h4 { margin-bottom: 10px; }
    .status { display: inline-block; font-weight: bold; margin-bottom: 10px; padding: 5px 10px; border-radius: 5px; }
    .status.bad { background-color: #e74c3c; color: white; }
    .status.good { background-color: #27ae60; color: white; }

    .advice-box {
        margin-top: 15px;
        background-color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 0.9rem;
    }
    .advice-box h5 { color: #555; margin-bottom: 5px; }
    .advice-box ul { list-style: none; padding-left: 5px; }
    .advice-box li { margin-bottom: 5px; color: #444; }
    .advice-box i { color: #27ae60; margin-right: 5px; }

    @media (max-width: 768px) {
        .results-section { flex-direction: column; }
        .weather-inputs { flex-direction: column; }
    }
  `]
})
export class RecomComponent { }
