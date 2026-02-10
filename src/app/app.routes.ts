import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { MarketComponent } from './pages/market/market';
import { RecomComponent } from './pages/recom/recom';
import { DetailComponent } from './pages/detail/detail';
import { PaymentComponent } from './pages/payment/payment';
import { PostComponent } from './pages/post/post';
import { PremiumComponent } from './pages/premium/premium';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'market', component: MarketComponent },
    { path: 'recom', component: RecomComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'post', component: PostComponent },
    { path: 'premium', component: PremiumComponent },
    { path: '**', redirectTo: '' }
];
