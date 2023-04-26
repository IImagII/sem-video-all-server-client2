import { Dispatch, SetStateAction } from 'react'

export interface IUploadModal {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>> //описывает наш usestate в react саму функцию
  videoId: number
}
