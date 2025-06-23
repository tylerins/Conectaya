// 1) Configuración de Supabase (copia exactamente desde tu panel de Supabase)
const supabaseUrl = 'https://nxlqaapdbcbevwnepyerxpr.supabase.co';
const supabaseKey = '<TU_ANON_KEY>';

// 2) Inicializa el cliente en una variable independiente
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Función auxiliar para renderizar contenido en el DOM
define function render(id, html) {
  document.getElementById(id).innerHTML = html;
}

// 3) Funciones para cargar datos desde Supabase
async function cargarCitas() {
  const { data, error } = await supabaseClient.from('citas').select('*');
  render('quotes', error
    ? 'Error cargando citas.'
    : data.map(i => `<p>"${i.texto}" — <em>${i.autor}</em></p>`).join('')
  );
}

async function cargarOfertas() {
  const { data, error } = await supabaseClient.from('ofertas').select('*');
  render('offers', error
    ? 'Error cargando ofertas.'
    : data.map(i => `<p><strong>${i.titulo}</strong>: ${i.descripcion}</p>`).join('')
  );
}

async function cargarFrase() {
  const { data, error } = await supabaseClient.from('citas').select('*').limit(1);
  render('phrase', error || !data.length
    ? 'Error cargando frase.'
    : `<p>"${data[0].texto}" — <em>${data[0].autor}</em></p>`
  );
}

async function cargarOfertaEspecial() {
  const { data, error } = await supabaseClient.from('ofertas').select('*').limit(1);
  render('special', error || !data.length
    ? 'Error cargando oferta especial.'
    : `<p><strong>${data[0].titulo}</strong>: ${data[0].descripcion}</p>`
  );
}

async function cargarReceta() {
  const { data, error } = await supabaseClient.from('recetas').select('*').limit(1);
  render('recipe', error || !data.length
    ? 'Error cargando receta.'
    : `<p><strong>${data[0].nombre}</strong>: ${data[0].ingredientes} (${data[0].tiempo} min)</p>`
  );
}

async function cargarNoticias() {
  const { data, error } = await supabaseClient.from('noticias').select('*').limit(1);
  render('news', error || !data.length
    ? 'Error cargando noticias.'
    : `<ul>
         <li>${data[0].viñeta1}</li>
         <li>${data[0].viñeta2}</li>
         <li>${data[0].viñeta3}</li>
       </ul>`
  );
}

// 4) Ejecuta todas las funciones al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  cargarCitas();
  cargarOfertas();
  cargarFrase();
  cargarOfertaEspecial();
  cargarReceta();
  cargarNoticias();
});
