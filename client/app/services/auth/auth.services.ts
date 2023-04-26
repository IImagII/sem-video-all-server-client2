import { axiosClassic } from '../../api/axios'

import { IAuthData } from './auth.helper'

const AUTH = 'auth'

export const AuthService = {
  //пишем функцию авторизации
  async login(email: string, password: string) {
    const response = await axiosClassic.post<IAuthData>(`/${AUTH}/login`, {
      //тут указываем даннеы которые будем одавать
      email,
      password
    })
    return response.data
  },

  //пишем функцию регистрации
  async register(email: string, password: string) {
    const response = await axiosClassic.post<IAuthData>(`/${AUTH}/register`, {
      //тут указываем даннеы которые будем одавать
      email,
      password
    })
    return response.data
  }
}
