import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  constructor (private apiService: ApiService) { }

  ngOnInit (): void {
    this.apiService.getUsers().subscribe(console.log)
  }

}
