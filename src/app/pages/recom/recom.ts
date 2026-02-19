import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { FooterComponent } from '../../shared/footer/footer';
import { HttpClient } from '@angular/common/http';

interface CropRow {
  N: number; P: number; K: number;
  temperature: number; humidity: number;
  ph: number; rainfall: number;
  label: string;
}

interface Recommendation {
  crop: string;
  cropFr: string;
  score: number;
  scoreClass: string;
  optimalN: number; optimalP: number; optimalK: number;
  optimalTemp: number; optimalHumidity: number;
  optimalPh: number; optimalRainfall: number;
}

const CROP_FR: Record<string, string> = {
  rice: 'Riz', maize: 'Maïs', chickpea: 'Pois Chiche',
  kidneybeans: 'Haricots Rouges', pigeonpeas: "Pois d'Angole",
  mothbeans: 'Haricots Moth', mungbean: 'Haricot Mungo',
  blackgram: 'Urad Dal', lentil: 'Lentille',
  pomegranate: 'Grenade', banana: 'Banane', mango: 'Mangue',
  grapes: 'Raisin', watermelon: 'Pastèque', muskmelon: 'Melon',
  apple: 'Pomme', orange: 'Orange', papaya: 'Papaye',
  coconut: 'Noix de Coco', cotton: 'Coton', jute: 'Jute', coffee: 'Café',
};

const FEATURES = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'] as const;
type Feature = typeof FEATURES[number];

@Component({
    selector: 'app-recom',
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
    template: `
  <app-header></app-header>

  <div class="main-container">

    <header class="page-header">
      <h1><i class="fa-solid fa-seedling"></i> Recommandation de Cultures</h1>
      <p>Entrez les valeurs de votre sol et de votre climat — notre moteur compare vos données avec
         {{ dataCount() }} profils agronomiques réels pour trouver les cultures les plus adaptées.</p>
    </header>

    <div *ngIf="dataLoading()" class="info-banner">
      <i class="fa-solid fa-spinner fa-spin"></i> Chargement de la base de données agronomiques...
    </div>

    <div *ngIf="!dataLoading()" class="form-grid">

      <div class="card">
        <h3><i class="fa-solid fa-flask"></i> Composition du Sol</h3>
        <div class="input-row">
          <div class="input-group">
            <label>Azote (N) <span class="unit">mg/kg</span></label>
            <input type="number" [(ngModel)]="form.N" min="0" max="140" placeholder="ex: 50"
                   [class.invalid]="submitted() && form.N === null">
            <span class="range-hint">Plage : 0 – 140</span>
          </div>
          <div class="input-group">
            <label>Phosphore (P) <span class="unit">mg/kg</span></label>
            <input type="number" [(ngModel)]="form.P" min="0" max="145" placeholder="ex: 50"
                   [class.invalid]="submitted() && form.P === null">
            <span class="range-hint">Plage : 5 – 145</span>
          </div>
          <div class="input-group">
            <label>Potassium (K) <span class="unit">mg/kg</span></label>
            <input type="number" [(ngModel)]="form.K" min="0" max="205" placeholder="ex: 50"
                   [class.invalid]="submitted() && form.K === null">
            <span class="range-hint">Plage : 5 – 205</span>
          </div>
          <div class="input-group">
            <label>pH du Sol <span class="unit">0 – 14</span></label>
            <input type="number" [(ngModel)]="form.ph" min="0" max="14" step="0.1" placeholder="ex: 6.5"
                   [class.invalid]="submitted() && form.ph === null">
            <span class="range-hint">Plage : 3.5 – 10</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3><i class="fa-solid fa-cloud-sun"></i> Conditions Climatiques</h3>
        <div class="input-row">
          <div class="input-group">
            <label>Température <span class="unit">°C</span></label>
            <input type="number" [(ngModel)]="form.temperature" min="0" max="50" placeholder="ex: 25"
                   [class.invalid]="submitted() && form.temperature === null">
            <span class="range-hint">Plage : 8 – 44°C</span>
          </div>
          <div class="input-group">
            <label>Humidité <span class="unit">%</span></label>
            <input type="number" [(ngModel)]="form.humidity" min="0" max="100" placeholder="ex: 70"
                   [class.invalid]="submitted() && form.humidity === null">
            <span class="range-hint">Plage : 14 – 100%</span>
          </div>
          <div class="input-group">
            <label>Précipitations <span class="unit">mm/an</span></label>
            <input type="number" [(ngModel)]="form.rainfall" min="0" max="300" placeholder="ex: 150"
                   [class.invalid]="submitted() && form.rainfall === null">
            <span class="range-hint">Plage : 20 – 300 mm</span>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="!dataLoading()" class="action-area">
      <button class="btn-analyze" (click)="analyze()">
        <i class="fa-solid fa-microchip"></i> Lancer l'Analyse IA
      </button>
    </div>

    <div *ngIf="error()" class="error-msg">
      <i class="fa-solid fa-circle-exclamation"></i> {{ error() }}
    </div>

    <div *ngIf="results().length > 0" class="results-section">
      <h2><i class="fa-solid fa-chart-bar"></i> Résultats pour votre Profil</h2>
      <p class="results-sub">Analyse basée sur les {{ K }} profils agronomiques les plus proches dans la base de données.</p>

      <div class="results-grid">
        <div class="rec-card" *ngFor="let r of results(); let i = index" [class.top]="i === 0">
          <div class="rank-badge" [class.gold]="i === 0" [class.silver]="i === 1" [class.bronze]="i === 2">
            #{{ i + 1 }}
          </div>
          <div class="crop-icon"><i class="fa-solid fa-seedling"></i></div>
          <h3 class="crop-name">{{ r.cropFr }}</h3>
          <p class="crop-en">{{ r.crop }}</p>
          <div class="score-wrap">
            <div class="score-track">
              <div class="score-fill" [class]="r.scoreClass" [style.width.%]="r.score"></div>
            </div>
            <span class="score-pct" [class]="r.scoreClass">{{ r.score }}%</span>
          </div>
          <div class="compat-label" [class]="r.scoreClass">
            {{ r.scoreClass === 'high' ? 'Très compatible' : r.scoreClass === 'medium' ? 'Compatible' : 'Peu compatible' }}
          </div>
          <div class="optimal-conditions">
            <p class="cond-title">Conditions optimales :</p>
            <div class="cond-grid">
              <span><strong>N</strong> {{ r.optimalN | number:'1.0-0' }}</span>
              <span><strong>P</strong> {{ r.optimalP | number:'1.0-0' }}</span>
              <span><strong>K</strong> {{ r.optimalK | number:'1.0-0' }}</span>
              <span><strong>pH</strong> {{ r.optimalPh | number:'1.1-1' }}</span>
              <span><i class="fa-solid fa-thermometer-half"></i> {{ r.optimalTemp | number:'1.0-1' }}°C</span>
              <span><i class="fa-solid fa-droplet"></i> {{ r.optimalHumidity | number:'1.0-0' }}%</span>
              <span><i class="fa-solid fa-cloud-rain"></i> {{ r.optimalRainfall | number:'1.0-0' }}mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <app-footer></app-footer>
  `,
    styles: [`
    :host { display: block; background-color: #f0f2f5; min-height: 100vh; padding-bottom: 60px; }

    .main-container { max-width: 1100px; margin: 2rem auto; padding: 0 20px; }

    .page-header { text-align: center; margin-bottom: 2rem; }
    .page-header h1 { color: var(--dark-green); font-size: 1.8rem; margin-bottom: 0.5rem; }
    .page-header p { color: #666; max-width: 680px; margin: 0 auto; line-height: 1.6; }

    .info-banner {
      background: #eafaf1; border: 1px solid #a9dfbf; color: #1e8449;
      padding: 1rem 1.5rem; border-radius: 8px; text-align: center;
      margin-bottom: 1.5rem; font-weight: 500;
    }

    .form-grid { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 1.5rem; }

    .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
    .card h3 { border-left: 5px solid var(--primary-green); padding-left: 12px; margin-bottom: 1.2rem; color: var(--dark-green); font-size: 1.05rem; }

    .input-row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .input-group { flex: 1; min-width: 155px; display: flex; flex-direction: column; }
    .input-group label { font-size: 0.9rem; font-weight: 600; color: #333; margin-bottom: 6px; }
    .unit { font-size: 0.75rem; color: #888; font-weight: 400; margin-left: 4px; }
    .input-group input {
      padding: 10px 12px; border: 1.5px solid #ddd; border-radius: 8px;
      font-size: 0.95rem; transition: border-color 0.2s; outline: none;
    }
    .input-group input:focus { border-color: var(--primary-green); }
    .input-group input.invalid { border-color: #e74c3c; background: #fff5f5; }
    .range-hint { font-size: 0.72rem; color: #aaa; margin-top: 4px; }

    .action-area { text-align: center; margin: 1.5rem 0 2rem; }
    .btn-analyze {
      background: var(--dark-green); color: white; border: none;
      padding: 14px 44px; font-size: 1.05rem; border-radius: 50px; cursor: pointer;
      font-weight: 600; box-shadow: 0 5px 18px rgba(39,174,96,0.35); transition: transform 0.2s, background 0.2s;
    }
    .btn-analyze:hover { transform: scale(1.04); background: var(--primary-green); }

    .error-msg {
      background: #fff0f0; border: 1px solid #f5c6cb; color: #c0392b;
      padding: 0.9rem 1.2rem; border-radius: 8px; margin-bottom: 1.5rem;
    }

    .results-section { margin-top: 1rem; }
    .results-section > h2 { color: var(--dark-green); margin-bottom: 0.3rem; }
    .results-sub { color: #888; font-size: 0.85rem; margin-bottom: 1.5rem; }

    .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.2rem; }

    .rec-card {
      background: white; border-radius: 14px; padding: 1.4rem 1.2rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07); position: relative;
      text-align: center; transition: transform 0.2s; border: 2px solid transparent;
    }
    .rec-card:hover { transform: translateY(-4px); }
    .rec-card.top { border-color: #f1c40f; box-shadow: 0 4px 20px rgba(241,196,15,0.25); }

    .rank-badge {
      position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
      background: #95a5a6; color: white; font-weight: 700; font-size: 0.75rem;
      padding: 3px 12px; border-radius: 20px;
    }
    .rank-badge.gold { background: #f1c40f; color: #333; }
    .rank-badge.silver { background: #bdc3c7; color: #333; }
    .rank-badge.bronze { background: #d35400; }

    .crop-icon { font-size: 2.2rem; color: var(--primary-green); margin: 0.8rem 0 0.5rem; }
    .crop-name { font-size: 1.15rem; font-weight: 700; color: #222; margin: 0 0 2px; }
    .crop-en { font-size: 0.75rem; color: #999; text-transform: capitalize; margin: 0 0 1rem; }

    .score-wrap { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .score-track { flex: 1; height: 8px; background: #eee; border-radius: 4px; overflow: hidden; }
    .score-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
    .score-fill.high { background: #27ae60; }
    .score-fill.medium { background: #f39c12; }
    .score-fill.low { background: #e74c3c; }
    .score-pct { font-weight: 700; font-size: 0.9rem; min-width: 38px; }
    .score-pct.high { color: #27ae60; }
    .score-pct.medium { color: #f39c12; }
    .score-pct.low { color: #e74c3c; }

    .compat-label { font-size: 0.78rem; margin-bottom: 1rem; font-weight: 600; }
    .compat-label.high { color: #27ae60; }
    .compat-label.medium { color: #f39c12; }
    .compat-label.low { color: #e74c3c; }

    .optimal-conditions { background: #f8f9fa; border-radius: 8px; padding: 0.8rem; text-align: left; }
    .cond-title { font-weight: 600; color: #333; margin-bottom: 6px; font-size: 0.78rem; }
    .cond-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; font-size: 0.77rem; color: #555; }
    .cond-grid i { color: var(--primary-green); font-size: 0.7rem; margin-right: 2px; }

    @media (max-width: 768px) {
      .input-row { flex-direction: column; }
      .results-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .results-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class RecomComponent implements OnInit {

  readonly K = 30;

  form: Record<Feature, number | null> = {
    N: null, P: null, K: null,
    temperature: null, humidity: null,
    ph: null, rainfall: null
  };

  dataLoading = signal(true);
  dataCount = signal(0);
  submitted = signal(false);
  error = signal<string | null>(null);
  results = signal<Recommendation[]>([]);

  private data: CropRow[] = [];
  private minStats: Record<string, number> = {};
  private maxStats: Record<string, number> = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/crop_data.csv', { responseType: 'text' }).subscribe({
      next: (csv) => {
        this.data = this.parseCsv(csv);
        this.computeStats();
        this.dataCount.set(this.data.length);
        this.dataLoading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger la base de données agronomiques.');
        this.dataLoading.set(false);
      }
    });
  }

  analyze(): void {
    this.submitted.set(true);
    const vals = FEATURES.map(f => this.form[f]);
    if (vals.some(v => v === null || isNaN(v as number))) {
      this.error.set("Veuillez remplir tous les champs avant de lancer l'analyse.");
      return;
    }
    this.error.set(null);

    const userVec = FEATURES.map((f, i) => this.norm(vals[i]!, f));

    const dists = this.data
      .map(row => ({
        label: row.label,
        dist: Math.sqrt(FEATURES.reduce((s, f, i) => {
          const d = userVec[i] - this.norm(row[f], f);
          return s + d * d;
        }, 0))
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, this.K);

    const votes: Record<string, number> = {};
    for (const d of dists) votes[d.label] = (votes[d.label] || 0) + 1;

    const grouped: Record<string, CropRow[]> = {};
    for (const row of this.data) (grouped[row.label] ??= []).push(row);

    this.results.set(
      Object.entries(votes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([crop, count]) => {
          const rows = grouped[crop];
          const avg = (f: Feature) => rows.reduce((s, r) => s + r[f], 0) / rows.length;
          const score = Math.round((count / this.K) * 100);
          return {
            crop,
            cropFr: CROP_FR[crop] || crop,
            score,
            scoreClass: score >= 60 ? 'high' : score >= 30 ? 'medium' : 'low',
            optimalN: avg('N'), optimalP: avg('P'), optimalK: avg('K'),
            optimalTemp: avg('temperature'), optimalHumidity: avg('humidity'),
            optimalPh: avg('ph'), optimalRainfall: avg('rainfall'),
          };
        })
    );
  }

  private parseCsv(csv: string): CropRow[] {
    return csv.trim().split('\n').slice(1).map(line => {
      const [N, P, K, temperature, humidity, ph, rainfall, label] = line.split(',');
      return { N: +N, P: +P, K: +K, temperature: +temperature, humidity: +humidity, ph: +ph, rainfall: +rainfall, label: label.trim() };
    });
  }

  private computeStats(): void {
    for (const f of FEATURES) {
      const vals = this.data.map(r => r[f]);
      this.minStats[f] = Math.min(...vals);
      this.maxStats[f] = Math.max(...vals);
    }
  }

  private norm(v: number, f: string): number {
    const min = this.minStats[f], max = this.maxStats[f];
    return max === min ? 0 : (v - min) / (max - min);
  }
}

