// main.js (ESM)

// 1) Importa el cliente Supabase desde un CDN compatible con módulos
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2) Credenciales (cópialas bien desde Supabase)
const supabaseUrl = 'https://xjpynyilaqajdvhxuyup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHlueWlsYXFhamR2aHh1eXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDMzNjksImV4cCI6MjA2NjExOTM2OX0.sMcXn-w_zvGCOoXfRCVzkWR2v3hnJ0VCwklZs1lKwyM';

// 3) Inicializa el cliente
const supabase = createClient(supabaseUrl, supabaseKey);

// 4) Helper para renderizar
function render(id, html) {
  document.getElementById(id).innerHTML = html;
}

// 5) Funciones de carga (igual que antes)
async function cargarCitas() {
  const { data, error } = await supabase.from('citas').select('*');
  render('quotes', error
    ? 'Error cargando citas.'
    : data.map(i => `<p>"${i.texto}" — <em>${i.autor}</em></p>`).join('')
  );
}
// ... resto de funciones iguales ...

// 6) Arranca todo al cargar
window.addEventListener('DOMContentLoaded', () => {
  cargarCitas();
  cargarOfertas();
  cargarFrase();
  cargarOfertaEspecial();
  cargarReceta();
  cargarNoticias();
});
