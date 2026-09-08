import { z } from 'zod';
const link=z.string().max(2000).refine(v=>!v||/^https?:\/\//i.test(v),'Usa una URL https:// válida');
const entry=z.object({id:z.string(),title:z.string().max(200),organization:z.string().max(200),period:z.string().max(100),description:z.string().max(3000)});
export const profileSchema=z.object({name:z.string().max(120),career:z.string().max(200),bio:z.string().max(280),about:z.string().max(3000),availability:z.string().max(100),location:z.string().max(200),photo:z.string().max(3000000).refine(v=>!v||v.startsWith('/images/')||/^https?:\/\//i.test(v)||/^data:image\/(png|jpeg|webp);base64,/.test(v)),email:z.union([z.literal(''),z.string().email()]),phone:z.string().max(60),linkedin:link,github:link,education:z.array(entry).max(30),experience:z.array(entry).max(50),awards:z.array(entry).max(50),skills:z.array(z.object({id:z.string(),name:z.string().max(100),category:z.string().max(100)})).max(100),projects:z.array(z.object({id:z.string(),title:z.string().max(200),description:z.string().max(2000),technologies:z.string().max(300),role:z.string().max(200),academic:z.boolean(),url:link,repository:link,color:z.string().max(30)})).max(40),template:z.enum(['Profesional','Minimalista','Creativa','Tecnológica'])});



