import { db } from '@/lib/db';
import { demoProfile } from '@/lib/profile';
import PublicProfile from '@/components/public-profile';
import { notFound } from 'next/navigation';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!process.env.MONGODB_URI){if(slug!=='mauriciovazquez')notFound();return <PublicProfile profile={demoProfile} slug={slug} demo/>;}const user=await (await db()).collection('users').findOne({slug,role:'student'});if(!user)notFound();if(!user.active||!user.published)return <main className="state-page"><div className="brand">▧ EProfile</div><h1>{!user.active?'Perfil temporalmente no disponible':'Un nuevo perfil está en camino'}</h1><p>{!user.active?'Esta cuenta se encuentra desactivada.':'El estudiante todavía no ha publicado su EProfile.'}</p><a className="btn primary" href="/">Ir al inicio</a></main>;return <PublicProfile profile={user.published} slug={slug}/>;}


