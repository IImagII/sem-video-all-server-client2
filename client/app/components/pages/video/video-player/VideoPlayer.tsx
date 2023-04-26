import cn from 'classnames'
import { FC } from 'react'
import { BsFullscreen } from 'react-icons/bs'
import { IoMdPause, IoMdPlay } from 'react-icons/io'

import styles from './ViedoPlayer.module.scss'
import { usePlayer } from './usePlayer'

const VideoPlayer: FC<{ videoPath: string }> = ({ videoPath }) => {
  const { videoRef, toggleVideo, status, fullScreen } = usePlayer() // это берем с нашего кастомного хука по плееру где собрана вся

  return (
    //формируем наш плеер
    <div className={styles.wrapper}>
      <video
        ref={videoRef}
        className={styles.player}
        src={`${videoPath}#t=8`}
        /**src={`${videoPath}#t=8`} - вот эта запись показывает что ввидео будет
         * начинаться с 8 секунды? это делается чтобы при воспроизведении не было
         * черного экрана*/
        preload="metadata"
        onClick={toggleVideo}
      />
      {/* тут скрывает кнопки когда будет нажат play */}
      <div
        className={cn(styles.controls, {
          [styles.hide]: status.isPlaying
        })}
      >
        {/* кнопка пуск пауза */}
        <button onClick={toggleVideo}>
          {status.isPlaying ? <IoMdPause /> : <IoMdPlay />}
        </button>
        {/* так выглядит прогресс бар */}
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBar}
            style={{ width: `${status.progress}%` }}
          />
        </div>
        {/* тут происходит вычисление сколько времени запущего видео */}
        <div className={styles.timeControls}>
          <p>
            {Math.floor(status.currentTime / 60) +
              ':' +
              ('0' + Math.floor(status.currentTime % 60)).slice(-2)}
          </p>
          <p> / </p>
          <p>
            {Math.floor(status.videoTime / 60) +
              ':' +
              ('0' + Math.floor(status.videoTime % 60)).slice(-2)}
          </p>
        </div>

        {/* кнопка на весь экран */}
        <button onClick={fullScreen}>
          <BsFullscreen className="text-tiny" />
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer
