import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Importa Link para asegurar que el enlace sea de Next.js

interface MusicCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  releaseDate?: string;
  slug?: string; // Usaremos un 'slug' para enlaces internos de Next.js
  externalLink?: string;
  previewUrl?: string; // Para la URL del archivo de audio
  onPlayPreview?: (url: string) => void; // Callback para reproducir la previsualización
  isPlaying?: boolean; // Indica si esta tarjeta está reproduciendo actualmente
}

const MusicCard: React.FC<MusicCardProps> = ({ 
  title, 
  artist, 
  imageUrl, 
  releaseDate, 
  slug, 
  externalLink, 
  previewUrl, 
  onPlayPreview, 
  isPlaying 
}) => {
  const cardLink = slug ? `/${slug}` : externalLink || '#';
  const Wrapper = slug ? Link : 'a';
  const wrapperProps = slug ? { href: cardLink } : { href: cardLink, target: "_blank", rel: "noopener noreferrer" };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (previewUrl && onPlayPreview) {
      onPlayPreview(previewUrl);
    }
  };

  return (
    <div className="music-card-effect bg-secondary-dark rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 relative group">
      <Wrapper {...wrapperProps}>
        <div className="relative w-full h-48 sm:h-56 lg:h-64">
          <Image
            src={imageUrl}
            alt={`Portada de ${title} por ${artist}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="music-wave-overlay"></div>

          {previewUrl && (
            <button
              onClick={handlePlayClick}
              className={`absolute bottom-3 right-3 bg-accent-pink text-white rounded-full p-2 shadow-lg hover:bg-purple-700 transition-colors duration-200 z-10
                ${isPlaying ? 'ring-2 ring-white ring-offset-2 ring-offset-accent-pink animate-pulse' : ''}
              `}
              aria-label={isPlaying ? "Detener previsualización" : "Reproducir previsualización"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-accent-purple mb-1 truncate">{title}</h3>
          <p className="text-text-gray text-sm mb-2 truncate">{artist}</p>
          {releaseDate && (
            <p className="text-gray-400 text-xs">Lanzamiento: {releaseDate}</p>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default MusicCard;