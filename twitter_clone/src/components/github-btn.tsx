import {styled} from "styled-components";
import {GithubAuthProvider,signInWithPopup} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top:20px;
    color:black;
    background-color:white;
    font-weight:600; 
    display:flex;
    border:0;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    display:flex;
    gap:5px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    cursor:pointer;

`

const Logo = styled.img`
    height:25px;
`


export default function GithubButton(){
    const navigate = useNavigate()
    const onClick=async ()=>{
        const provider= new GithubAuthProvider();
        try{        
            await signInWithPopup(auth, provider);
            navigate("/")
        }
        catch(error){
            console.log(error)
        }

    }
    return ( <Button onClick={onClick}>
        <Logo src="/github-logo.svg" />
       Continue with Github    
   </Button>)
}