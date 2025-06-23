// main.js

// 1) Tus credenciales
const supabaseUrl = 'https://nxlqaapdbcbevwnepyerxpr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bHFhcGRiY2JldnduZXB5ZXJ4cHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5Njg4NDk3NCwiZXhwIjoxOTEyNDYwOTc0fQ.ADj8hhVzU1qFphhTr1ujKNeNnoaUawuyFEctUGidNts';

// 2) Inicializa el cliente en otra variable (¡no uses `supabase` aquí!)
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// 3) Ya en tus funciones, usa supabaseClient en lugar de supabase
async function cargarCitas() {
  const { data, error } = await supabaseClient.from('citas').select('*');
  document.getElementById('quotes').innerHTML = error
    ? 'Error cargando citas.'
    : data.map(i => `<p>"${i.texto}" — <em>${i.autor}</em></p>`).join('');
}

async function cargarOfertas() {
  const { data, error } = await supabaseClient.from('ofertas').select('*');
  document.getElementById('offers').innerHTML = error
    ? 'Error cargando ofertas.'
    : data.map(i => `<p><strong>${i.titulo}</strong>: ${i.descripcion}</p>`).join('');
}

async function cargarFrase() {
  const { data, error } = await supabaseClient.from('citas').select('*').limit(1);
  document.getElementById('phrase').innerHTML = error || !data.length
    ? 'Error cargando frase.'
    : `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`;
}

async function cargarOfertaEspecial() {
  const { data, error } = await supabaseClient.from('ofertas').select('*').limit(1);
  document.getElementById('special').innerHTML = error || !data.length
    ? 'Error cargando oferta especial.'
    : `<p><strong>${data[0].titulo}</strong>: ${data[0].descripcion}</p>`;
}

async function cargarReceta() {
  const { data, error } = await supabaseClient.from('recetas').select('*').limit(1);
  document.getElementById('recipe').innerHTML = error || !data.length
    ? 'Error cargando receta.'
    : `<p><strong>${data[0].nombre}</strong>: ${data[0].ingredientes} (${data[0].tiempo} min)</p>`;
}

async function cargarNoticias() {
  const { data, error } = await supabaseClient.from('noticias').select('*').limit(1);
  document.getElementById('news').innerHTML = error || !data.length
    ? 'Error cargando noticias.'
    : `<ul>
         <li>${data[0].viñeta1}</li>
         <li>${data[0].viñeta2}</li>
         <li>${data[0].viñeta3}</li>
       </ul>`;
}

// 4) Arranca todo cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  cargarCitas();
  cargarOfertas();
  cargarFrase();
  cargarOfertaEspecial();
  cargarReceta();
  cargarNoticias();
});
