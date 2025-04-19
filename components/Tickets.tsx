'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/useCart'
import { getTickets } from '@/app/api/ticket/route'

interface Ticket {
  id: number
  title: string
  description: string
  price: number
  img: string
}

const Tickets: React.FC = () => {
  const { addToCart } = useCart()
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    getTickets().then(setTickets)
  }, [])

  return (
    <div className="border flex flex-col h-full bg-white">
      <p className="flex justify-center p-4 text-xl font-bold border-b">
        Tickets
      </p>
      {tickets.map((ticket, idx) => (
        <div
          key={idx}
          className={`flex justify-between p-4 ${
            idx === tickets.length - 1 ? '' : 'border-b'
          }`}
        >
          <div className="flex gap-4 flex-1">
            <Image
              src={ticket.img}
              alt={ticket.title}
              width={48}
              height={48}
              style={{
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <p className="font-bold text-nowrap">
                {ticket.title.length > 20
                  ? `${ticket.title.slice(0, 20)}...`
                  : ticket.title}
              </p>
              <p className="text-xs line-clamp-2 text-gray-500">
                {ticket.description.length > 50
                  ? `${ticket.description.slice(0, 50)}...`
                  : ticket.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <p className="text-lg flex-1 text-right">{`${ticket.price.toLocaleString(
              'en-US'
            )} THB`}</p>
            <button
              onClick={() =>
                addToCart({
                  ...ticket,
                  quantity: 1,
                })
              }
              className="transition-colors duration-300 border-2 border-orange-400 px-4 py-2 hover:bg-orange-400 hover:text-white text-orange-400 font-bold"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tickets
