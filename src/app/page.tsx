'use client';
import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Layout from './components/Layout';
import MusicCard from './components/MusicCard';
import Image from 'next/image';

// Definición de tipos para los datos de la API de iTunes para musicVideo
interface ITunesItem { // Usaremos un tipo más general para los resultados de búsqueda
  title: string; // Título de la canción o álbum
  artistName: string;
  trackName?: string; // Para canciones
  collectionName?: string; // Para álbumes
  artworkUrl100: string;
  releaseDate: string;
  externalLink?: string; // Enlace a iTunes Store
  trackId?: number; // ID para canciones
  collectionId?: number; // ID para álbumes
  previewUrl?: string; // URL de previsualización (existirá para canciones y music videos)
  trackViewUrl?: string; // Enlace a iTunes Store para canciones/videos
  collectionViewUrl?: string; // Enlace a iTunes Store para álbumes
  kind: string; // "song", "album", "music-video", etc.
}

const Home: React.FC = () => {
  const [items, setItems] = useState<ITunesItem[]>([]); // Cambiado a 'items' para ser más general
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('jack johnson'); // Estado para el término de búsqueda, con un valor inicial

  // Estado para la reproducción de audio
  const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Función para realizar la búsqueda
  const performSearch = async (term: string) => {
    try {
      setLoading(true);
      setError(null);
      // La URL incluye el término de búsqueda dinámico
      // Buscamos 'song' y 'musicVideo' para maximizar las previsualizaciones.
      const response = await fetch(
        `/api/itunes/search?term=${encodeURIComponent(term)}&entity=song,musicVideo&limit=12&attribute=artistTerm` // Ampliamos la búsqueda a canciones y videos musicales, y atributos para mejor relevancia
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const fetchedItems: ITunesItem[] = data.results
          .filter((item: any) => 
            (item.kind === 'song' || item.kind === 'music-video') && item.previewUrl
          ) // Filtrar por canciones musicales que tengan previewUrl
          .map((item: any) => ({
            artistName: item.artistName,
            // Usar trackName si es una canción/video, o collectionName para otros tipos si los incluyéramos
            title: item.trackName || item.collectionName,
            artworkUrl100: item.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg'), // Mejor resolución
            releaseDate: new Date(item.releaseDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
            id: item.trackId || item.collectionId, // Usar trackId o collectionId para el key
            previewUrl: item.previewUrl,
            externalLink: item.trackViewUrl || item.collectionViewUrl, // Enlace a iTunes Store
            kind: item.kind,
          }));
        setItems(fetchedItems);
      } else {
        setItems([]);
      }
    } catch (e: any) {
      console.error("Error fetching iTunes content:", e);
      setError(`No se pudieron cargar los resultados: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para realizar la búsqueda inicial al cargar la página
  useEffect(() => {
    performSearch(searchTerm); // Realiza la búsqueda inicial con el término por defecto
  }, []); // Se ejecuta solo una vez al montar

  // Manejador para el cambio en el input de búsqueda
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Manejador para el envío del formulario de búsqueda
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir la recarga de la página
    if (searchTerm.trim()) { // Si el término no está vacío
      performSearch(searchTerm.trim()); // Realizar la búsqueda
    }
  };

  // Lógica de reproducción de audio (sin cambios, ya que el audioRef sigue siendo para <audio>)
  useEffect(() => {
    if (audioRef.current) {
      if (currentPlayingUrl) {
        audioRef.current.src = currentPlayingUrl;
        audioRef.current.play().catch(e => console.error("Error al reproducir audio:", e));
      } else {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    }
  }, [currentPlayingUrl]);

  const handlePlayPreview = (url: string) => {
    if (currentPlayingUrl === url) {
      setCurrentPlayingUrl(null);
    } else {
      setCurrentPlayingUrl(url);
    }
  };

  const handleAudioEnded = () => {
    setCurrentPlayingUrl(null);
  };

  return (
    <Layout>
      <Head>
        <title>Inicio - Kodigo Music</title>
        <meta name="description" content="Descubre los últimos lanzamientos y artistas destacados de Kodigo Music." />
      </Head>

      {/* Elemento de audio oculto para la reproducción */}
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] lg:h-[600px] w-full flex items-center justify-center text-center mb-16 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="https://res.cloudinary.com/ddl6vwk0i/image/upload/v1752688449/hero-bg_qoibk2.jpg"
          alt="Concierto de música en vivo"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-up">
            Tu Sinfonía Comienza Aquí
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in-up delay-200">
            Explora un mundo de sonidos y descubre tu próxima obsesión musical.
          </p>
          <button className="bg-accent-purple text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-pink transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
            Descubre Más
          </button>
        </div>
      </section>

      {/* Sección de Búsqueda */}
      <section className="my-10 px-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-accent-purple mb-6">Encuentra Tu Música Favorita 🔍</h2>
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar artista, canción o género..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="flex-grow p-3 rounded-lg bg-secondary-dark placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-accent-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
          >
            Buscar
          </button>
        </form>
      </section>

      {/* Sección de Resultados */}
      <section className="my-16">
        <h2 className="text-4xl font-bold text-center text-accent-purple mb-10">Resultados de Búsqueda 🎵</h2>
        {loading && <p className="text-center text-text-gray text-lg">Cargando resultados de búsqueda...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-center text-text-gray text-lg">No se encontraron resultados con previsualización para "{searchTerm}".</p>
        )}
        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item1, index) => (
              <MusicCard
                key={index} // Usamos el índice como clave
                title={item1.title || "Título Desconocido"} // Usamos la nueva propiedad 'title'
                artist={item1.artistName}
                imageUrl={item1.artworkUrl100}
                releaseDate={item1.releaseDate}
                externalLink={item1.externalLink}
                previewUrl={item1.previewUrl}
                onPlayPreview={handlePlayPreview}
                isPlaying={currentPlayingUrl === item1 .previewUrl}
              />
            ))}
          </div>
        )}
      </section>

      <section className="my-16 bg-secondary-dark p-8 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-accent-pink mb-6">Sobre Kodigo Music</h2>
        <p className="text-lg text-text-gray text-center max-w-2xl mx-auto leading-relaxed">
          En Kodigo Music, nos dedicamos a descubrir y promover el talento musical emergente y establecido. Creemos en el poder de la música para conectar almas y transformar experiencias. Únete a nuestra comunidad y sé parte del futuro de la música.
        </p>
      </section>
    </Layout>
  );
};

export default Home;