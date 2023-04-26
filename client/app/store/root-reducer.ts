import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from 'redux'

import { api } from './api/api'
import { authSlice } from './auth/auth.slice'

export const rootReducer = combineReducers({
  //подключаем то что мы написали RTK Query
  [api.reducerPath]: api.reducer,

  //подключили наши slice
  auth: authSlice.reducer,
  //  toastr: toastrReducer обязательно в конце иначе работать не будет
  toastr: toastrReducer
})

export type RootState = ReturnType<typeof rootReducer>
