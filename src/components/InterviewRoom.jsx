import React, { useEffect, useRef } from 'react';
import useInterviewSession from '../hooks/useInterviewSession';

const InterviewRoom = ({formData}) => {
  const {
        phase,
        conversationLog,
        currentAIText,
        questionCount,
        transcript,
        interimText,
        isListening,
        isLoading,
        isSpeaking,
        isSupported,
        groqError,
        micError,
        startInterview,
        submitAnswer,
        endInterview,
        PHASES,
    } = useInterviewSession();

    const transcriptEndRef = useRef(null);

    useEffect(()=>{
       transcriptEndRef.current?.scrollIntoView({behavior:"smooth"});
    },[conversationLog,interimText]);

    useEffect(()=>{
      if(formData && phase === PHASES.IDLE){
        startInterview(formData);
      }
    },[formData,phase,PHASES.IDLE,startInterview,]);

    const getStatusText = () => {
        switch (phase) {
            case PHASES.GREETING: return "Starting interview...";
            case PHASES.ASKING: return "Mr. Stone is speaking...";
            case PHASES.LISTENING: return "Your turn — speak now";
            case PHASES.PROCESSING: return "Thinking...";
            case PHASES.ENDED: return "Interview ended";
            default: return "";
        }
    };

    if (!isSupported) {
        return (
            <div className="interview-room">
                <div className="unsupported-msg">
                    <h2>Browser Not Supported</h2>
                    <p>Speech recognition requires Chrome or Edge. Please switch browsers.</p>
                </div>
            </div>
        );
    }
}

export default InterviewRoom
