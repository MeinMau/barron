# EProfile

Plataforma responsive con Next.js App Router, TypeScript y MongoDB. Incluye panel de estudiante, editor con vista previa, perfil público, administración, CV en PDF y tarjeta QR en PNG/PDF.

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Sin MONGODB_URI se habilita una demostración local. Los borradores del estudiante se guardan en el navegador; la administración de demostración no crea credenciales reales.

## Activar MongoDB y autenticación

1. Copia `.env.example` a `.env.local`.
2. Configura `MONGODB_URI`, `SESSION_SECRET` (32 caracteres aleatorios o más), `ADMIN_EMAIL` y `ADMIN_PASSWORD` (10 caracteres o más).
3. Ejecuta `npm run seed` para crear los índices únicos y la primera cuenta administradora.
4. Reinicia el servidor e inicia sesión en `/login`.
5. Desde Administración, crea cuentas de estudiantes. Cada slug es único y permanente.

No hay registro público. Las contraseñas se almacenan con bcrypt y la sesión usa una cookie HttpOnly. El servidor valida el rol y la propiedad del perfil. El borrador y la publicación se almacenan por separado; desactivar una cuenta también desactiva su acceso y perfil público.

## Pantallas

- `/`: panel privado; en modo demostración abre el ejemplo de Mauricio Vázquez.
- `/login`: inicio de sesión.
- `/recuperar`: solicitud de recuperación atendida por el administrador (no envía correos).
- `/{slug}`: perfil público publicado; estados de perfil inexistente, desactivado y no publicado.
- Las secciones del panel incluyen datos personales, currículum, habilidades, proyectos, reconocimientos, contacto, plantillas, tarjeta QR y administración.

La vista previa utiliza el borrador. El CV utiliza la publicación y la plantilla seleccionada. Los PDF se pueden imprimir desde cualquier visor. Las fotos admiten PNG, JPEG y WebP de hasta 2 MB. Los ejemplos y enlaces de proyectos son ilustrativos.

## Copias de seguridad

La exportación JSON incluye perfiles y ajustes, sin contraseñas. La restauración actualiza cuentas existentes; no recrea las eliminadas. Para una copia completa de MongoDB utiliza `mongodump` y `mongorestore`.

## Verificar

```bash
npm run typecheck
npm run build
npm start
```

La fotografía de ejemplo procede de Unsplash. El logotipo y las miniaturas ilustrativas de proyectos están construidos con CSS. Las fotografías de ejemplo y las tipografías DM Sans y Manrope se sirven localmente desde public/.

