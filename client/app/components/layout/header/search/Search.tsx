import { FC } from 'react'

import styles from './Search.module.scss'
import { useSearch } from './useSearch'
import VideoItem from '@/app/components/ui/video-item/VideoItem'

export interface ISearch {}

const Search: FC<ISearch> = () => {
  const { handleSearch, data, isSuccess, searchTerm } = useSearch()

  return (
    <div className={styles.search_top}>
      <label>
        <input
          type="text"
          placeholder="Поиск видео..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <img src="/img/common/search.svg" alt="" />
      </label>

      {isSuccess && (
        <div className={styles.result}>
          {data?.length ? (
            data.map((video) => (
              <VideoItem isSmall item={video} key={video.id} />
            ))
          ) : (
            <div className="text-white"> Видео не найдено</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
