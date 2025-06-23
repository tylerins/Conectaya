// 1) Importa createClient desde CDN (ESM)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2) Configuración de Supabase (reemplaza con tu llave real)
const supabaseUrl = 'https://xjpynyilaqajdvhxuyup.supabase.co';
const supabaseKey = '<TU_ANON_KEY>';
const supabase = createClient(supabaseUrl, supabaseKey);

// 3) Helper para renderizar contenido en el DOM
function render(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// 4) Funciones para cargar datos desde Supabase
async function cargarCitas() {
  try {
    const { data, error } = await supabase.from('citas').select('*');
    render('quotes', error ? 'Error cargando citas.' : data.map(i => `<p>"${i.texto}" — <em>${i.autor}</em></p>`).join(''));
  } catch {
    render('quotes', 'Error cargando citas.');
  }
}

async function cargarOfertas() {
  try {
    const { data, error } = await supabase.from('ofertas').select('*');
    render('offers', error ? 'Error cargando ofertas.' : data.map(i => `<p>"${i.titulo}" — ${i.descripcion}</p>`).join(''));
  } catch {
    render('offers', 'Error cargando ofertas.');
  }
}

async function cargarFrase() {
  try {
    const { data, error } = await supabase.from('citas').select('*').limit(1);
    render('phrase', error || !data.length ? 'Error cargando frase.' : `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`);
  } catch {
    render('phrase', 'Error cargando frase.');
  }
}

async function cargarOfertaEspecial() {
  try {
    const { data, error } = await supabase.from('ofertas').select('*').limit(1);
    render('special', error || !data.length ? 'Error cargando oferta especial.' : `<p>"${data[0].titulo}" — ${data[0].descripcion}</p>`);
  } catch {
    render('special', 'Error cargando oferta especial.');
  }
}

async function cargarReceta() {
  try {
    const { data, error } = await supabase.from('recetas').select('*').limit(1);
    render('recipe', error || !data.length ? 'Error cargando receta.' : `<p>"${data[0].nombre}" — ${data[0].ingredientes} (${data[0].tiempo} min)</p>`);
  } catch {
    render('recipe', 'Error cargando receta.');
  }
}

async function cargarNoticias() {
  try {
    const { data, error } = await supabase.from('noticias').select('*').limit(1);
    render('news', error || !data.length ? 'Error cargando noticias.' : `<ul><li>${data[0].viñeta1}</li><li>${data[0].viñeta2}</li><li>${data[0].viñeta3}</li></ul>`);
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
