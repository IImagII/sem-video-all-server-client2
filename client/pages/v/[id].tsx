//это динамическая страница для страницы с однимвидео и видеоплеером
//которая находиться в page/video/video.tsx
import { NextPage } from 'next'

import Video from '@/app/components/pages/video/Video'

const VideoPage: NextPage = (props) => {
  return <Video {...props} />
}

export default VideoPage
