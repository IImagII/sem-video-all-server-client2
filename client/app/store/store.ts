import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { api } from './api/api'
import { rtkQueryErrorLogger } from './middlewares/error.middleware'
import { rootReducer } from './root-reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // тут показываем то нужно записывать только авторизацию какието другие slice не будут записываться
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }) //добавляем именно наш созданный RTK Query
      .concat(rtkQueryErrorLogger)
      .concat(api.middleware)
})

export const persistor = persistStore(store)

//не забыть подключить его в next он подключается к pages/app.tsx
