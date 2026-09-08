import AuthForm from '@/components/auth-form';
export default function Login(){return <AuthForm demo={!process.env.MONGODB_URI}/>;}
