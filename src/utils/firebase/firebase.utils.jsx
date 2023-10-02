import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDIWCpLK4ne1QEbUVozrWsGjW9KF_I-2jM",
    authDomain: "fir-test-e90ea.firebaseapp.com",
    projectId: "fir-test-e90ea",
    storageBucket: "fir-test-e90ea.appspot.com",
    messagingSenderId: "413947030283",
    appId: "1:413947030283:web:a7b3016b6f72a821e4d00e"
};
  
  
const firebaseApp = initializeApp(firebaseConfig);

const provider=new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);
//sign in with redirect usulu
export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,provider);

export const db=getFirestore();


//bu databazada istifadecinin olub olmadigini yoxlayan ve yoxsa database e istifadecini elave eden koddur
export const createUserDocumentFromAuth=async (userAuth ,additionalInformation={})=>{
    if(!userAuth)return;
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    //snapshot userdoc refden yeni databaseden istifadecinin var olub olmadigi ile
    //bagli melumati alir (getdoc ile)
    const userSnapshot=await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //var olmayan istifadeci ucun kod
    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth;
        const createdAt=new Date();

        //bu istifadeci yoxdursa userauthdan istifadeci adini ve meailini createdatdan ise yaradildigi zamani alir
        //belelikle yeni bir istifadecini setdoc ile yaradir
        try{
            await setDoc(userDocRef,{
                displayName,email,createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log("error creating th user", error.message);    
        }
        //eger istifadeci varsa onda birbasa userdoc refi (movcud olan istifadecini)
        //birbasa qaytarir returrn
        return userDocRef;
    }
}

export const creatAuthUserWithEmailAndPassword = async(email,password)=>{
   if(!email || !password) return;
   return await createUserWithEmailAndPassword(auth,email,password);
}
export const signInAuthUserWithEmailAndPassword = async(email,password)=>{
    if(!email || !password) return;
    return await signInAuthUserWithEmailAndPassword(auth,email,password);
 }