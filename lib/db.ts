import { MongoClient } from 'mongodb';
const globalDB = globalThis as unknown as { mongo?:Promise<MongoClient> };
export async function db(){
 if(!process.env.MONGODB_URI)throw new Error('MongoDB no está configurado');
 if(!globalDB.mongo){const client=new MongoClient(process.env.MONGODB_URI,{serverSelectionTimeoutMS:8000,connectTimeoutMS:8000});globalDB.mongo=client.connect().catch(async error=>{globalDB.mongo=undefined;await client.close().catch(()=>{});throw error;});}
 return (await globalDB.mongo).db(process.env.MONGODB_DB||'eprofile');
}
