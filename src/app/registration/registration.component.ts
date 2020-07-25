import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { IRegistrationField } from '../interfaces/registration-field.interface'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public fields
  public formGroup: FormGroup

  constructor (private apiService: ApiService) { }

  ngOnInit (): void {
    this.apiService.getForm().
      subscribe((fields: IRegistrationField[]) => {
          this.fields = fields
          const formControls = {}
          fields.forEach(field => {
            formControls[field.name] = new FormControl(null,
              {
                validators: this._makeValidation(field.validations),
                updateOn: 'blur',
              },
            )
          })
          this.formGroup = new FormGroup(formControls)
        }
        , error => console.log(error))
  }

  public getError (field, type) {
    console.log(field, type)
    switch (type) {
      case 'regex':
        return field.validations.find(
          validation => validation.name === type).message
      case 'minlength':
        return field.validations.find(
          validation => validation.name === type).message
      case 'maxlength':
        return field.validations.find(
          validation => validation.name === type).message
    }
  }

  public signUp (form) {
    console.log(form)
    this.apiService.postSignUp(form.value).
      subscribe(res => console.log(res),
        error => {
          console.error(error)
        },
      )

  }

  private _makeValidation (rules) {
    const validation = []
    if (rules.required) {
      validation.push(Validators.required)
    }
    rules.forEach(rule => {
      // prone to error if a rule name is unknown, there is probably a better
      // way to do this
      switch (rule.name) {
        case 'regex':
          validation.push(Validators.pattern(rule.value))
          break
        case 'minlength':
          validation.push(Validators.minLength(rule.value))
          break
        case 'maxlength':
          validation.push(Validators.maxLength(rule.value))
          break
      }
    })
    return validation
  }
}
