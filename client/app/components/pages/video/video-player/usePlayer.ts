import { useCallback, useEffect, useRef, useState } from 'react'

import { IVideoElement } from './video-player.interface'

//тут будет всялогика по Видеоплееру
export const usePlayer = () => {
  const videoRef = useRef<IVideoElement>(null) //привязываем наш элемент чтобы мы могли с ним работать конкретно наш элемент нажимаь кнопки листать и так далее

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoTime, setVideoTime] = useState(0)
  const [progress, setProgress] = useState(0)

  //отслеживаем общее время нашего видео
  useEffect(() => {
    const originalDuration = videoRef.current?.duration
    if (originalDuration) setVideoTime(originalDuration)
  }, [videoRef.current?.duration])

  //эта функция позволяет нам нажимать кнопку play или pause
  const toggleVideo = useCallback(() => {
    if (!isPlaying) {
      videoRef.current?.play()
      setIsPlaying(true)
    } else {
      videoRef.current?.pause()
      setIsPlaying(false)
    }
  }, [isPlaying])

  //тут +15 секунд происходитпри клике на стрелочки стрелка вправо мотает вперед
  const forward = () => {
    if (videoRef.current) videoRef.current.currentTime += 15
  }

  //тут -15 секунд происходитпри клике на стрелочки стрелка влево мотает назад
  const revert = () => {
    if (videoRef.current) videoRef.current.currentTime -= 15
  }

  //єто для того чтобі из браузера откріть на весь єкран
  const fullScreen = () => {
    //проверяем если оно у нас есть вообще
    const video = videoRef.current
    if (!video) return

    //тут мы ищем нужжный нам метод
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    }
  }

  //тут проверяем в реальном рвмеени солкьо минут прошло из всего времени ролика
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / videoTime) * 100)
    }

    video.addEventListener('timeupdate', updateProgress)

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
    }
  }, [videoTime])

  //отслеживание горячие клавиши унапример пробел остановит видео
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        //тут кнопка вправо
        case 'ArrowRight':
          forward()
          break
        //тут кнопка влево
        case 'ArrowLeft':
          revert()
          break
        //тут кнопка пробел
        case ' ':
          e.preventDefault()
          toggleVideo()
          break
        //тут кнопка f
        case 'f':
          fullScreen()
          break

        default:
          return
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleVideo])

  return {
    videoRef,
    toggleVideo,
    fullScreen,
    status: {
      isPlaying,
      progress,
      currentTime,
      videoTime
    }
  }
}
