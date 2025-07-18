"use client";
import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // Importar useRouter

// Define el tipo de datos del formulario
interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormInputs>();
  const router = useRouter(); // Inicializar el router

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    // Codificar los datos para la URL
    const query = new URLSearchParams({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    }).toString();

    // Redirigir a la página de confirmación con los datos como parámetros de consulta
    if (router) {
      router.push(`/contact-success?${query}`);
    }

    reset(); // Limpiar el formulario después del envío
  };

  return (
    <Layout>
      <Head>
        <title>Contacto - Melodía Records</title>
        <meta name="description" content="Ponte en contacto con Melodía Records para consultas, colaboraciones o soporte." />
      </Head>

      <div className="min-h-screen bg-primary-dark text-text-light flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-secondary-dark p-8 rounded-lg shadow-xl border border-gray-700">
          <h2 className="text-4xl font-extrabold text-center text-accent-purple mb-6">
            Contáctanos 📩
          </h2>
          <p className="text-center mb-8 text-lg text-accent-purple">
            Envíanos un mensaje y te responderemos lo antes posible.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-gray">
                Nombre Completo:
              </label>
              <input
                type="text"
                style={{color:'white'}}
                id="name"
                {...register('name', { required: 'El nombre es obligatorio' })}
                className={`text-white mt-1 block w-full px-4 py-2 bg-gray-800 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-purple focus:border-accent-purple sm:text-sm ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Tu nombre"
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-gray">
                Correo Electrónico:
              </label>
              <input
                type="email"
                style={{color:'white'}}
                id="email"
                {...register('email', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido',
                  },
                })}
                className={`text-white mt-1 block w-full px-4 py-2 bg-gray-800 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-purple focus:border-accent-purple sm:text-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="tu@ejemplo.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-text-gray">
                Asunto:
              </label>
              <input
                type="text"
                id="subject"
                {...register('subject', { required: 'El asunto es obligatorio' })}
                className={`text-white mt-1 block w-full px-4 py-2 bg-gray-800 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-purple focus:border-accent-purple sm:text-sm ${
                  errors.subject ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Sobre qué quieres hablar"
              />
              {errors.subject && <p className="mt-2 text-sm text-red-500">{errors.subject.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-gray">
                Mensaje:
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', {
                  required: 'El mensaje es obligatorio',
                  minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
                })}
                className={`text-white mt-1 block w-full px-4 py-2 bg-gray-800 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-purple focus:border-accent-purple sm:text-sm ${
                  errors.message ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
              {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent-purple hover:bg-accent-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-colors duration-300"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;