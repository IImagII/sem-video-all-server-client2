import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { rootAction } from '../store/root-actions'

//просто типизация нашего action
export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(rootAction, dispatch)
}
