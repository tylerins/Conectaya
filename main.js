// main.js

// Inicializar Supabase
const supabaseUrl = 'https://nxlqaapdbcbevnypeprxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Usa tu clave real completa aquí
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 🍊 Citas
async function cargarCitas() {
  const { data, error } = await supabase.from('citas').select('*');
  const contenedor = document.getElementById('quotes');
  contenedor.innerHTML = error ? 'Error cargando citas.' :
    data.map(item => `<p>"${item.texto}" — <em>${item.autor}</em></p>`).join('');
}

// 💰 Ofertas
async function cargarOfertas() {
  const { data, error } = await supabase.from('ofertas').select('*');
  const contenedor = document.getElementById('offers');
  contenedor.innerHTML = error ? 'Error cargando ofertas.' :
    data.map(item => `<p><strong>${item.titulo}</strong>: ${item.descripcion}</p>`).join('');
}

// ☀️ Frase del Día (1ª cita)
async function cargarFrase() {
  const { data, error } = await supabase.from('citas').select('*').limit(1);
  const contenedor = document.getElementById('phrase');
  contenedor.innerHTML = error || !data.length ? 'Error cargando frase.' :
    `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`;
}

// 🎁 Oferta Especial (1ª oferta)
async function cargarOfertaEspecial() {
  const { data, error } = await supabase.from('ofertas').select('*').limit(1);
  const contenedor = document.getElementById('special');
  contenedor.innerHTML = error || !data.length ? 'Error cargando oferta especial.' :
    `<p><strong>${data[0].titulo}</strong>: ${data[0].descripcion}</p>`;
}

// 🍳 Receta Rápida
async function cargarReceta() {
  const { data, error } = await supabase.from('recetas').select('*').limit(1);
  const contenedor = document.getElementById('recipe');
  contenedor.innerHTML = error || !data.length ? 'Error cargando receta.' :
    `<p><strong>${data[0].titulo}</strong>: ${data[0].ingredientes}</p>`;
}

// 📰 Noticias en 3 Viñetas
async function cargarNoticias() {
  const { data, error } = await supabase.from('noticias').select('*').limit(1);
  const contenedor = document.getElementById('news');
  contenedor.innerHTML = error || !data.length ? 'Error cargando noticias.' :
    `<ul>
      <li>• ${data[0].viñeta1}</li>
      <li>• ${data[0].viñeta2}</li>
      <li>• ${data[0].viñeta3}</li>
    </ul>`;
}

// Ejecutar funciones al cargar la página
window.onload = () => {
  cargarCitas();
  cargarOfertas();
  cargarFrase();
  cargarOfertaEspecial();
  cargarReceta();
  cargarNoticias();
};
