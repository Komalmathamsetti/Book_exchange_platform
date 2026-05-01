import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/Auth";
const firebaseConfig = {
    apikey: "",
    authDomain:"",
    projectId:"",
    appId:""
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
