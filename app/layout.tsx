import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'EProfile — Tu talento, tu siguiente oportunidad', description: 'Tu perfil profesional, currículum y tarjeta digital en un solo lugar.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="es"><body>{children}</body></html>; }
