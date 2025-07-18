import React from 'react';
import Head from 'next/head';
import Layout from './components/Layout';
import MusicCard from './components/MusicCard';
import Image from 'next/image';

export default function Home() {
  // Datos de ejemplo para las tarjetas de música
  const featuredReleases = [
    {
      title: 'Melodías del Amanecer',
      artist: 'Aura Sonora',
      imageUrl: 'https://res.cloudinary.com/ddl6vwk0i/image/upload/v1752686948/album1_m1yxii.jpg', // Asegúrate de tener estas imágenes en tu carpeta public/images
      releaseDate: '2025-06-15',
      link: '#',
    },
    {
      title: 'Ritmos Nocturnos',
      artist: 'DJ Beatmaster',
      imageUrl: 'https://res.cloudinary.com/ddl6vwk0i/image/upload/v1752686955/album2_snia3m.png',
      releaseDate: '2025-07-01',
      link: '#',
    },
    {
      title: 'Armonía Eterna',
      artist: 'Luna Creciente',
      imageUrl: 'https://res.cloudinary.com/ddl6vwk0i/image/upload/v1752686954/album3_hjdvhr.png',
      releaseDate: '2025-07-10',
      link: '#',
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Inicio - Melodía Records</title>
        <meta name="description" content="Descubre los últimos lanzamientos y artistas destacados de Melodía Records." />
      </Head>

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

      {/* Latest Releases Section */}
      <section className="my-16">
        <h2 className="text-4xl font-bold text-center text-accent-purple mb-10">Últimos Lanzamientos 🚀</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredReleases.map((release, index) => (
            <MusicCard
              key={index}
              title={release.title}
              artist={release.artist}
              imageUrl={release.imageUrl}
              releaseDate={release.releaseDate}
              slug={release.link}
            />
          ))}
        </div>
      </section>

      {/* About Section (Opcional, para dar más contenido a la home) */}
      <section className="my-16 bg-secondary-dark p-8 rounded-lg shadow-xl border border-gray-700 ">
        <h2 className="text-3xl font-bold text-center text-accent-pink mb-6">Sobre Kódigo Music</h2>
        <p className="text-lg text-text-gray text-center max-w-2xl mx-auto leading-relaxed">
          En Kódigo Music, nos dedicamos a descubrir y promover el talento musical emergente y establecido. Creemos en el poder de la música para conectar almas y transformar experiencias. Únete a nuestra comunidad y sé parte del futuro de la música.
        </p>
      </section>
    </Layout>
  );
}
