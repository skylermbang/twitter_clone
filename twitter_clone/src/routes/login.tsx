import { signInWithEmailAndPassword} from "firebase/auth";
import React, { useState } from "react";

import { auth } from "../firebase";
import { useNavigate ,Link} from "react-router-dom";
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
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");

    const[error, setError]=useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {target: {name,value}} = e;
         if(name=== "password"){
            setPassword(value)
        }else if(name === "email"){
            setEmail(value)
        }
    };
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();
        setError("");
        console.log( password,email)
        if(isLoading|| email===""||password==="")return;
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth,email,password)
            //redirect to home
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
        <Title> Login X</Title>

        <Form onSubmit={onSubmit} >

            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="password" type="password" required/>
            <Input type="submit" value={isLoading? "Loading..." :"Login"  }/>
            
        </Form>
        {error !=="" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account ?  <Link to="/createAccount"> Create One &rarr;</Link>
        </Switcher>
    </Wrapper>
}