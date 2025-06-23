// =================================================================
//           CÓDIGO COMPLETO Y CORREGIDO PARA MAIN.JS
// =================================================================

// 1) Importa createClient desde CDN (ESM)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2) Configuración de Supabase (Tus datos son correctos)
const supabaseUrl = 'https://xjpynyilaqajdvhxuyup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHlueWlsYXFhamR2aHh1eXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDMzNjksImV4cCI6MjA2NjExOTM2OX0.sMcXn-w_zvGCOoXfRCVzkWR2v3hnJ0VCwklZs1lKwyM';
const supabase = createClient(supabaseUrl, supabaseKey);

// 3) Helper para renderizar contenido en el DOM
function render(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// 4) Funciones para cargar datos desde Supabase
async function cargarCitas() {
  try {
    // CORREGIDO: Se cambió 'citas' por 'quotes'
    const { data, error } = await supabase.from('quotes').select('*');
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
    // CORREGIDO: Se cambió 'ofertas' por 'deals'
    const { data, error } = await supabase.from('deals').select('*');
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
    // CORREGIDO: Se cambió 'citas' por 'quotes'
    const { data, error } = await supabase.from('quotes').select('*').limit(1);
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
    // CORREGIDO: Se cambió 'ofertas' por 'deals'
    const { data, error } = await supabase.from('deals').select('*').limit(1);
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
    // CORREGIDO: Se cambió 'recetas' por 'recipes'
    const { data, error } = await supabase.from('recipes').select('*').limit(1);
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
    // CORREGIDO: Se cambió 'noticias' por 'news'
    const { data, error } = await supabase.from('news').select('*').limit(1);
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
  cargarNoticias(); // CORREGIDO: Se añadió la llamada a esta función
});
