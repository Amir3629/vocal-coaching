<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
  {partners.map((partner, index) => (
    <div
      key={index}
      className="relative aspect-[3/2] bg-black/20 rounded-lg p-4 flex items-center justify-center group hover:bg-black/30 transition-colors"
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        className="w-full h-auto max-h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
        width={160}
        height={80}
      />
      {partner.url && (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={`Visit ${partner.name}`}
        />
      )}
    </div>
  ))}
</div> 