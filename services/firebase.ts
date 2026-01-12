
import { initializeApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';

// Credenciais removidas para versão Demo
const firebaseConfig = {
  apiKey: "DEMO_MODE",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "000000000000",
  appId: "0:000000000000:web:demo"
};

// O banco de dados é mantido como null para forçar o sistema a usar o LocalStorage (Modo Offline/Demo)
let db: Firestore | null = null;

export { db };
