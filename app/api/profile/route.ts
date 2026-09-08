import { NextResponse } from 'next/server';
import { session, sameOrigin } from '@/lib/auth';
import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { profileSchema as schema } from '@/lib/validation';
export async function PUT(req:Request){if(!sameOrigin(req))return new Response(null,{status:403});const user=await session();if(!user)return NextResponse.json({error:'Sesión requerida'},{status:401});try{const body=await req.json();const profile=schema.parse(body.profile);const id=user.role==='admin'&&body.id?new ObjectId(body.id):user._id;if(body.publish&&(!profile.name.trim()||!profile.career.trim()))return NextResponse.json({error:'Completa el nombre y la carrera antes de publicar.'},{status:400});const update:Record<string,unknown>={draft:profile,updatedAt:new Date()};if(body.publish)update.published=profile;await (await db()).collection('users').updateOne({_id:id,role:'student'},{$set:update});return NextResponse.json({ok:true});}catch(error){return NextResponse.json({error:error instanceof z.ZodError?error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join(', '):'No se pudieron guardar los cambios.'},{status:400});}}

