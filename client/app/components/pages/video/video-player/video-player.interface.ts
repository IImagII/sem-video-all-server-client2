export interface IVideoElement extends HTMLVideoElement {
  /**  у нас есть стандартный тип HTMLVideoElement
   * но мы его расширили
   */
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  webkitRequestFullscreen?: () => void
}
