import React from 'react'
import { BsGithub } from 'react-icons/bs';
import { AiFillCode, AiFillLinkedin } from 'react-icons/ai';


function Footer() {
  return (
    <div
      className='bg-rose-400 rounded-lg flex justify-evenly p-4 gap-3'   >
      <a href="https://github.com/HuseyinSARI">
        <BsGithub size={50} />
      </a>
      <a href="https://github.com/HuseyinSARI/redux-course/tree/main/memory-game">
        <AiFillCode size={50} />
      </a>
      <a href="https://www.linkedin.com/in/sarihuseyin/">
        <AiFillLinkedin size={50} />
      </a>
    </div>
  )
}

export default Footer