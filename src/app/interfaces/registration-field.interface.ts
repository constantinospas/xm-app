import { IFieldValidation } from './field-validation.interface'

export interface IRegistrationField {
  type: 'text' | 'email' | 'phone' | 'password'
  name: string
  label: string
  required: boolean
  validations?: IFieldValidation[]
}
