import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate,Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
    Error,
    Form,
    Input,
    Switcher,
    Title,
    Wrapper,
  } from "../components/auth-component";

export default function CreateAccount (){
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");

    const[error, setError]=useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {target: {name,value}} = e;
        if(name === "name"){
            setName(value)
        }else if(name=== "password"){
            setPassword(value)
        }else if(name === "email"){
            setEmail(value)
        }
    };
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();
        setError("");
        console.log( name,password,email)
        if(isLoading||name===""|| email===""||password==="")return;
        try{
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );            //create account
            //set the name of the user
            //redirect to home
            await updateProfile(credentials.user,{
                displayName:name,
            
            });
            
            navigate("/")
        }catch(e){
            if(e instanceof FirebaseError){
                console.log(e.code, e.message)
                setError(e.message)
            }
        }
        finally{
            setLoading(false )
        }

    }
    return <Wrapper>
        <Title> Join X</Title>

        <Form onSubmit={onSubmit} >

            <Input onChange={onChange} name="name"  value={name} placeholder="Name" type="text" required/>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="password" type="password" required/>
            <Input type="submit" value={isLoading? "Loading..." :"Create Account"  }/>
            
        </Form>
        {error !=="" ? <Error>{error}</Error> : null}
        <Switcher>
            Already have an account?  <Link to="/login"> Log in &rarr;</Link>
        </Switcher>
    </Wrapper>
}