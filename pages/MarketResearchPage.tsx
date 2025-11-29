import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}

const MarketResearchPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setInput('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: input,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "I couldn't find any information on that.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter((c: any) => c.web)
        .map((c: any) => ({ uri: c.web.uri, title: c.web.title }));

      setMessages(prev => [...prev, { role: 'model', text, sources }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error searching for that information." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col h-[calc(100vh-2rem)]">
      <div className="mb-6">
        <h1 className="text-[#111318] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Market Research Agent</h1>
        <p className="text-[#616f89] dark:text-gray-400 text-base">Real-time web search for up-to-date market intelligence.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400 text-center p-8">
            <div>
              <span className="material-symbols-outlined text-4xl mb-2">search</span>
              <p>Ask about current market trends, competitor news, or recent industry events.</p>
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 max-w-[80%]">
                {msg.sources.map((source, sIdx) => (
                  <a 
                    key={sIdx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-full text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span className="material-symbols-outlined text-[10px]">public</span>
                    {source.title || 'Source'}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none p-4 flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          className="w-full h-14 pl-4 pr-14 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
          placeholder="e.g., What are the latest trends in fintech for 2024?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

export default MarketResearchPage;