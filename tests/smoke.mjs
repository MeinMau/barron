import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1100}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
await page.getByRole('heading',{name:/Hola, Mauricio/}).waitFor();
await page.screenshot({path:'artifacts/dashboard-desktop.png',fullPage:true});
await page.getByRole('button',{name:'Información personal',exact:true}).click();
await page.getByLabel('Nombre completo *',{exact:false}).fill('Mauricio Prueba');
await page.getByRole('button',{name:'Guardar borrador',exact:true}).last().click();
await page.getByRole('status').waitFor();
const publicPage=await browser.newPage();await publicPage.goto('http://localhost:3000/mauriciovazquez');
await publicPage.getByRole('heading',{name:'Mauricio Vázquez',exact:true}).waitFor();
await publicPage.close();
await page.getByRole('button',{name:'Publicar cambios',exact:true}).click();
await page.getByRole('button',{name:'Confirmar',exact:true}).click();
await page.getByRole('button',{name:'Vista previa',exact:true}).click();
await page.getByRole('heading',{name:'Mauricio Prueba',exact:true}).waitFor();
const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Descargar CV',exact:true}).click();const pdf=await downloadPromise;assert.match(pdf.suggestedFilename(),/\.pdf$/);
await page.getByRole('button',{name:'Volver al editor'}).click();
await page.getByRole('button',{name:'Administración'}).click();
await page.getByRole('button',{name:'Crear cuenta',exact:true}).click();
await page.getByLabel('Nombre completo',{exact:true}).fill('Ana García');
await page.getByLabel('Correo electrónico',{exact:true}).fill('ana@example.com');
await page.getByLabel('Enlace permanente',{exact:true}).fill('anagarcia');
await page.getByLabel('Contraseña temporal',{exact:true}).fill('Temporal12345!');
await page.getByRole('button',{name:'Crear cuenta de estudiante',exact:true}).click();
await page.getByRole('cell',{name:'Ana García ana@example.com'}).waitFor();
await page.getByRole('button',{name:'Código QR y tarjeta',exact:true}).click();
const qrDownload=page.waitForEvent('download');await page.getByRole('button',{name:'Descargar PDF',exact:true}).click();assert.match((await qrDownload).suggestedFilename(),/\.pdf$/);
await page.setViewportSize({width:390,height:844});
await page.getByRole('button',{name:'Abrir menú'}).click();
await page.getByRole('button',{name:'Resumen',exact:true}).click();
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false,'Mobile overflow');
await page.waitForTimeout(350);await page.screenshot({path:'artifacts/dashboard-mobile.png',fullPage:true});
await page.goto('http://localhost:3000/login');await page.getByRole('heading',{name:'Qué bueno verte de nuevo.'}).waitFor();
await page.goto('http://localhost:3000/recuperar');await page.getByRole('heading',{name:'Recupera tu acceso.'}).waitFor();
const missing=await page.goto('http://localhost:3000/no-existe');await page.getByRole('heading',{name:'Este perfil aún no está por aquí.'}).waitFor();assert.ok([200,404].includes(missing.status()));
assert.deepEqual(errors,[]);console.log('PASS: dashboard, draft isolation, publication, PDF, admin creation, QR PDF, mobile, login, recovery, 404.');
}finally{await browser.close();}


