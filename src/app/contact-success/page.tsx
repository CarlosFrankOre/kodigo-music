'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

interface FormData {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSuccessPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    // Extraer los parámetros de consulta de la URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setFormData({
        name: params.get('name') || undefined,
        email: params.get('email') || undefined,
        subject: params.get('subject') || undefined,
        message: params.get('message') || undefined,
      });
    }
  }, []); // Solo ejecutar una vez al montar el componente

  return (
    <Layout>
      <Head>
        <title>Mensaje Enviado - Melodía Records</title>
        <meta name="description" content="Confirmación del envío de tu mensaje a Melodía Records." />
      </Head>

      <div className="min-h-screen bg-primary-dark text-text-light flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-secondary-dark p-8 rounded-lg shadow-xl border border-gray-700 text-center">
          <h2 className="text-4xl font-extrabold text-center text-accent-purple mb-6">
            ¡Mensaje Enviado con Éxito! 🎉
          </h2>
          <p className="text-lg text-accent-purple mb-8">
            Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos a la brevedad posible.
          </p>

          {/* Mostrar los datos del formulario */}
          <div className="text-left bg-gray-800 p-6 rounded-md shadow-inner mb-8">
            <h3 className="text-xl font-semibold text-accent-pink mb-4">Detalles de tu mensaje:</h3>
            {formData.name && <p className="mb-2 text-white"><strong className="text-gray-400">Nombre:</strong> {formData.name}</p>}
            {formData.email && <p className="mb-2 text-white"><strong className="text-gray-400">Email:</strong> {formData.email}</p>}
            {formData.subject && <p className="mb-2 text-white"><strong className="text-gray-400">Asunto:</strong> {formData.subject}</p>}
            {formData.message && <p className="mb-2 text-white"><strong className="text-gray-400">Mensaje:</strong> {formData.message}</p>}
          </div>

          <Link href="/" className="inline-block bg-accent-purple text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent-pink transition-colors duration-300">
            Volver a Inicio
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ContactSuccessPage;