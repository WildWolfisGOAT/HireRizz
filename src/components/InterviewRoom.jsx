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

    return (
        <div className="interview-room">
            {/* Header */}
            <div className="interview-header">
                <div className="interview-status">
                    <span className={`status-dot ${phase}`}></span>
                    <span className="status-text">{getStatusText()}</span>
                </div>
                <div className="interview-meta">
                    <span className="question-count">Q{questionCount}/10</span>
                    {phase !== PHASES.ENDED && (
                        <button className="end-btn" onClick={endInterview}>
                            End Interview
                        </button>
                    )}
                </div>
            </div>
            {/* Transcript Area */}
            <div className="transcript-area">
                {conversationLog.map((entry, index) => (
                    <div key={index} className={`message ${entry.role}`}>
                        <span className="message-label">
                            {entry.role === "assistant" ? "🎙️ Mr. Stone" : "🧑 You"}
                        </span>
                        <p className="message-text">{entry.text}</p>
                    </div>
                ))}
                {/* Show live transcript while user is speaking */}
                {isListening && (transcript || interimText) && (
                    <div className="message user live">
                        <span className="message-label">🧑 You</span>
                        <p className="message-text">
                            {transcript}
                            <span className="interim">{interimText}</span>
                        </p>
                    </div>
                )}
                <div ref={transcriptEndRef} />
            </div>
            {/* Controls */}
            <div className="interview-controls">
                {/* Errors */}
                {(groqError || micError) && (
                    <div className="error-banner">
                        {groqError || micError}
                    </div>
                )}
                {phase === PHASES.LISTENING && (
                    <button
                        className={`mic-btn ${isListening ? "recording" : ""}`}
                        onClick={submitAnswer}
                        disabled={!transcript.trim()}
                    >
                        {isListening ? "🛑 Send Answer" : "🎤"}
                    </button>
                )}
                {phase === PHASES.PROCESSING && (
                    <div className="processing-indicator">
                        <span className="spinner"></span> Processing...
                    </div>
                )}
                {phase === PHASES.ENDED && (
                    <div className="ended-message">
                        <h2>Interview Complete!</h2>
                        <p>You answered {questionCount} questions.</p>
                    </div>
                )}
            </div>
        </div>
    );

}

export default InterviewRoom
