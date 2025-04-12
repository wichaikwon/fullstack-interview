'use client'
import { useCart } from '@/contexts/useCart'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import discount from '@/api_mock/discounts.json'

const Cart: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, totalPrice } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="flex flex-col h-full border gap-2 bg-white">Loading...</div>
  }
  const appliedDiscount = discount.find(
    (d) => d.code === discountCode && d.discount > 0
  )

  const discountAmount = appliedDiscount
    ? appliedDiscount.type === 'percentage'
      ? (appliedDiscount.discount / 100) * totalPrice
      : appliedDiscount.discount
    : 0

  return (
    <div className="flex flex-col h-full border gap-2 bg-white">
      <p className="flex justify-center p-4 text-xl font-bold border-b">Cart</p>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between gap-4 p-4 items-center border-b"
        >
          <Image
            src="/assets/tickets/siam.jpeg"
            alt={item.title}
            width={48}
            height={48}
            className="w-[48px] h-[48px] object-contain"
            priority={true} 
            sizes="100vw"
          />
          <div className="flex-1">
            <p className="text-sm">{`Item ${item.title}`}</p>
            <p className="text-xs text-gray-500">{` ${item.price.toLocaleString(
              'en-US'
            )} THB`}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="bg-gray-200 px-2"
            >
              -
            </button>
            <p>{item.quantity}</p>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="bg-gray-200 px-2"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="flex-1 h-full flex-col flex justify-end">
        {totalPrice > 0 && (
          <>
            <div className="flex justify-between p-2 w-full border-t">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">{`${totalPrice.toLocaleString(
                'en-US'
              )} THB`}</p>
            </div>
            <div className="flex w-full border-t p-2 justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">discount</p>
                <input
                  type="text"
                  placeholder="input coupon"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="p-2 border rounded-md w-fit"
                />
              </div>
              <p className="text-lg font-bold text-red-500">
                {discountAmount} THB
              </p>
            </div>
            <div className="flex justify-between border-t p-2 w-full">
              <p className="text-lg font-bold">Grand Total</p>
              <p className="text-lg font-bold">{`${(
                totalPrice - discountAmount
              ).toLocaleString('en-US')} THB`}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
