import useMicrophone from "./useMicrophone";
import useGroq from "./useGroq";
import useSpeech from "./useSpeech";
import buildSystemPrompt from "./utils/PromptBuilder";
import { useCallback, useEffect, useRef, useState } from "react";

const PHASES = {
    IDLE : "idle",
    GREETING : "greeting",
    ASKING : "asking",
    LISTENING : "listening",
    PROCESSING : "processing",
    ENDED : "ended",
};

const useInterviewSession = () =>{
    const [phase,setPhase] = useState(PHASES.IDLE);
    const [message,setMessage] = useState([]);
    const [questionCount , setQuestionCount] = useState(0);
    const [currentAIText, setCurrentAIText] = useState("");
    const [conversationLog, setConversationLog] = useState([]);

    const {sendMessages, isLoading, error: groqError} = useGroq();
    const {speak,stopSpeaking,isSpeaking} = useSpeech();
    const {startListening,stopListening,transcript,interimText,isListening,isSupported,error:micError} = useMicrophone();

    const shouldListenAfterSpeakRef = useRef(false);

    useEffect(()=>{
        if(!isSpeaking && shouldListenAfterSpeakRef.current && phase === PHASES.ASKING){
            shouldListenAfterSpeakRef.current = false;
            setPhase(PHASES.LISTENING);
            startListening();
        }
    },[isSpeaking,phase,startListening]);

    const getAIResponse = useCallback(async(updatedMessages) => {
        const aiText = await sendMessages(updatedMessages);

        if(!aiText) return null;

        const newMessages = [...updatedMessages,{role: "assistant", content: aiText}];
        setMessage(newMessages);

        setConversationLog((prev)=>[...prev,{
            role : "assistant", text: aiText
        }]);
        setCurrentAIText(aiText);
        setQuestionCount((prev)=> prev+1);
        return aiTextl
    },[sendMessages]);

    const startInterview = useCallback(async(formData)=>{
        const systemPrompt = buildSystemPrompt(formData);
        const initialMessages = [
            {
                role : "system", content: systemPrompt
            },
            {
                role : "user", content: "Hello,I'm ready for the interview."
            },
        ];

        setPhase(PHASES.GREETING);
        setMessage(initialMessages);

        const aiText = await getAIResponse(initialMessages);

        if(aiText){
            setPhase(PHASES.ASKING);
            shouldListenAfterSpeakRef.current= true;
            speak(aiText);
        }
    },[getAIResponse,speak]);

    


    
}