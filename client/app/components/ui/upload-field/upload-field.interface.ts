import { Dispatch, SetStateAction } from 'react'

export interface IUploadField {
  title?: string
  onChange: (...event: any) => void // для изменения поля формы
  folder?: string
  setValue?: (val: number) => void
  setIsChosen?: Dispatch<SetStateAction<boolean>>
}
