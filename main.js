// 1) Import ESM de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2) Configuración de Supabase\ nconst supabaseUrl = 'https://xjpynyilaqajdvhxuyup.supabase.co';
const supabaseKey = '<TU_ANON_KEY>'; // reemplaza
const supabase = createClient(supabaseUrl, supabaseKey);

// 3) Helper render
function render(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// 4) Fetchers\ async function cargarCitas() {
  const { data, error } = await supabase.from('citas').select('*');
  render('quotes', error ? 'Error cargando citas.' : data.map(i => `<p>"${i.texto}" — <em>${i.autor}</em></p>`).join(''));
}

async function cargarOfertas() {
  const { data, error } = await supabase.from('ofertas').select('*');
  render('offers', error ? 'Error cargando ofertas.' : data.map(i => `<p>"${i.titulo}" — ${i.descripcion}</p>`).join(''));
}

async function cargarFrase() {
  const { data, error } = await supabase.from('citas').select('*').limit(1);
  render('phrase', error || !data.length ? 'Error cargando frase.' : `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`);
}

async function cargarOfertaEspecial() {
  const { data, error } = await supabase.from('ofertas').select('*').limit(1);
  render('special', error || !data.length ? 'Error cargando oferta especial.' : `<p>"${data[0].titulo}" — ${data[0].descripcion}</p>`);
}

async function cargarReceta() {
  const { data, error } = await supabase.from('recetas').select('*').limit(1);
  render('recipe', error || !data.length ? 'Error cargando receta.' : `<p>"${data[0].nombre}" — ${data[0].ingredientes} (${data[0].tiempo} min)</p>`);
}

async function cargarNoticias() {
  const { data, error } = await supabase.from('noticias').select('*').limit(1);
  render('news', error || !data.length ? 'Error cargando noticias.' : `<ul><li>${data[0].viñeta1}</li><li>${data[0].viñeta2}</li><li>${data[0].viñeta3}</li></ul>`);
}

// 5) Kickoff
window.addEventListener('DOMContentLoaded', () => {
  cargarCitas(); cargarOfertas(); cargarFrase(); cargarOfertaEspecial(); cargarReceta(); cargarNoticias();
});
