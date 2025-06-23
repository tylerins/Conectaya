// 1) Importa createClient desde CDN (ESM)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2) Configuración de Supabase (reemplaza con tu llave real)
const supabaseUrl = 'https://xjpynyilaqajdvhxuyup.supabase.co';
const supabaseKey = '$1';
const supabase = createClient(supabaseUrl, supabaseKey);

// 3) Helper para renderizar contenido
function render(id, html) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = html;
  }
}

// 4) Funciones para cargar datos desde Supabase
async function cargarCitas() {
  try {
    const { data, error } = await supabase.from('citas').select('*');
    const html = data && !error
      ? data.map(i => `<p>"${i.texto}" — <em>${i.autor}</em></p>`).join('')
      : 'Error cargando citas.';
    render('quotes', html);
  } catch {
    render('quotes', 'Error cargando citas.');
  }
}

async function cargarOfertas() {
  try {
    const { data, error } = await supabase.from('ofertas').select('*');
    const html = data && !error
      ? data.map(i => `<p>"${i.titulo}" — ${i.descripcion}</p>`).join('')
      : 'Error cargando ofertas.';
    render('offers', html);
  } catch {
    render('offers', 'Error cargando ofertas.');
  }
}

async function cargarFrase() {
  try {
    const { data, error } = await supabase.from('citas').select('*').limit(1);
    const html = data && data.length && !error
      ? `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`
      : 'Error cargando frase.';
    render('phrase', html);
  } catch {
    render('phrase', 'Error cargando frase.');
  }
}

async function cargarOfertaEspecial() {
  try {
    const { data, error } = await supabase.from('ofertas').select('*').limit(1);
    const html = data && data.length && !error
      ? `<p>"${data[0].titulo}" — ${data[0].descripcion}</p>`
      : 'Error cargando oferta especial.';
    render('special', html);
  } catch {
    render('special', 'Error cargando oferta especial.');
  }
}

async function cargarReceta() {
  try {
    const { data, error } = await supabase.from('recetas').select('*').limit(1);
    const html = data && data.length && !error
      ? `<p>"${data[0].nombre}" — ${data[0].ingredientes} (${data[0].tiempo} min)</p>`
      : 'Error cargando receta.';
    render('recipe', html);
  } catch {
    render('recipe', 'Error cargando receta.');
  }
}

async function cargarNoticias() {
  try {
    const { data, error } = await supabase.from('noticias').select('*').limit(1);
    const html = data && data.length && !error
      ? `<ul><li>${data[0].viñeta1}</li><li>${data[0].viñeta2}</li><li>${data[0].viñeta3}</li></ul>`
      : 'Error cargando noticias.';
    render('news', html);
  } catch {
    render('news', 'Error cargando noticias.');
  }
}

// 5) Ejecuta todas las funciones al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  cargarCitas();
  cargarOfertas();
  cargarFrase();
  cargarOfertaEspecial();
  cargarReceta();
  cargarNoticias();
});
