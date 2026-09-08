import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
if(!process.env.MONGODB_URI||!process.env.ADMIN_EMAIL||!process.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD.length<10)throw Error('Configura MONGODB_URI, ADMIN_EMAIL y ADMIN_PASSWORD (mínimo 10 caracteres).');
const client=await new MongoClient(process.env.MONGODB_URI,{serverSelectionTimeoutMS:8000,connectTimeoutMS:8000}).connect();
try{const users=client.db(process.env.MONGODB_DB||'eprofile').collection('users');await users.createIndex({email:1},{unique:true});await users.createIndex({slug:1},{unique:true,sparse:true});await users.updateOne({email:process.env.ADMIN_EMAIL.toLowerCase()},{$setOnInsert:{email:process.env.ADMIN_EMAIL.toLowerCase(),password:await hash(process.env.ADMIN_PASSWORD,12),role:'admin',active:true,updatedAt:new Date()}},{upsert:true});console.log('Administrador e índices preparados.');}finally{await client.close();}

