import ServiceCard from './service-card'
import { Service } from '../types/service'

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {services.map((service, index) => (
        <div key={service.id} className="relative">
          <ServiceCard {...service} delay={index * 0.1} />
        </div>
      ))}
    </div>
  )
} 