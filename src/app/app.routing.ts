
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from '../app/modules/booking/booking.component';
import { PageNotFoundComponent } from '../app/components/page-not-found/page-not-found.component'


const routes: Routes = [
    {
        path: 'book',
        component: BookingComponent,
      },
    { path: '',
    redirectTo: '/book',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
