import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue
} from '@reduxjs/toolkit'

import { toastError } from '@/app/utils/api.utils'

// для обработки ошибок для того чтобы передавать их в toastr
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      toastError(action.error, 'RTK error')
    }

    return next(action)
  }

//не забывать прописываеть ео в store
