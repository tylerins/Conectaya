# ConectaYa

**Web de contenido diario**: cada día una frase inspiradora, una oferta, una receta rápida y una noticia en 3 viñetas.

---

## 🎯 Objetivo  
Tener un sitio que enganche al usuario con variedad de “microcontenidos” diarios y que se mantenga 100 % automatizado.

## 📦 Tech Stack  
- **Frontend:** Next.js + Tailwind CSS (deploy en Vercel)  
- **Base de datos:** Supabase (Postgres + Auth)  
- **Automatización:** n8n Desktop (cron → ChatGPT, ofertas, recetas, noticias → Supabase → webhook Vercel)  
- **IA de contenidos:** API de OpenAI (ChatGPT)  
- **Dominio:** conectaya.net  

## 🗂 Estructura del repo  
/conectaya  
├─ README.md  
├─ /frontend      ← Next.js + Tailwind  
├─ /supabase      ← scripts SQL de tablas  
└─ /n8n           ← workflows exportados  

## 📝 Prompts clave para ChatGPT  
- **Frase del día**  
  > “Eres un Curador de Contenido Diario. Dame 5 frases inspiradoras (texto + autor).”

- **Oferta del día**  
  > “Eres un Curador de Contenido Diario. Dame 3 ofertas online con título, enlace y descripción.”

- **Receta rápida**  
  > “Eres un Curador de Contenido Diario. Dame 3 recetas fáciles (<30 min) con lista de ingredientes y tiempo.”

- **Noticia en 3 viñetas**  
  > “Eres un Curador de Contenido Diario. Resume en 3 viñetas la noticia más importante de hoy en España.”

## 📅 Próximos pasos  
1. **Configurar Supabase**: crear tablas `quotes`, `deals`, `recipes`, `news`.  
2. **Instalar n8n Desktop** y montar workflow diario.  
3. **Desarrollar frontend**: consumir Supabase y publicar en Vercel.  
4. **Conectar dominio**: apuntar `conectaya.net` a Vercel.