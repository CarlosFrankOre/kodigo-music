import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Importa Link para asegurar que el enlace sea de Next.js

interface MusicCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  releaseDate?: string;
  slug?: string; // Usaremos un 'slug' para enlaces internos de Next.js
}

const MusicCard: React.FC<MusicCardProps> = ({ title, artist, imageUrl, releaseDate, slug }) => {
  const cardLink = slug ? `/${slug}` : '#'; // Define el enlace si hay slug

  return (
    // Añadimos las clases para la animación de onda y el hover de escala
    <div className="music-card-effect bg-secondary-dark rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 relative group">
      <Link href={cardLink}> {/* Envuelve toda la tarjeta en un Link */}
        <div className="relative w-full h-48 sm:h-56 lg:h-64">
          <Image
            src={imageUrl}
            alt={`Portada de ${title} por ${artist}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          {/* Pseudo-elemento para el efecto de onda */}
          <div className="music-wave-overlay"></div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-accent-purple mb-1 truncate">{title}</h3>
          <p className="text-text-gray text-sm mb-2 truncate">{artist}</p>
          {releaseDate && (
            <p className="text-gray-400 text-xs">Lanzamiento: {releaseDate}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MusicCard;