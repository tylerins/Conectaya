// main.js
const supabaseUrl = 'https://nxlqaapdbcebwnypeprxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Pon aquí tu key real completa
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Cargar citas
async function cargarCitas() {
  const { data, error } = await supabase.from('citas').select('*');
  const contenedor = document.getElementById('quotes');
  contenedor.innerHTML = error ? 'Error cargando citas.' :
    data.map(item => `<p>"${item.texto}" — <em>${item.autor}</em></p>`).join('');
}

// Cargar ofertas
async function cargarOfertas() {
  const { data, error } = await supabase.from('ofertas').select('*');
  const contenedor = document.getElementById('offers');
  contenedor.innerHTML = error ? 'Error cargando ofertas.' :
    data.map(item => `<p><strong>${item.titulo}</strong>: ${item.descripcion}</p>`).join('');
}

// Frase del día (primera cita)
async function cargarFrase() {
  const { data, error } = await supabase.from('citas').select('*').limit(1);
  const contenedor = document.getElementById('phrase');
  contenedor.innerHTML = error || !data.length ? 'Error cargando frase.' :
    `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`;
}

// Oferta especial (primera oferta)
async function cargarOfertaEspecial() {
  const { data, error } = await supabase.from('ofertas').select('*').limit(1);
  const contenedor = document.getElementById('special');
  contenedor.innerHTML = error || !data.length ? 'Error cargando oferta especial.' :
    `<p><strong>${data[0].titulo}</strong>: ${data[0].descripcion}</p>`;
}

// Receta rápida
async function cargarReceta() {
  const { data, error } = await supabase.from('recetas').select('*');
  const contenedor = document.getElementById('recipe');
  contenedor.innerHTML = error ? 'Error cargando receta.' :
    data.map(item => `<p><strong>${item.nombre}</strong> - ${item.ingredientes} (${item.tiempo} min)</p>`).join('');
}

// Noticia en 3 viñetas
async function cargarNoticias() {
  const { data, error } = await supabase.from('noticias').select('*');
  const contenedor = document.getElementById('news');
  contenedor.innerHTML = error ? 'Error cargando noticias.' :
    data.map(item => `
      <p>
        • ${item.vineta1}<br>
        • ${item.vineta2}<br>
        • ${item.vineta3}
      </p>
    `).join('');
}

// Lanzar todas las cargas
cargarCitas();
cargarOfertas();
cargarFrase();
cargarOfertaEspecial();
cargarReceta();
cargarNoticias();
