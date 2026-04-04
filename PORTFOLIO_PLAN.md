# Portfolio - Plan de Mejoras

## 📸 Almacenamiento (Cloudinary - Gratis)

- **Problema:** Necesitás guardar fotos, CV, imágenes de proyectos
- **Solución:** Cloudinary (25GB gratis)
- **Para implementar:**
  - Crear cuenta en cloudinary.com
  - Obtener cloud name y API key
  - Agregar variables: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

---

## 🎯 Features Pendientes

### 1. Foto de perfil

- **Ubicación:** `About.astro`
- **Actualmente:** Usa "MKG" en un círculo
- **A hacer:** Reemplazar por foto real desde Cloudinary

### 2. CV / Hoja de vida

- **Necesario:** Botón para descargar CV
- **A hacer:** Subir PDF a Cloudinary, agregar botón en Hero o About

### 3. Imágenes de proyectos

- **Actualmente:** Solo texto
- **A hacer:** Agregar thumbnail/image a cada proyecto en `projects.ts`

### 4. OG Image dinámica

- **Problema:** Usá imagen estática `/og-image.png`
- **A hacer:** Generar OG image con tu foto y datos

### 5. Favicon personalizado

- **Actualmente:** SVG genérico
- **A hacer:** Crear favicon con tus iniciales

---

## 🛠️ Mejoras Técnicas

### SEO

- [ ] Agregar sitemap.xml
- [ ] Agregar robots.txt
- [ ] Schema.org JSON-LD para persona
- [ ] Meta tags de Twitter más específicos

### Performance

- [ ] Implementar lazy loading de imágenes
- [ ] Agregar blur placeholders
- [ ] Optimizar fuentes (subset)

### UX

- [ ] Agregar transitions suaves entre secciones
- [ ] Toast notifications para formulario de contacto
- [ ] Loading states en botones

### Contenido

- [ ] Testimonios/clientes (si tenés)
- [ ] Certificaciones
- [ ] Blog técnica (futuro)

---

## 📊 Métricas que podés agregar

- Años de experiencia
- Proyectos completados
- Clientes satisfechos
- Tecnologías dominadas

---

## 🚀 Deployment

- **Frontend:** Vercel (ya configurado)
- **CDN imágenes:** Cloudinary (gratis)
- **Formulario:** Resend API (gratis hasta 3K emails/mes)

---

## ✅ Checklist de Implementación Inmediata

1. [ ] Crear cuenta Cloudinary
2. [ ] Subir foto de perfil
3. [ ] Subir CV PDF
4. [ ] Actualizar About.astro con foto
5. [ ] Agregar botón descargar CV
6. [ ] Agregar thumbnails a proyectos
7. [ ] Configurar OG image dinámica
