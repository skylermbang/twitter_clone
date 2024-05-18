import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {styled} from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    height:100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width: 420px;
    padding: 50px 0px;
        

`;


const Form =styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap:10px;
    width:100%;

`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Title =styled.h1`
    font-size:42px;
`;

const Error = styled.span`
    font-weight:600;
    color:tomato;
`

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
            //error
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
    </Wrapper>
}