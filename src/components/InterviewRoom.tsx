import { useEffect, useRef } from 'react';
import useInterviewSession from '../hooks/useInterviewSession';
import { InterviewFormData } from '../App';

import { useLocation } from 'react-router-dom';

const InterviewRoom = () => {
    const location = useLocation();
    const formData = location.state?.formData as InterviewFormData;
    
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

    const transcriptEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversationLog, interimText]);

    useEffect(() => {
        if (formData && phase === PHASES.IDLE) {
            startInterview(formData);
        }
    }, [formData, phase, PHASES.IDLE, startInterview]);

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
            <div className="w-full max-w-[800px] h-[85vh] flex flex-col bg-cream border-2 border-retro-green rounded-2xl shadow-retro overflow-hidden animate-[fadeInUp_0.6s_ease] m-auto justify-center items-center">
                <div className="text-center">
                    <h2 className="text-2xl font-heading font-extrabold text-retro-green">Browser Not Supported</h2>
                    <p className="text-retro-green-light">Speech recognition requires Chrome or Edge. Please switch browsers.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[800px] h-[85vh] flex flex-col bg-cream border-2 border-retro-green rounded-2xl shadow-retro overflow-hidden animate-[fadeInUp_0.6s_ease] m-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:px-6 border-b-2 border-retro-green bg-white">
                <div className="flex items-center gap-3">
                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-retro-green bg-white transition-colors duration-250 
                        ${(phase === PHASES.GREETING || phase === PHASES.PROCESSING) ? 'bg-retro-yellow animate-pulse' : ''}
                        ${phase === PHASES.ASKING ? 'bg-retro-green' : ''}
                        ${phase === PHASES.LISTENING ? 'bg-retro-orange animate-pulse' : ''}
                        ${phase === PHASES.ENDED ? 'bg-[#dcd7c9] border-[#dcd7c9]' : ''}
                    `}></span>
                    <span className="text-base font-heading text-retro-green font-bold">{getStatusText()}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-retro-green font-semibold bg-retro-yellow px-3 py-1 rounded-full border-2 border-retro-green">Q{questionCount}/10</span>
                    {phase !== PHASES.ENDED && (
                        <button className="px-4 py-2 text-sm font-body font-semibold text-retro-red bg-transparent border-2 border-retro-red rounded-full cursor-pointer transition-all hover:bg-retro-red hover:text-white" onClick={endInterview}>
                            End Interview
                        </button>
                    )}
                </div>
            </div>

            {/* Transcript Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 bg-cream">
                {conversationLog.map((entry, index) => (
                    <div key={index} className={`max-w-[80%] animate-[fadeInUp_0.3s_ease] flex flex-col ${entry.role === 'assistant' ? 'self-start' : 'self-end'}`}>
                        <span className={`block font-heading text-sm font-bold mb-2 ${entry.role === 'assistant' ? 'text-retro-green-light' : 'text-retro-orange text-right'}`}>
                            {entry.role === "assistant" ? "Mr. Stone" : "You"}
                        </span>
                        <p className={`px-5 py-4 text-base leading-relaxed text-retro-green border-2 border-retro-green rounded-2xl shadow-retro-sm ${entry.role === 'assistant' ? 'bg-white' : 'bg-cream'}`}>
                            {entry.text}
                        </p>
                    </div>
                ))}

                {/* Show live transcript while user is speaking */}
                {isListening && (transcript || interimText) && (
                    <div className="max-w-[80%] animate-[fadeInUp_0.3s_ease] flex flex-col self-end">
                        <span className="block font-heading text-sm font-bold mb-2 text-retro-orange text-right">You</span>
                        <p className="px-5 py-4 text-base leading-relaxed text-retro-green border-2 border-dashed border-retro-green rounded-2xl bg-transparent">
                            {transcript}
                            <span className="text-retro-green-light italic ml-1">{interimText}</span>
                        </p>
                    </div>
                )}
                <div ref={transcriptEndRef} />
            </div>

            {/* Controls */}
            <div className="p-6 border-t-2 border-retro-green bg-white flex items-center justify-center gap-4 min-h-[100px]">
                {/* Errors */}
                {(groqError || micError) && (
                    <div className="w-full px-4 py-3 bg-red-50 border-2 border-retro-red rounded-lg text-retro-red font-semibold text-center">
                        {groqError || micError}
                    </div>
                )}

                {phase === PHASES.LISTENING && (
                    <button
                        className={`w-16 h-16 rounded-full border-2 border-retro-green font-bold text-xl cursor-pointer transition-all flex items-center justify-center shadow-retro disabled:bg-[#dcd7c9] disabled:border-[#dcd7c9] disabled:text-white disabled:shadow-none disabled:cursor-not-allowed
                            ${isListening ? "bg-retro-orange text-white" : "bg-retro-yellow text-retro-green hover:-translate-y-0.5 hover:shadow-retro-hover"}
                        `}
                        onClick={submitAnswer}
                        disabled={!transcript.trim()}
                    >
                        {isListening ? "Stop" : "Mic"}
                    </button>
                )}

                {phase === PHASES.PROCESSING && (
                    <div className="flex items-center gap-3 font-heading text-retro-green text-base font-bold">
                        <span className="w-6 h-6 border-4 border-[#dcd7c9] border-t-retro-green rounded-full animate-spin"></span> Processing...
                    </div>
                )}

                {phase === PHASES.ENDED && (
                    <div className="text-center">
                        <h2 className="font-heading text-2xl text-retro-green font-extrabold mb-2">Interview Complete!</h2>
                        <p className="text-retro-green-light">You answered {questionCount} questions.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InterviewRoom;
