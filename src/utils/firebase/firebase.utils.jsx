import  {initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGehkoKbORBRNYzIu0JzteRe-9ZVZPJlk",
    authDomain: "e-ticaret-c849c.firebaseapp.com",
    projectId: "e-ticaret-c849c",
    storageBucket: "e-ticaret-c849c.appspot.com",
    messagingSenderId: "123042666414",
    appId: "1:123042666414:web:e49ed52b471cb9d9ce5a3f"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider=new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth =getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);

  export const db=getFirestore();

  export const createUserDocumentFromAuth=async(userAuth)=>{
    const userDocRef=doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot=await getDoc(userDocRef);
    console.log(userSnapshot)

    if(!userSnapshot.exists()){
      const {displayName, email}=userAuth;
      const createAt=new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt
        });
      }catch (error){
        console.log('error creating  the user', error.message)
      }
    }
    return userDocRef;
  }