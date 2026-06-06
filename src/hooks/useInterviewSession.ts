import useMicrophone from "./useMicrophone";
import useGroq from "./useGroq";
import useSpeech from "./useSpeech";
import buildSystemPrompt from "../utils/PromptBuilder";
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
    const [messages,setMessages] = useState([]);
    const [questionCount , setQuestionCount] = useState(0);
    const [currentAIText, setCurrentAIText] = useState("");
    const [conversationLog, setConversationLog] = useState([]);

    const {sendMessages, isLoading, error: groqError} = useGroq();
    const {speak,stopSpeaking,isSpeaking} = useSpeech();
    const {startListening,stopListening,transcript,interimText,isListening,isSupported,error:micError} = useMicrophone();

    const shouldListenAfterSpeakRef = useRef(false);
    const hasStartedRef = useRef(false);
    const wasSpeakingRef = useRef(false);

    useEffect(()=>{
        if(isSpeaking){
            wasSpeakingRef.current=true;
        }
    },[isSpeaking]);


    useEffect(()=>{
        if(!isSpeaking && wasSpeakingRef.current && shouldListenAfterSpeakRef.current && phase === PHASES.ASKING){
            wasSpeakingRef.current = false;
            shouldListenAfterSpeakRef.current = false;
            setPhase(PHASES.LISTENING);
            startListening();
        }
    },[isSpeaking,phase,startListening]);

    const getAIResponse = useCallback(async(updatedMessages) => {
        const aiText = await sendMessages(updatedMessages);

        if(!aiText) return null;

        const newMessages = [...updatedMessages,{role: "assistant", content: aiText}];
        setMessages(newMessages);

        setConversationLog((prev)=>[...prev,{
            role : "assistant", text: aiText
        }]);
        setCurrentAIText(aiText);
        setQuestionCount((prev)=> prev+1);
        return aiText;
    },[sendMessages]);

    const startInterview = useCallback(async(formData)=>{

        if (hasStartedRef.current) return;  
        hasStartedRef.current = true;

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
        setMessages(initialMessages);

        const aiText = await getAIResponse(initialMessages);

        if(aiText){
            setPhase(PHASES.ASKING);
            shouldListenAfterSpeakRef.current= true;
            speak(aiText);
        }
    },[getAIResponse,speak]);

    
    const submitAnswer = useCallback(async ()=>{
        if(!transcript.trim()){
            return;
        }
        stopListening();

        const userMessage = {role:"user", content: transcript.trim()};

        const updatedMessages = [...messages,userMessage];
        setMessages(updatedMessages);
        setConversationLog((prev)=>[...prev,{role:"user",text:transcript.trim()}]);

        setPhase(PHASES.PROCESSING);
        const aiText = await getAIResponse(updatedMessages);
        if (aiText) {
            setPhase(PHASES.ASKING);
            shouldListenAfterSpeakRef.current = true;
            speak(aiText);
        }
    }, [transcript, stopListening, messages, getAIResponse, speak]);

    const endInterview = useCallback(() => {
        stopListening();
        stopSpeaking();
        setPhase(PHASES.ENDED);
    }, [stopListening, stopSpeaking]);

    return {
        // State
        phase,
        conversationLog,
        currentAIText,
        questionCount,
        // Live mic data
        transcript,
        interimText,
        isListening,
        // Status flags
        isLoading,
        isSpeaking,
        isSupported,
        // Errors
        groqError,
        micError,
        // Actions
        startInterview,
        submitAnswer,
        endInterview,
        PHASES,
    };

    
};

export default useInterviewSession;
