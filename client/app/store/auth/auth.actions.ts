import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { IAuthData } from '../../services/auth/auth.helper'
import { toastError } from '../../utils/api.utils'

import { IAuthFields } from '@/app/components/layout/header/auth-form/auth-form.interface'
import { AuthService } from '@/app/services/auth/auth.services'

//делаем регитсрацию
export const register = createAsyncThunk<IAuthData, IAuthFields>(
  //IAuthData-то что приходит с сервера - это наш response
  //IAuthFields - ТО ЧТО ПЕРЕДАЕМ ЭТО ИХ ТИПИЗАЦИЯ

  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      //AuthService - это те функции которые мы прописали
      const response = await AuthService.register(email, password)
      //далее передаем сообщение о успешном выполнении регистрации
      toastr.success('Регистрация', 'Успешно выполнена')

      return response
    } catch (err) {
      toastError(err)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

//делаем авторизацию
export const login = createAsyncThunk<IAuthData, IAuthFields>(
  //IAuthData-то что приходит с сервера - это наш response
  //IAuthFields - ТО ЧТО ПЕРЕДАЕМ ЭТО ИХ ТИПИЗАЦИЯ

  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      //AuthService - это те функции которые мы прописали
      const response = await AuthService.login(email, password)
      //далее передаем сообщение о успешном выполнении регистрации
      toastr.success('Вход в систему', 'Успешно выполнена')

      return response
    } catch (err) {
      toastError(err)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

//соотваетственно разлогирование
export const logout = createAsyncThunk('auth/logout', async () => {
  return {}
})
