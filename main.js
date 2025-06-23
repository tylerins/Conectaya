// Configuración Supabase
const supabaseUrl = 'https://nxlqaapdbcbevwnepyerxpr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bHFhcGRiY2JldnduZXB5ZXJ4cHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5Njg4NDk3NCwiZXhwIjoxOTEyNDYwOTc0fQ.ADj8hhVzU1qFphhTr1ujKNeNnoaUawuyFEctUGidNts';

// Inicializa el cliente en otra variable para evitar el TDZ
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Funciones de carga

async function cargarCitas() {
  const { data, error } = await supabaseClient.from('citas').select('*');
  const cont = document.getElementById('quotes');
  cont.innerHTML = error
    ? 'Error cargando citas.'
    : data.map(item => `<p>"${item.texto}" — <em>${item.autor}</em></p>`).join('');
}

async function cargarOfertas() {
  const { data, error } = await supabaseClient.from('ofertas').select('*');
  const cont = document.getElementById('offers');
  cont.innerHTML = error
    ? 'Error cargando ofertas.'
    : data.map(item => `<p><strong>${item.titulo}</strong>: ${item.descripcion}</p>`).join('');
}

async function cargarFrase() {
  const { data, error } = await supabaseClient.from('citas').select('*').limit(1);
  const cont = document.getElementById('phrase');
  cont.innerHTML = error || !data.length
    ? 'Error cargando frase.'
    : `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`;
}

async function cargarOfertaEspecial() {
  const { data, error } = await supabaseClient.from('ofertas').select('*').limit(1);
  const cont = document.getElementById('special');
  cont.innerHTML = error || !data.length
    ? 'Error cargando oferta especial.'
    : `<p><strong>${data[0].titulo}</strong>: ${data[0].descripcion}</p>`;
}

async function cargarReceta() {
  const { data, error } = await supabaseClient.from('recetas').select('*').limit(1);
  const cont = document.getElementById('recipe');
  cont.innerHTML = error || !data.length
    ? 'Error cargando receta.'
    : `<p><strong>${data[0].nombre}</strong>: ${data[0].ingredientes} (${data[0].tiempo} min)</p>`;
}

async function cargarNoticias() {
  const { data, error } = await supabaseClient.from('noticias').select('*').limit(1);
  const cont = document.getElementById('news');
  cont.innerHTML = error || !data.length
    ? 'Error cargando noticias.'
    : `<ul>
         <li>${data[0].viñeta1}</li>
         <li>${data[0].viñeta2}</li>
         <li>${data[0].viñeta3}</li>
       </ul>`;
}

// Ejecuta todo al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  cargarCitas();
  cargarOfertas();
  cargarFrase();
  cargarOfertaEspecial();
  cargarReceta();
  cargarNoticias();
});
