// =================================================================
//     MAIN.JS - VERSIÓN FINAL CON "HERRAMIENTAS ÚTILES"
// =================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://xjpynyilaqajdvhxuyup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHlueWlsYXFhamR2aHh1eXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDMzNjksImV4cCI6MjA2NjExOTM2OX0.sMcXn-w_zvGCOoXfRCVzkWR2v3hnJ0VCwklZs1lKwyM';
const supabase = createClient(supabaseUrl, supabaseKey);

function render(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

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
  } catch(e) {
    console.error("Error en cargarCitas:", e);
    render('quotes', 'Error cargando citas.');
  }
}

// --- VERSIÓN MEJORADA PARA "HERRAMIENTAS" ---
async function cargarOfertas() { 
  try {
    const { data, error } = await supabase.from('deals').select('*');
    const html = data && !error
      ? data.map(i => `
          <div class="offer-item">
            <p>${i.titulo} - <em>${i.descripcion || ''}</em></p>
            <a href="${i.url}" target="_blank" rel="noopener noreferrer" class="offer-button">Visitar</a>
          </div>
        `).join('')
      : 'Error cargando herramientas.';
    render('offers', html);
  } catch(e) {
    console.error("Error en cargarHerramientas:", e);
    render('offers', 'Error cargando herramientas.');
  }
}

// --- VERSIÓN MEJORADA (LEE DE SPECIAL_QUOTES) ---
async function cargarFrase() {
  try {
    const { data, error } = await supabase.from('special_quotes').select('*').limit(1);
    const html = data && data.length && !error
      ? `
          <blockquote class="quote-text">"${data[0].texto}"</blockquote>
          <cite class="quote-author">— ${data[0].autor}</cite>
        `
      : 'Error cargando frase.';
    render('phrase', html);
  } catch(e) {
    console.error("Error en cargarFrase:", e);
    render('phrase', 'Error cargando frase.');
  }
}

// --- VERSIÓN MEJORADA PARA "HERRAMIENTA ESPECIAL" ---
async function cargarOfertaEspecial() {
  try {
    const { data, error } = await supabase.from('special_deals').select('*').limit(1);
    if (data && data.length > 0 && !error) {
        const specialDeal = data[0];
        const buttonHtml = specialDeal.url
            ? `<a href="${specialDeal.url}" target="_blank" rel="noopener noreferrer" class="offer-button">Visitar</a>`
            : '';
        const html = `
            <div class="offer-item">
                <p>${specialDeal.titulo} - <em>${specialDeal.descripcion || ''}</em></p>
                ${buttonHtml}
            </div>
        `;
        render('special', html);
    } else {
        render('special', 'Error cargando herramienta especial.');
    }
  } catch(e) {
    console.error("Error en cargarHerramientaEspecial:", e);
    render('special', 'Error cargando herramienta especial.');
  }
}

async function cargarReceta() {
  try {
    const { data, error } = await supabase.from('recipes').select('*').limit(1);
    if (data && data.length > 0 && !error) {
      const recipe = data[0];
      
      const imageHtml = recipe.imagen_url
        ? `<img src="${recipe.imagen_url}" alt="Imagen de ${recipe.nombre}" class="card-image">`
        : '';

      function parseList(listData) {
        if (Array.isArray(listData)) return listData;
        if (typeof listData === 'string') {
          try {
            const cleanedString = listData.replace(/^{/, '[').replace(/}$/, ']').replace(/","/g, '","');
            return JSON.parse(cleanedString);
          } catch (e) {
            return [listData];
          }
        }
        return [];
      }

      const ingredientsList = parseList(recipe.ingredientes);
      const stepsList = parseList(recipe.pasos);
      
      const ingredientsHtml = ingredientsList.length > 0 
        ? ingredientsList.map(ing => `<li>${ing}</li>`).join('')
        : '<li>No se especificaron ingredientes.</li>';

      const stepsHtml = stepsList.length > 0
        ? stepsList.map(step => `<li>${step}</li>`).join('')
        : '<li>No se especificaron pasos.</li>';

      const html = `
        ${imageHtml}
        <div class="card-content">
          <h2>🍮 Receta Rápida</h2>
          <h4>${recipe.nombre || 'Receta sin nombre'}</h4>
          <p><strong>Tiempo:</strong> ${recipe.tiempo || 'N/A'} minutos</p>
          <h5>Ingredientes:</h5>
          <ul class="recipe-list">${ingredientsHtml}</ul>
          <h5>Pasos:</h5>
          <ol class="recipe-list">${stepsHtml}</ol>
        </div>
      `;
      render('recipe', html);
    } else {
      render('recipe', '<div class="card-content"><h2>🍮 Receta Rápida</h2><p>Error cargando receta.</p></div>');
    }
  } catch (e) {
    console.error("Error detallado en la función cargarReceta:", e);
    render('recipe', '<div class="card-content"><h2>🍮 Receta Rápida</h2><p>Error cargando receta.</p></div>');
  }
}

async function cargarNoticias() {
  try {
    const { data, error } = await supabase.from('news').select('*').limit(1);
    if (data && data.length > 0 && !error) {
        const newsItem = data[0];
        const categoryHtml = newsItem.categoria ? `<span class="category-tag">${newsItem.categoria}</span>` : '';
        const html = `
            ${categoryHtml}
            <h4><a href="${newsItem.enlace}" target="_blank" rel="noopener noreferrer">${newsItem.titular}</a></h4>
            <p>${newsItem.resumen}</p>
        `;
        render('news', html);
    } else {
        render('news', 'Error cargando noticias.');
    }
  } catch(e) {
    console.error("Error en cargarNoticias:", e);
    render('news', 'Error cargando noticias.');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  cargarCitas();
  cargarOfertas(); // Esta función ahora carga las herramientas
  cargarFrase();
  cargarOfertaEspecial(); // Esta función ahora carga la herramienta destacada
  cargarReceta();
  cargarNoticias();
});
