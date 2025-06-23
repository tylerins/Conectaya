// main.js (corregido y listo para usar)

// 1. Cargar la librería de Supabase desde un CDN en tu HTML así:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
// 
// 2. Luego asegúrate que este archivo JS se cargue DESPUÉS del script del CDN de Supabase en el HTML

const supabaseUrl = 'https://nxlqaapdbcbevwnepyerxpr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bHFhcGRiY2JldnduZXB5ZXJ4cHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5Njg4NDk3NCwiZXhwIjoxOTEyNDYwOTc0fQ.ADj8hhVzU1qFphhTr1ujKNeNnoaUawuyFEctUGidNts';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Cargar citas
async function cargarCitas() {
  const { data, error } = await supabase.from('citas').select('*');
  const contenedor = document.getElementById('quotes');
  contenedor.innerHTML = error ? 'Error cargando citas.' : data.map(item => `<p>"${item.texto}" — <em>${item.autor}</em></p>`).join('');
}

// Cargar ofertas
async function cargarOfertas() {
  const { data, error } = await supabase.from('ofertas').select('*');
  const contenedor = document.getElementById('offers');
  contenedor.innerHTML = error ? 'Error cargando ofertas.' : data.map(item => `<p><strong>${item.titulo}</strong>: ${item.descripcion}</p>`).join('');
}

// Frase del día (1a cita)
async function cargarFrase() {
  const { data, error } = await supabase.from('citas').select('*').limit(1);
  const contenedor = document.getElementById('phrase');
  contenedor.innerHTML = error || !data.length ? 'Error cargando frase.' : `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`;
}

// Oferta especial (1a oferta)
async function cargarOfertaEspecial() {
  const { data, error } = await supabase.from('ofertas').select('*').limit(1);
  const contenedor = document.getElementById('special');
  contenedor.innerHTML = error || !data.length ? 'Error cargando oferta especial.' : `<p><strong>${data[0].titulo}</strong>: ${data[0].descripcion}</p>`;
}

// Receta rápida
async function cargarReceta() {
  const { data, error } = await supabase.from('recetas').select('*').limit(1);
  const contenedor = document.getElementById('recipe');
  contenedor.innerHTML = error || !data.length ? 'Error cargando receta.' : `<p><strong>${data[0].nombre}</strong>: ${data[0].ingredientes} (${data[0].tiempo} min)</p>`;
}

// Noticias en 3 viñetas
async function cargarNoticias() {
  const { data, error } = await supabase.from('noticias').select('*').limit(1);
  const contenedor = document.getElementById('news');
  contenedor.innerHTML = error || !data.length ? 'Error cargando noticias.' : `<ul><li>${data[0].viñeta1}</li><li>${data[0].viñeta2}</li><li>${data[0].viñeta3}</li></ul>`;
}

// Cargar todo al iniciar
window.addEventListener('DOMContentLoaded', () => {
  cargarCitas();
  cargarOfertas();
  cargarFrase();
  cargarOfertaEspecial();
  cargarReceta();
  cargarNoticias();
});
