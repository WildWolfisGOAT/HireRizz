import { useState } from "react";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

const useGroq=()=>{
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const sendMessages = async (messages)=>{
        setIsLoading(true);
        try{
            const response = await fetch(GROQ_URL, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model:"llama-3.1-70b-versatile",
                messages:messages
            })
            }     
            )
            const data =await response.json();
            return data.choices[0].message.content;
        }catch(e){
            setError(e.message)
        }finally{
            setIsLoading(false);
        }
        
    }
    return {error,isLoading,sendMessages}

}

export default useGroq;