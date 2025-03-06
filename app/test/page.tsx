"use client"

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Image Test Page</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl mb-2">Profile Image</h2>
          <img 
            src="/vocal-coaching/images/about/profile.jpg" 
            alt="Profile" 
            className="w-64 h-64 object-cover"
          />
        </div>

        <div>
          <h2 className="text-xl mb-2">Gallery Image 1</h2>
          <img 
            src="/vocal-coaching/images/gallery/performance1.jpg" 
            alt="Gallery 1" 
            className="w-64 h-64 object-cover"
          />
        </div>

        <div>
          <h2 className="text-xl mb-2">Direct URL Test</h2>
          <img 
            src="https://amir3629.github.io/vocal-coaching/images/gallery/performance2.jpg" 
            alt="Gallery 2" 
            className="w-64 h-64 object-cover"
          />
        </div>
      </div>

      <div className="mt-8">
        <p>Current environment: {process.env.NODE_ENV}</p>
        <p>Base path: {process.env.NODE_ENV === 'production' ? '/vocal-coaching' : ''}</p>
      </div>
    </div>
  )
} 