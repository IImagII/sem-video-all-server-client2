//выходные даннеы все что мы получаем от ервера после login и регистрации

export interface IAuthData {
  user: {
    id: number
    email: string
  } | null
  accessToken: string
}
