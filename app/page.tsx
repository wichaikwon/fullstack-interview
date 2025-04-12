import Cart from '@/components/Cart'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Tickets from '@/components/Tickets'
import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 p-8 gap-10 flex-col md:flex-row bg-slate-200">
        <div className="flex-7">
          <Tickets />
        </div>
        <div className="flex-3">
          <Cart />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
