import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout"
import { useState } from "react";
import { API_URL } from "../auth/constants";
import type { AuthResponseError } from "../types/types";

export default function Login(){
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [errorResponse,setErrorResponse]=useState("");
    const auth=useAuth();
    const goTo=useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            const response=await fetch(`${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                }

                )
            });


            if(response.ok){
                console.log("user created succesfully");
                setErrorResponse("");
                goTo("/")
            }else{
                console.log("Something wenr wrong");
                const json =await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch(error){
            console.log(error);
        }


    }




    if(auth.isAuthenticated){
        return  <Navigate to="/dashboard" />
    }

    return (
        <DefaultLayout>

        
            <form className="form" onSubmit={handleSubmit}>
                {/*FORMULARIO LOGIN*/}
                <h1>Login</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <label htmlFor="">Username</label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/> 

                <label htmlFor="" >Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <button>Login</button>
            </form>
         </DefaultLayout>
    );
}