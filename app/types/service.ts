import { ReactNode } from 'react'

export interface Service {
  id: string | number
  title: string
  description: string
  icon: ReactNode
  price?: string
  features: string[]
  details: {
    includes: string[]
    suitable: string[]
    duration: string
    location: string
    price?: string
    link?: string
  }
  image: string
  delay?: number
} 