import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration/registration.module').then(
      m => m.RegistrationModule),
  },
  { path: 'welcome',
    loadChildren: () => import('./modules/welcome/welcome.module').then(
      m => m.WelcomeModule),
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
