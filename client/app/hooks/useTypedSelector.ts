import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { TypeRootState } from '../store/store'

//типизация selector
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
