// =================================================================
//     CÓDIGO MAIN.JS ACTUALIZADO CON ESTILOS DE CONTENIDO
// =================================================================

// 1) Importa createClient desde CDN (ESM)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2) Configuración de Supabase
const supabaseUrl = 'https://xjpynyilaqajdvhxuyup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHlueWlsYXFhamR2aHh1eXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDMzNjksImV4cCI6MjA2NjExOTM2OX0.sMcXn-w_zvGCOoXfRCVzkWR2v3hnJ0VCwklZs1lKwyM';
const supabase = createClient(supabaseUrl, supabaseKey);

// 3) Helper para renderizar contenido en el DOM
function render(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// 4) Funciones para cargar datos desde Supabase

// --- Citas con nuevo estilo de bloque ---
async function cargarCitas() {
  try {
    const { data, error } = await supabase.from('quotes').select('*');
    const html = data && !error
      ? data.map(i => `
          <blockquote class="quote-text">"${i.texto}"</blockquote>
          <cite class="quote-author">— ${i.autor}</cite>
        `).join('')
      : 'Error cargando citas.';
    render('quotes', html);
  } catch {
    render('quotes', 'Error cargando citas.');
  }
}

// --- Ofertas con nuevo estilo de botón ---
async function cargarOfertas() {
  try {
    const { data, error } = await supabase.from('deals').select('*');
    const html = data && !error
      ? data.map(i => `
          <div class="offer-item">
            <p>${i.titulo} - <em>${i.descripcion || ''}</em></p>
            <a href="${i.url}" target="_blank" rel="noopener noreferrer" class="offer-button">Ver Oferta</a>
          </div>
        `).join('')
      : 'Error cargando ofertas.';
    render('offers', html);
  } catch {
    render('offers', 'Error cargando ofertas.');
  }
}

// --- Frase del día con estilo de bloque ---
async function cargarFrase() {
  try {
    const { data, error } = await supabase.from('quotes').select('*').limit(1);
    const html = data && data.length && !error
      ? `
          <blockquote class="quote-text">"${data[0].texto}"</blockquote>
          <cite class="quote-author">— ${data[0].autor}</cite>
        `
      : 'Error cargando frase.';
    render('phrase', html);
  } catch {
    render('phrase', 'Error cargando frase.');
  }
}

// --- Oferta especial con estilo de botón ---
async function cargarOfertaEspecial() {
  try {
    const { data, error } = await supabase.from('deals').select('*').limit(1);
    const html = data && data.length && !error
      ? `
          <div class="offer-item">
            <p>${data[0].titulo} - <em>${data[0].descripcion || ''}</em></p>
            <a href="${data[0].url}" target="_blank" rel="noopener noreferrer" class="offer-button">Ver Oferta</a>
          </div>
        `
      : 'Error cargando oferta especial.';
    render('special', html);
  } catch {
    render('special', 'Error cargando oferta especial.');
  }
}

// --- Receta con formato de listas para ingredientes y pasos ---
async function cargarReceta() {
  try {
    const { data, error } = await supabase.from('recipes').select('*').limit(1);
    if (data && data.length > 0 && !error) {
      const recipe = data[0];
      // Creamos listas HTML para los ingredientes y los pasos
      const ingredientsHtml = recipe.ingredientes.map(ing => `<li>${ing}</li>`).join('');
      const stepsHtml = recipe.pasos.map(step => `<li>${step}</li>`).join('');

      const html = `
        <p><strong>Tiempo:</strong> ${recipe.tiempo} minutos</p>
        <h5>Ingredientes:</h5>
        <ul class="recipe-list">${ingredientsHtml}</ul>
        <h5>Pasos:</h5>
        <ol class="recipe-list">${stepsHtml}</ol>
      `;
      render('recipe', html);
    } else {
      render('recipe', 'Error cargando receta.');
    }
  } catch {
    render('recipe', 'Error cargando receta.');
  }
}

// --- Noticias (ya tenía una buena estructura) ---
async function cargarNoticias() {
  try {
    const { data, error } = await supabase.from('news').select('*').limit(1);
    const html = data && data.length && !error
      ? `<h4><a href="${data[0].enlace}" target="_blank" rel="noopener noreferrer">${data[0].titular}</a></h4><p>${data[0].resumen}</p>`
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
