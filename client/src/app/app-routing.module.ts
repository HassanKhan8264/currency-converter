import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './shared/components/currency-converter/currency-converter.component';

const routes: Routes = [
  { path: '', redirectTo: '/converter', pathMatch: 'full' },
  { path: 'converter', component: CurrencyConverterComponent},
  // { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) },
  { path: '**', redirectTo: '/converter', pathMatch: 'full' } // Default route to converter page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
