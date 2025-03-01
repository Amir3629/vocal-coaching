import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=1000&width=800" alt="Melanie Wainwright" fill className="object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">About Melanie</h2>
          <p className="text-gray-300">
            With over 15 years of experience as both a professional jazz vocalist and dedicated vocal coach, I bring a
            unique perspective to my teaching. My approach combines technical expertise with artistic expression,
            helping each student discover their authentic voice.
          </p>
          <p className="text-gray-300">
            After studying at prestigious music institutions in New York and Berlin, I've performed at jazz venues
            across Europe and collaborated with renowned musicians in the industry. This real-world experience informs
            my coaching, allowing me to prepare students not just for singing, but for the realities of performance and
            artistic career development.
          </p>
          <p className="text-gray-300">
            My teaching philosophy centers on personalization. I believe that each voice is unique, and my role is to
            help you discover your distinctive sound while providing the technical foundation to express yourself
            confidently and authentically.
          </p>
          <Button className="bg-purple-700 hover:bg-purple-800 mt-4">Read Full Bio</Button>
        </div>
      </div>
    </section>
  )
}

