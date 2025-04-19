import { NextResponse } from 'next/server'
import tickets from '@/api_mock/tickets.json'
import axios from 'axios'

interface Ticket {
  id: number
  title: string
  description: string
  price: number
  img: string
}

export const GET = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}

export const getTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await axios.get<Ticket[]>(
      'http://localhost:3000/api/ticket'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return []
  }
}
