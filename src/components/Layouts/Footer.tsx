import './Layouts.scss'
import React from './social_media/react.png'
import Docker from './social_media/docker.png'
import GitHub from './social_media/github.png'
import Instagram from './social_media/instagram.png'
import Twitter from './social_media/twitter.png'
import YouTube from './social_media/youtube.png'
import Facebook from './social_media/facebook.png'
const Footer: React.FC = () => {
  return (
    <footer>
      <a href='#' target='_blank'>
        <img className='social-media-img' src={Facebook} alt='Facebook' />
      </a>
      <a href='https://github.com/group-7-react-mock/mock-project-react.git' target='_blank'>
        <img className='social-media-img' src={GitHub} alt='GitHub' />
      </a>
      <a href='#' target='_blank'>
        <img className='social-media-img' src={Instagram} alt='Instagram' />
      </a>
      <a href='#'>
        <img className='react' src={React} alt='React' />
      </a>
      <a href='#' target='_blank'>
        <img className='social-media-img' src={Docker} alt='Docker' />
      </a>
      <a href='#' target='_blank'>
        <img className='social-media-img' src={Twitter} alt='Twitter' />
      </a>
      <a href='#' target='_blank'>
        <img className='social-media-img' src={YouTube} alt='YouTube' />
      </a>
    </footer>
  )
}
export default Footer
