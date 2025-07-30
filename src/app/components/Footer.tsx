import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark py-8 text-text-gray text-center mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
          <Link href="#" className="hover:text-accent-purple transition-colors duration-300">
            Política de Privacidad
          </Link>
          <Link href="#" className="hover:text-accent-purple transition-colors duration-300">
            Términos y Condiciones
          </Link>
          <Link href="#" className="hover:text-accent-purple transition-colors duration-300">
            Preguntas Frecuentes
          </Link>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          {/* Iconos de Redes Sociales (ejemplo con Font Awesome o SVG) */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-pink transition-colors duration-300">
            <i className="fab fa-facebook-f text-xl"></i> {/* Asegúrate de incluir Font Awesome si usas esto */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.655 9.183 8.441 9.873V14.82h-2.54v-2.817h2.54v-2.04c0-2.527 1.542-3.918 3.79-3.918 1.096 0 2.047.082 2.32.119v2.664h-1.576c-1.244 0-1.488.592-1.488 1.46v1.925h2.956l-.48 2.817h-2.476v6.103C18.345 21.183 22 17.016 22 12c0-5.523-4.477-10-10-10z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-pink transition-colors duration-300">
            <i className="fab fa-twitter text-xl"></i>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M22.46 6c-.77.34-1.6.57-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.04C18.17 3.54 16.9 3 15.54 3c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.99C7.71 8.55 4.09 6.53 1.6 3.23c-.37.63-.59 1.35-.59 2.12 0 1.48.75 2.79 1.89 3.56-.7-.02-1.36-.21-1.93-.53v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.54 1.7 2.11 2.94 3.97 2.97-1.45 1.14-3.28 1.82-5.28 1.82-.34 0-.68-.02-1.02-.06C2.34 20.37 4.54 21 6.84 21c8.2 0 12.67-6.79 12.67-12.68 0-.19-.01-.37-.01-.56.87-.63 1.62-1.42 2.22-2.32z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-pink transition-colors duration-300">
            <i className="fab fa-instagram text-xl"></i>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M12 2c3.218 0 3.633.012 4.908.07c1.171.053 1.745.249 2.13.407.41.168.747.375 1.087.715.34.34.547.677.715 1.087.158.385.354.959.407 2.13.058 1.275.07 1.689.07 4.908s-.012 3.633-.07 4.908c-.053 1.171-.249 1.745-.407 2.13-.168.41-.375.747-.715 1.087-.34.34-.677.547-1.087.715-.385.158-.959.354-2.13.407-1.275.058-1.689.07-4.908.07s-3.633-.012-4.908-.07c-1.171-.053-1.745-.249-2.13-.407-.41-.168-.747-.375-1.087-.715-.34-.34-.547-.677-.715-1.087-.158-.385-.354-.959-.407-2.13-.058-1.275-.07-1.689-.07-4.908s.012-3.633.07-4.908c.053-1.171.249-1.745.407-2.13.168-.41.375-.747.715-1.087.34-.34.677-.547 1.087-.715.385-.158.959-.354 2.13-.407C8.367 2.012 8.782 2 12 2zm0 2c-3.18 0-3.585.012-4.85.068-1.07.048-1.57.22-1.85.337-.36.148-.61.306-.85.545-.24.24-.397.49-.545.85-.117.28-.289.78-.337 1.85C4.012 8.415 4 8.82 4 12s.012 3.585.068 4.85c.048 1.07.22 1.57.337 1.85.148.36.306.61.545.85.24.24.49.397.85.545.28.117.78.289 1.85.337C8.415 19.988 8.82 20 12 20s3.585-.012 4.85-.068c1.07-.048 1.57-.22 1.85-.337.36-.148.61-.306.85-.545.24-.24.397-.49.545-.85.117-.28.289-.78.337-1.85.056-1.265.068-1.679.068-4.85s-.012-3.585-.068-4.85c-.048-1.07-.22-1.57-.337-1.85-.148-.36-.306-.61-.545-.85-.24-.24-.49-.397-.85-.545-.117-.28-.289-.78-.337-1.85C15.585 4.012 15.18 4 12 4zm0 3.65c2.4 0 4.35 1.95 4.35 4.35s-1.95 4.35-4.35 4.35-4.35-1.95-4.35-4.35 1.95-4.35 4.35-4.35zm0 2c-1.29 0-2.35 1.06-2.35 2.35s1.06 2.35 2.35 2.35 2.35-1.06 2.35-2.35-1.06-2.35-2.35-2.35zm6.4-.65c0 .76-.64 1.39-1.39 1.39s-1.39-.64-1.39-1.39.64-1.39 1.39-1.39 1.39.64 1.39 1.39z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-pink transition-colors duration-300">
            <i className="fab fa-youtube text-xl"></i>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M21.5 7.18c-.2-.73-.55-1.32-.97-1.74-.42-.42-1.01-.77-1.74-.97C17.65 4 12 4 12 4s-5.65 0-6.79.47c-.73.2-1.32.55-1.74.97-.42.42-.77 1.01-.97 1.74C2 8.35 2 12 2 12s0 3.65.47 4.79c.2.73.55 1.32.97 1.74.42.42 1.01.77 1.74.97C6.35 20 12 20 12 20s5.65 0 6.79-.47c.73-.2 1.32-.55 1.74-.97.42-.42.77-1.01.97-1.74C22 15.65 22 12 22 12s0-3.65-.47-4.79zM10 15.5V8.5L16 12l-6 3.5z"/></svg>
          </a>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Kódigo Music. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;