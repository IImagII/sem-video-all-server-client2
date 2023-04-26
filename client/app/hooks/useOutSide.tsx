//хук для того чтобы закрывать если кликнуть вне поляэ
//хук пкоторый позволяет закрывать окно при клике вне окна
//ref- при клике на который нисего происходить не будет
//setIsShow- напрмер на кнопку закрыть тчобы она закрывалась
//isShow - текущее состояние
//применятся как пример так: const { ref, setIsShow, isShow } = useOutside(false)
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TypeOut = {
  ref: any
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean): TypeOut => {
  const [isShow, setIsShow] = useState(initialIsVisible)
  const ref = useRef<HTMLElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
  return { ref, isShow, setIsShow }
}
