import Image from 'next/image'
import React from 'react'

const Header: React.FC = () => {
  return (
    <div className="flex bg-orange-400 text-white p-4 items-center">
      <Image
        src={`/assets/logo.webp`}
        alt="Logo"
        width={50}
        height={50}
        style={{
          width: 'auto',
          height: 'auto',
        }}
        className="mr-2"
      />
      <span className='text-2xl'>
        Ticket2Attaction
      </span>
    </div>
  )
}

export default Header
