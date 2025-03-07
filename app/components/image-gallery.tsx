<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {images.map((image, index) => (
    <div 
      key={index}
      className="relative aspect-[4/3] overflow-hidden rounded-lg group"
    >
      <Image
        src={image.src}
        alt={image.title}
        fill
        className="object-cover transform transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-medium text-white">{image.title}</h3>
          <p className="text-sm text-gray-200">{image.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>

{selectedImage && (
  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
    <div className="relative max-w-4xl w-full max-h-[90vh] aspect-auto">
      <Image
        src={selectedImage.src}
        alt={selectedImage.title}
        fill
        className="object-contain"
        sizes="90vw"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm">
        <h3 className="text-lg font-medium text-white">{selectedImage.title}</h3>
        <p className="text-sm text-gray-200">{selectedImage.description}</p>
      </div>
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  </div>
)} 