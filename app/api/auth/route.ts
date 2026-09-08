import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signIn, sameOrigin } from '@/lib/auth';
import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Origen no permitido'},{status:403});
 try{const {email,password}=await req.json();if(typeof email!=='string'||typeof password!=='string')return NextResponse.json({error:'Ingresa tu correo y contraseña'},{status:400});
 const database=await db();const key=`${email.toLowerCase()}`;const attempts=database.collection('loginAttempts');const record=await attempts.findOne({key});if(record&&record.count>=8&&Date.now()-record.time<900000)return NextResponse.json({error:'Demasiados intentos. Espera 15 minutos.'},{status:429});
 if(record&&Date.now()-record.time>=900000)await attempts.deleteOne({key});const user=await database.collection('users').findOne({email:email.toLowerCase(),active:true});if(!user||!await compare(password,user.password)){await attempts.updateOne({key},{$set:{time:Date.now()},$inc:{count:1}},{upsert:true});return NextResponse.json({error:'Correo o contraseña incorrectos.'},{status:401});}await attempts.deleteOne({key});await signIn(user._id.toString(),user.sessionVersion||0);return NextResponse.json({ok:true});
 }catch(error){const name=error instanceof Error?error.name:'UnknownError';console.error('[auth] Fallo de inicio de sesión:',name);return NextResponse.json({error:name.startsWith('Mongo')?'No se pudo conectar con MongoDB Atlas. Verifica el usuario de base de datos, su contraseña y la IP autorizada en Atlas.':'No se pudo iniciar sesión. Revisa la configuración del servidor y SESSION_SECRET.'},{status:503});}}
export async function DELETE(req:Request){if(!sameOrigin(req))return new Response(null,{status:403});(await cookies()).delete('eprofile-session');return NextResponse.json({ok:true});}


