import { useState } from "react";
import 
{ 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from  '../../utils/firebase/firebase.utils'
import FormInput from '../form-input-component/form-input-component'
import './sign-in-styles.scss'
import Button from '../button-component/button-component'


const defaultFormFields={
    email:'',
    password:'',
}

const SignIn=()=>{
    const [formfields,setFormFields]=useState(defaultFormFields);
    const {email,password,}=formfields;

    console.log(formfields)

    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormFields({...formfields,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response =await signInAuthUserWithEmailAndPassword(email,password)
            console.log(response)
            resetFormFields()
        }catch(error){
            if(error.code=='auth/wrong-password'){
                alert('incorrect password for email')
            }else if(error.code=='auth/user-not-found'){
                alert('This user does not exist')
            }
            console.log(error)
        }
    }
    const signInWithGoogle=async()=>{
        const {user} =await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
      }

    return(
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
                </form>
        </div>
    )
}

export default SignIn;