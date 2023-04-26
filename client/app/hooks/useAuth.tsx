import { IAuthData } from '../services/auth/auth.helper'

import { useTypedSelector } from './useTypedSelector'

export const useAuth = () => useTypedSelector((state) => state.auth)
//тут : IAuthData это мы указали что мы должны возвращать
//   ({-такой записью мы показываем что мы хотимвозвращать
//в нашем случае это email password
