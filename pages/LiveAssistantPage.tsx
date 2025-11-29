import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// Simple base64 encode/decode
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): any {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const LiveAssistantPage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [error, setError] = useState<string | null>(null);
  
  // Refs for audio handling
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const currentSessionRef = useRef<any>(null);

  // Canvas ref for visualizer (placeholder for now)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startSession = async () => {
    setError(null);
    setStatus('connecting');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      if (!process.env.API_KEY) {
        throw new Error("API Key is missing. Please set it in the environment.");
      }

      // Init Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      // Get Mic Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            setStatus('connected');
            setIsActive(true);

            // Setup Mic Streaming
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio) {
              const ctx = outputAudioContextRef.current;
              if (!ctx) return;

              // Move playhead forward if fell behind
              const now = ctx.currentTime;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);

              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                ctx,
                24000,
                1
              );

              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              // Stop all currently playing sources
              sourcesRef.current.forEach(src => src.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            console.log('Gemini Live Session Closed');
            setStatus('disconnected');
            setIsActive(false);
          },
          onerror: (err) => {
            console.error('Gemini Live Error:', err);
            setError('Connection error occurred.');
            setStatus('disconnected');
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are a highly intelligent sales assistant named "Intel". Help the user with market research, competitor analysis, and sales strategies. Be concise, professional, yet conversational.',
        }
      });

      sessionPromiseRef.current = sessionPromise;
      currentSessionRef.current = await sessionPromise;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start session.");
      setStatus('disconnected');
    }
  };

  const stopSession = async () => {
    if (currentSessionRef.current) {
      try {
        // There isn't a direct 'close' method on the session object in the examples, 
        // but typically you'd close the websocket or contexts.
        // For now, let's close audio contexts which stops processing.
        if (inputAudioContextRef.current) await inputAudioContextRef.current.close();
        if (outputAudioContextRef.current) await outputAudioContextRef.current.close();
        
        // Reloading the page or proper cleanup logic if SDK supports session.close()
        // Assuming session.close exists or just letting it drop.
        // The example says `session.close()` in "Live API Rules", so let's try it.
        if (typeof currentSessionRef.current.close === 'function') {
            currentSessionRef.current.close();
        }
      } catch (e) {
        console.warn("Error stopping session", e);
      }
    }
    
    setIsActive(false);
    setStatus('disconnected');
    inputAudioContextRef.current = null;
    outputAudioContextRef.current = null;
    currentSessionRef.current = null;
    nextStartTimeRef.current = 0;
    sourcesRef.current.clear();
  };

  // Visualizer Animation Loop (Simple pulsing for now)
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (isActive) {
            // Draw a pulsing circle
            const time = Date.now() / 1000;
            const radius = 50 + Math.sin(time * 5) * 10;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#135bec';
            ctx.fill();
          }
          animationFrameId = requestAnimationFrame(draw);
        };
        draw();
      }
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return (
    <div className="max-w-7xl mx-auto p-8 h-full flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-3">Live Sales Assistant</h1>
        <p className="text-[#616f89] dark:text-gray-400 text-lg">Have a real-time voice conversation with your sales intel.</p>
      </div>

      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 shadow-xl mb-12">
        <canvas ref={canvasRef} width={300} height={300} className="absolute inset-0 w-full h-full" />
        
        {status === 'disconnected' && (
          <button 
            onClick={startSession}
            className="z-10 w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl">mic</span>
          </button>
        )}

        {status === 'connecting' && (
          <div className="z-10 w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-4xl text-gray-500">settings_ethernet</span>
          </div>
        )}

        {status === 'connected' && (
          <button 
            onClick={stopSession}
            className="z-10 w-24 h-24 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl">stop</span>
          </button>
        )}
      </div>

      <div className="text-center">
        {status === 'connected' && <p className="text-green-600 font-bold animate-pulse">Listening & Speaking...</p>}
        {status === 'connecting' && <p className="text-gray-500">Connecting to Gemini Live...</p>}
        {status === 'disconnected' && <p className="text-gray-500">Click the microphone to start.</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LiveAssistantPage;