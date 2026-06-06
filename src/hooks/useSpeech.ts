import { useState } from "react"
const useSpeech = () => {
    const [isSpeaking,setIsSpeaking] = useState(false);
    const speak = (text)=>{
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 0.9;
        utterance.onstart = () =>{
            setIsSpeaking(true);
        }
        utterance.onend = () =>{
            setIsSpeaking(false);
        }
        window.speechSynthesis.speak(utterance);
    }

    const stopSpeaking =()=>{
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }
    
    return {speak,stopSpeaking,isSpeaking};
}

export default useSpeech;