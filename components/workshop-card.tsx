import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface WorkshopCardProps {
  title: string
  date: string
  time: string
  location: string
  price: string
  spotsLeft: number
}

export default function WorkshopCard({ title, date, time, location, price, spotsLeft }: WorkshopCardProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300">
      <CardHeader>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-purple-400" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-purple-400" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-purple-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-purple-400" />
          <span>{spotsLeft} spots left</span>
        </div>
        <div className="text-xl font-bold mt-4">{price}</div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-700 hover:bg-purple-800">Book Workshop</Button>
      </CardFooter>
    </Card>
  )
}

