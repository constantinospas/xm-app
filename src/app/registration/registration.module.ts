import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RegistrationRoutingModule } from './registration-routing.module'
import { RegistrationComponent } from './registration.component'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [RegistrationComponent],
  exports: [
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationModule {}
