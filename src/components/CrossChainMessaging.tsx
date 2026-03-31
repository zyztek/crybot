import React from 'react';
import { MessageSquare, Send, ArrowRight, Shield, Zap, Activity, LogOut } from 'lucide-react';

interface Message {
  id: string;
  type: 'sent' | 'received';
  sourceChain: string;
  targetChain: string;
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
  timestamp: string;
  fee: string;
}

const templates = {
  es: {
    title: 'Cross-Chain Messaging',
    subtitle: 'Envía mensajes entre blockchains de forma segura',
    send: 'Enviar Mensaje',
    from: 'Desde',
    to: 'Hacia',
    message: 'Mensaje',
    fee: 'Fee Estimado',
    sending: 'Enviando...',
    sent: 'Enviado',
    history: 'Historial',
    status: {
      pending: 'Pendiente',
      completed: 'Completado',
      failed: 'Fallido',
    },
    viewTx: 'Ver Tx',
    totalMessages: 'Total Mensajes',
    crossChainChains: 'Cadenas Cross-Chain',
    pending: 'Pendientes',
    completedRate: 'Tasa de Éxito',
  },
  en: {
    title: 'Cross-Chain Messaging',
    subtitle: 'Send messages across blockchains securely',
    send: 'Send Message',
    from: 'From',
    to: 'To',
    message: 'Message',
    fee: 'Estimated Fee',
    sending: 'Sending...',
    sent: 'Sent',
    history: 'History',
    status: {
      pending: 'Pending',
      completed: 'Completed',
      failed: 'Failed',
    },
    viewTx: 'View Tx',
    totalMessages: 'Total Messages',
    crossChainChains: 'Cross-Chain Chains',
    pending: 'Pending',
    completedRate: 'Success Rate',
  },
};

export default function CrossChainMessaging() {
  const [isSpanish, setIsSpanish] = React.useState(true);
  const text = templates[isSpanish ? 'es' : 'en'];
  const [sourceChain, setSourceChain] = React.useState('ethereum');
  const [targetChain, setTargetChain] = React.useState('arbitrum');
  const [message, setMessage] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [estimatedFee, setEstimatedFee] = React.useState('0.002 ETH');

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      type: 'sent',
      sourceChain: 'ethereum',
      targetChain: 'arbitrum',
      status: 'completed',
      txHash: '0x1a2b3c4d5e6f...',
      timestamp: '10 min ago',
      fee: '0.0021 ETH',
    },
    {
      id: '2',
      type: 'sent',
      sourceChain: 'ethereum',
      targetChain: 'polygon',
      status: 'completed',
      txHash: '0x7f8e9d0c1b2a...',
      timestamp: '25 min ago',
      fee: '0.0018 MATIC',
    },
    {
      id: '3',
      type: 'received',
      sourceChain: 'optimism',
      targetChain: 'ethereum',
      status: 'completed',
      txHash: '0x3d4e5f6a7b8c...',
      timestamp: '1 hour ago',
      fee: '0.0035 ETH',
    },
    {
      id: '4',
      type: 'sent',
      sourceChain: 'arbitrum',
      targetChain: 'bnb',
      status: 'pending',
      txHash: 'Pending...',
      timestamp: '5 min ago',
      fee: '0.05 BNB',
    },
  ]);

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔵' },
    { id: 'optimism', name: 'Optimism', icon: '🔴' },
    { id: 'polygon', name: 'Polygon', icon: '🟣' },
    { id: 'bnb', name: 'BNB Chain', icon: '🟡' },
    { id: 'avalanche', name: 'Avalanche', icon: '🔺' },
  ];

  const send = () => {
    if (!message.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'sent',
        sourceChain,
        targetChain,
        status: 'completed',
        txHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        timestamp: 'Just now',
        fee: estimatedFee,
      };
      setMessages([newMessage, ...messages]);
      setMessage('');
      setIsSending(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-600/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            {text.title}
          </h1>
          <p className="text-gray-400">{text.subtitle}</p>
        </div>
        <button
          onClick={() => setIsSpanish(!isSpanish)}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors"
        >
          {isSpanish ? '🇺🇸 EN' : '🇪🇸 ES'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Send className="w-6 h-6 text-blue-400" />
            <span className="text-gray-400 text-sm">{text.totalMessages}</span>
          </div>
          <div className="text-2xl font-bold text-white">1,234</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <ArrowRight className="w-6 h-6 text-purple-400" />
            <span className="text-gray-400 text-sm">{text.crossChainChains}</span>
          </div>
          <div className="text-2xl font-bold text-white">6</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-6 h-6 text-yellow-400" />
            <span className="text-gray-400 text-sm">{text.pending}</span>
          </div>
          <div className="text-2xl font-bold text-white">3</div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-gray-400 text-sm">{text.completedRate}</span>
          </div>
          <div className="text-2xl font-bold text-white">99.8%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Message */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-400" />
            {text.send}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">{text.from}</label>
              <select
                value={sourceChain}
                onChange={e => {
                  setSourceChain(e.target.value);
                  setEstimatedFee(
                    `${Math.random() * 0.01} ${chains.find(c => c.id === e.target.value)?.icon}`
                  );
                }}
                className="w-full bg-slate-700 text-white rounded-lg p-3"
              >
                {chains.map(chain => (
                  <option key={chain.id} value={chain.id}>
                    {chain.icon} {chain.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">{text.to}</label>
              <select
                value={targetChain}
                onChange={e => setTargetChain(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg p-3"
              >
                {chains
                  .filter(c => c.id !== sourceChain)
                  .map(chain => (
                    <option key={chain.id} value={chain.id}>
                      {chain.icon} {chain.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">{text.message}</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-slate-700 text-white rounded-lg p-3 resize-none"
                placeholder={
                  isSpanish ? 'Escribe tu mensaje aquí...' : 'Write your message here...'
                }
              />
            </div>

            <div className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg">
              <span className="text-gray-400">{text.fee}</span>
              <span className="text-yellow-400 font-mono">{estimatedFee}</span>
            </div>

            <button
              onClick={send}
              disabled={!message.trim() || isSending}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  {text.sending}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {text.send}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Message History */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <LogOut className="w-5 h-5 text-purple-400" />
            {text.history}
          </h2>

          <div className="space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`border backdrop-blur-lg rounded-xl p-4 ${getStatusColor(msg.status)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}
                  >
                    {text.status[msg.status]}
                  </span>
                  <span className="text-gray-500 text-sm">{msg.timestamp}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white">
                    {chains.find(c => c.id === msg.sourceChain)?.icon}{' '}
                    {chains.find(c => c.id === msg.sourceChain)?.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="text-white">
                    {chains.find(c => c.id === msg.targetChain)?.icon}{' '}
                    {chains.find(c => c.id === msg.targetChain)?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <code className="text-gray-400 text-sm">{msg.txHash}</code>
                  <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                    {text.viewTx} <Zap className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-gray-500 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Fee: {msg.fee}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
