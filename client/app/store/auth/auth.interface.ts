import { IAuthData } from '@/app/services/auth/auth.helper'

export interface IAuthInitialState extends IAuthData {
  // то есть мы наследуемся из уже существущего IAuthData и к нему добавляем isLoading
  isLoading: boolean
}
