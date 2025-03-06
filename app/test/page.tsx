"use client"

export default function TestPage() {
  return (
    <div className="p-8 bg-black text-white">
      <h1 className="text-2xl mb-8">Image Test Page</h1>
      
      <div className="space-y-12">
        {/* Homepage Background */}
        <section>
          <h2 className="text-xl mb-4">Homepage Background</h2>
          <img 
            src="/vocal-coaching/images/backgrounds/hero-bg.jpg" 
            alt="Homepage Background" 
            className="w-full h-64 object-cover"
          />
        </section>

        {/* Contact Background */}
        <section>
          <h2 className="text-xl mb-4">Contact Background</h2>
          <img 
            src="/vocal-coaching/images/contact/background.jpg" 
            alt="Contact Background" 
            className="w-full h-64 object-cover"
          />
        </section>

        {/* Service Card Images */}
        <section>
          <h2 className="text-xl mb-4">Service Card Images</h2>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="/vocal-coaching/images/services/private-lessons.jpg" 
              alt="Private Lessons" 
              className="w-full h-48 object-cover"
            />
            <img 
              src="/vocal-coaching/images/services/studio.jpg" 
              alt="Studio" 
              className="w-full h-48 object-cover"
            />
            <img 
              src="/vocal-coaching/images/services/performance.jpg" 
              alt="Performance Coaching" 
              className="w-full h-48 object-cover"
            />
            <img 
              src="/vocal-coaching/images/services/piano.jpg" 
              alt="Piano" 
              className="w-full h-48 object-cover"
            />
          </div>
        </section>

        {/* Partner Logos */}
        <section>
          <h2 className="text-xl mb-4">Partner Logos</h2>
          <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded">
            <img 
              src="/vocal-coaching/images/collaborations/bflat.svg" 
              alt="B-Flat" 
              className="h-12 object-contain"
            />
            <img 
              src="/vocal-coaching/images/collaborations/cvi.svg" 
              alt="CVI" 
              className="h-12 object-contain"
            />
            <img 
              src="/vocal-coaching/images/collaborations/jib.svg" 
              alt="Jazz Institut Berlin" 
              className="h-12 object-contain"
            />
          </div>
        </section>

        {/* Testimonial Profile Pictures */}
        <section>
          <h2 className="text-xl mb-4">Testimonial Profile Pictures</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-[#C8A97E] to-[#B69A6E] p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img 
                  src="https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=b69a6e"
                  alt="Sarah M." 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-[#C8A97E] to-[#B69A6E] p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img 
                  src="https://api.dicebear.com/7.x/personas/svg?seed=michael&backgroundColor=b69a6e"
                  alt="Michael K." 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-[#C8A97E] to-[#B69A6E] p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img 
                  src="https://api.dicebear.com/7.x/personas/svg?seed=elena&backgroundColor=b69a6e"
                  alt="Elena R." 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Note about missing images */}
        <section className="bg-yellow-800 p-4 rounded">
          <h2 className="text-xl mb-4">Missing Images</h2>
          <p>The following images need to be added to the public directory:</p>
          <ul className="list-disc list-inside">
            <li>Contact background image (background.jpg) in /public/images/contact/</li>
          </ul>
        </section>

        <div className="mt-8">
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Base path: {process.env.NODE_ENV === 'production' ? '/vocal-coaching' : ''}</p>
        </div>
      </div>
    </div>
  )
} 