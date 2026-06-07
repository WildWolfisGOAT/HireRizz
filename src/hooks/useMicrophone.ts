import { useCallback, useEffect, useRef, useState } from "react";

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const useMicrophone = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");
    const [interimText, setInterimText] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const isSupported = !!SpeechRecognition;
    const recognitionRef = useRef<any>(null);
    const manualStopRef = useRef<boolean>(false);


    useEffect(()=>{
        if(!isSupported) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any)=>{
            let finalText = "";
            let currentInterimText = "";

            for(let i = event.resultIndex; i<event.results.length;i++){
                const resultTranscipt = event.results[i][0].transcript;
                if(event.results[i].isFinal){
                    finalText+= resultTranscipt + " ";
                }else{
                    currentInterimText += resultTranscipt;
                }
            }
            
            if(finalText){
                setTranscript((prev)=> prev+finalText);
            }
            setInterimText(currentInterimText);
        };

        recognition.onerror = (event: any) => {
            if(event.error === "no-speech") return;
            if(event.error === "not-allowed"){
                setError("Microphone Permission is denied. Please allow mic access.");
            }else if(event.error==="aborted"){
                return;
            }else{
                setError(`Speech Recognition error: ${event.error}`);
            }
            setIsListening(false);
        };

        recognition.onend = () =>{
            if(!manualStopRef.current){
                try{
                    recognition.start();
                } catch{
                    setIsListening(false);
                }
            }else{
                setIsListening(false);
            }
        };

        recognitionRef.current = recognition;

        return () => {
            manualStopRef.current = true;
            recognition.stop();
            recognitionRef.current = null;
        };


    },[isSupported]);

    const startListening = useCallback(()=>{
        if(!isSupported || !recognitionRef.current) return;
        setError(null);
        setTranscript("");
        setInterimText("");
        manualStopRef.current = false;
        try{
            recognitionRef.current.start();
            setIsListening(true);
        }catch (e: any){
            if(e.name !== "InvalidStateError"){
                setError(e.message);
            }
        }
    },[isSupported]);

    const stopListening = useCallback(()=>{
        if(!recognitionRef.current) return;
        manualStopRef.current = true;
        recognitionRef.current.stop();
        setIsListening(false);
        setInterimText("");
    },[]);

    const resetTranscript = useCallback(()=>{
        setTranscript("");
        setInterimText("");
        setError(null);
    },[]);

    return {
        isListening,transcript,interimText, isSupported,error,startListening,stopListening,resetTranscript,
    };
};

export default useMicrophone;