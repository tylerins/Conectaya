// main.js completo y corregido sin imports (para uso directo en HTML clásico)

const supabaseUrl = 'https://nxlqaapdbcbe...supabase.co'; // TU URL REAL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIs...'; // TU KEY REAL
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Cargar citas
async function cargarCitas() {
  const { data, error } = await supabase.from('citas').select('*');
  const contenedor = document.getElementById('quotes');
  contenedor.innerHTML = error ? 'Error cargando citas.' :
    data.map(item => `<p>"${item.texto}" – <em>${item.autor}</em></p>`).join('');
}

// Cargar ofertas
async function cargarOfertas() {
  const { data, error } = await supabase.from('ofertas').select('*');
  const contenedor = document.getElementById('offers');
  contenedor.innerHTML = error ? 'Error cargando ofertas.' :
    data.map(item => `<p><strong>${item.titulo}</strong>: ${item.descripcion}</p>`).join('');
}

// Cargar frase del día (1ª cita)
async function cargarFrase() {
  const { data, error } = await supabase.from('citas').select('*').limit(1);
  const contenedor = document.getElementById('phrase');
  contenedor.innerHTML = error || !data.length ? 'Error cargando frase.' :
    `<p>"${data[0].texto}" – <em>${data[0].autor}</em></p>`;
}

// Cargar oferta especial (1ª oferta)
async function cargarOfertaEspecial() {
  const { data, error } = await supabase.from('ofertas').select('*').limit(1);
  const contenedor = document.getElementById('special');
  contenedor.innerHTML = error || !data.length ? 'Error cargando oferta especial.' :
    `<p><strong>${data[0].titulo}</strong>: ${data[0].descripcion}</p>`;
}

// Cargar receta (1ª receta)
async function cargarReceta() {
  const { data, error } = await supabase.from('recetas').select('*').limit(1);
  const contenedor = document.getElementById('recipe');
  contenedor.innerHTML = error || !data.length ? 'Error cargando receta.' :
    `<p><strong>${data[0].nombre}</strong>: ${data[0].ingredientes} - ${data[0].tiempo} minutos</p>`;
}

// Cargar noticias (1ª noticia)
async function cargarNoticias() {
  const { data, error } = await supabase.from('noticias').select('*').limit(1);
  const contenedor = document.getElementById('news');
  contenedor.innerHTML = error || !data.length ? 'Error cargando noticias.' :
    `<ul><li>${data[0].viñeta1}</li><li>${data[0].viñeta2}</li><li>${data[0].viñeta3}</li></ul>`;
}

// Ejecutar funciones al cargar
cargarCitas();
cargarOfertas();
cargarFrase();
cargarOfertaEspecial();
cargarReceta();
cargarNoticias();
