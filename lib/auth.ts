import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
import { ObjectId } from 'mongodb';
function key(){const s=process.env.SESSION_SECRET;if(!s||s.length<32)throw new Error('Configura SESSION_SECRET con al menos 32 caracteres');return new TextEncoder().encode(s);}
export async function session(){try{const token=(await cookies()).get('eprofile-session')?.value;if(!token)return null;const {payload}=await jwtVerify(token,key());const user=await (await db()).collection('users').findOne({_id:new ObjectId(payload.sub),active:true});if(user && (user.sessionVersion||0)!==(payload.version||0))return null;return user;}catch{return null;}}
export async function signIn(id:string,version=0){const token=await new SignJWT({version}).setProtectedHeader({alg:'HS256'}).setSubject(id).setIssuedAt().setExpirationTime('7d').sign(key());(await cookies()).set('eprofile-session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:604800});}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin;}

