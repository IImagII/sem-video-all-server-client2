import { ChangeEvent, useState } from 'react'

import { useDebounce } from '@/app/hooks/useDebounce'
import { videoApi } from '@/app/store/api/video.api'

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const debounceSearch = useDebounce(searchTerm, 500)

  //тут типизация input
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  //тет делаем наш GET запрос автоамтически генерируется useGetVideosBySearchTermQuery
  const { data, isSuccess } = videoApi.useGetVideosBySearchTermQuery(
    debounceSearch,
    {
      skip: !debounceSearch, //тут указыаем что если строка пуста то ничего делать не надо
      selectFromResult: ({ data, ...rest }) => ({
        //selectFromResult -сюда попадает сразу все и data и isLoading
        data: data?.slice(0, 4),
        ...rest
      })
    }
  )

  return {
    handleSearch, // для того чтобы прописать к input
    data,
    isSuccess, //чтобы показать какие у нас результаты
    searchTerm // для вывода
  }
}
