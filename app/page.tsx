import Workspace from '@/components/workspace';
import { session } from '@/lib/auth';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default async function Home() 
{ const configured = !!process.env.MONGODB_URI; const user = configured ? await session() : null; if (configured && !user) redirect('/login'); const safe = user ? { _id: user._id.toString(), slug: user.slug, email: user.email, role: user.role, active: user.active, draft: user.draft, published: user.published, updatedAt: user.updatedAt } : undefined; return <Workspace mode={configured ? 'live' : 'demo'} initial={safe ? JSON.parse(JSON.stringify(safe)) : undefined} />; }
