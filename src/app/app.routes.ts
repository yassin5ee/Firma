import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { MarketComponent } from './pages/market/market';
import { RecomComponent } from './pages/recom/recom';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'market', component: MarketComponent },
    { path: 'recom', component: RecomComponent },
    { path: '**', redirectTo: '' }
];
