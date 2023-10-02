import { useState } from "react";
import { creatAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from  '../../utils/firebase/firebase.utils'
import FormInput from '../form-input-component/form-input-component'
import './sign-up-styles.scss'
import Button from '../button-component/button-component'


const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUp=()=>{
    const [formfields,setFormFields]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formfields;

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
        if(password !==confirmPassword){
            alert("password dos not maching")
            return
        }
        try{
            const {user}=await creatAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields()
        }catch(error){
            if(error.code==="auth/email-already-in-use"){
                alert('email alredy in use')
            }else{
                console.log("error",error)
            }
            
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Dont have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type="text" required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUp;