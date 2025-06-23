// main.js
const supabaseUrl = 'https://nxlqaqpdbcebwnyeprxp.supabase.co';
const supabaseKey = 'eyJh...QkBEI'; // Tus credenciales aquí
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function cargarTabla(tabla, elementId, formatFn) {
  const { data, error } = await supabase.from(tabla).select('*');
  const cont = document.getElementById(elementId);
  if (error) return cont.innerHTML = 'Error cargando ' + tabla;
  cont.innerHTML = formatFn(data);
}

// Funciones específicas
cargarTabla('citas', 'quotes', d => d.map(i => `<p>“${i.texto}” — <em>${i.autor}</em></p>`).join(''));
cargarTabla('ofertas', 'offers', d => d.map(i => `<p><strong>${i.titulo}</strong>: ${i.descripcion}</p>`).join(''));
cargarTabla('citas', 'phrase', d => d.length ? `<p>“${d[0].texto}” — <em>${d[0].autor}</em></p>` : '—');
cargarTabla('ofertas', 'special-offer', d => d.length ? `<p><strong>${d[0].titulo}</strong>: ${d[0].descripcion}</p>` : '—');
cargarTabla('recetas', 'recipe', d => d.length ? `<p><strong>${d[0].nombre}</strong>: ${d[0].ingredientes} — ${d[0].tiempo ?? '—'} min</p>` : '—');
cargarTabla('noticias', 'news', d => d.length && d[0].vinyetas ? `<ul>${d[0].vinyetas.map(v => `<li>${v}</li>`).join('')}</ul>` : '—');
