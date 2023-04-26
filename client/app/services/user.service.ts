import { axiosClassic } from '../api/axios'
import { IUser } from '../types/user.interface'

export const USER = 'user'

export const UserService = {
  //функцияя получения всех пользователей
  async getAll() {
    return axiosClassic.get<IUser[]>(`/${USER}`)
  },

  //функция получения конкретного user
  async getUser(id: number) {
    return axiosClassic.get<IUser>(`/${USER}/by-id/${id}`)
  }
}
