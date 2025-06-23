// main.js

const supabaseUrl = 'https://nxlqaqpdboqzdjwdwxvl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bHFhcXBkYm9xemRqd2R3eHZsIiwicm9sZSI6InB1YmxpYyIsImlhdCI6MTcxOTEwNDgyNSwiZXhwIjoyMDM0NzgwODI1fQ.QqpQuGo6jCCdc1AZFvIYLDY9XQgSc3VEj4cCqLdjs_0';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 🔹 Citas
async function cargarCitas() {
  const { data, error } = await supabase.from('citas').select('*').limit(3);
  const contenedor = document.getElementById('quotes');
  contenedor.innerHTML = error ? 'Error al cargar' : data.map(c => `<div>💬 "${c.texto}" — <em>${c.autor}</em></div>`).join('');
}

// 🔹 Ofertas
async function cargarOfertas() {
  const { data, error } = await supabase.from('ofertas').select('*').limit(3);
  const contenedor = document.getElementById('offers');
  contenedor.innerHTML = error ? 'Error al cargar' : data.map(o => `<div>🛍️ <strong>${o.titulo}</strong> — ${o.descripcion}</div>`).join('');
}

// 🔹 Frase del Día
async function cargarFrase() {
  const { data, error } = await supabase.from('citas').select('*').limit(1);
  const contenedor = document.getElementById('phrase');
  contenedor.innerHTML = error || !data[0] ? 'No disponible' : `🌞 <strong>"${data[0].texto}"</strong> — <em>${data[0].autor}</em>`;
}

// 🔹 Oferta Especial
async function cargarOfertaEspecial() {
  const { data, error } = await supabase.from('ofertas').select('*').limit(1);
  const contenedor = document.getElementById('specialOffer');
  contenedor.innerHTML = error || !data[0] ? 'No disponible' : `🏷️ <strong>${data[0].titulo}</strong><br>${data[0].descripcion}`;
}

// 🔹 Receta rápida
async function cargarReceta() {
  const { data, error } = await supabase.from('recetas').select('*').limit(1);
  const contenedor = document.getElementById('recipe');
  if (error || !data[0]) {
    contenedor.innerHTML = 'No hay receta disponible';
    return;
  }
  const r = data[0];
  contenedor.innerHTML = `<div>🍽️ <strong>${r.nombre}</strong><br/>Ingredientes: ${r.ingredientes}<br/>⏱️ Tiempo: ${r.tiempo} min</div>`;
}

// 🔹 Noticia en 3 viñetas
async function cargarNoticia() {
  const { data, error } = await supabase.from('noticias').select('*').limit(1);
  const contenedor = document.getElementById('news');
  if (error || !data[0]) {
    contenedor.innerHTML = 'No hay noticias disponibles';
    return;
  }
  const n = data[0];
  contenedor.innerHTML = `<ul><li>📰 ${n.vineta1}</li><li>${n.vineta2}</li><li>${n.vineta3}</li></ul>`;
}

// 🔹 Ejecutar todo
cargarCitas();
cargarOfertas();
cargarFrase();
cargarOfertaEspecial();
cargarReceta();
cargarNoticia();
