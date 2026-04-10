import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, Bot, Settings, Bell, TrendingUp, Shield, DollarSign, Users, CheckCircle, AlertCircle, Zap, Lock } from 'lucide-react';

interface BotCommand {
  id: string;
  name: string;
  description: string;
  command: string;
  category: 'portfolio' | 'trading' | 'alerts' | 'utility' | 'security';
  enabled: boolean;
  usage: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  command?: string;
}

interface BotUser {
  id: string;
  username: string;
  firstName: string;
  isActive: boolean;
  lastActive: string;
  commandsUsed: number;
  subscription: 'free' | 'premium' | 'enterprise';
}

interface Alert {
  id: string;
  type: 'price' | 'portfolio' | 'trade' | 'security';
  message: string;
  enabled: boolean;
  chatId: string;
}

export const TelegramBot: React.FC = () => {
  const [commands, setCommands] = useState<BotCommand[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<BotUser[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'commands' | 'chat' | 'users' | 'alerts'>('commands');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchBotData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockCommands: BotCommand[] = [
          {
            id: 'portfolio',
            name: 'Portfolio',
            description: 'View your current portfolio status',
            command: '/portfolio',
            category: 'portfolio',
            enabled: true,
            usage: 15230
          },
          {
            id: 'price',
            name: 'Price Check',
            description: 'Get current price of any cryptocurrency',
            command: '/price',
            category: 'trading',
            enabled: true,
            usage: 28450
          },
          {
            id: 'buy',
            name: 'Buy Crypto',
            description: 'Execute a buy order',
            command: '/buy',
            category: 'trading',
            enabled: true,
            usage: 8230
          },
          {
            id: 'sell',
            name: 'Sell Crypto',
            description: 'Execute a sell order',
            command: '/sell',
            category: 'trading',
            enabled: true,
            usage: 7890
          },
          {
            id: 'alert',
            name: 'Set Alert',
            description: 'Set price alerts for cryptocurrencies',
            command: '/alert',
            category: 'alerts',
            enabled: true,
            usage: 12450
          },
          {
            id: 'balance',
            name: 'Balance',
            description: 'Check your account balance',
            command: '/balance',
            category: 'portfolio',
            enabled: true,
            usage: 18920
          },
          {
            id: 'help',
            name: 'Help',
            description: 'Get help and available commands',
            command: '/help',
            category: 'utility',
            enabled: true,
            usage: 23450
          },
          {
            id: 'settings',
            name: 'Settings',
            description: 'Configure bot preferences',
            command: '/settings',
            category: 'utility',
            enabled: false,
            usage: 3450
          },
          {
            id: 'security',
            name: 'Security',
            description: 'Security settings and 2FA',
            command: '/security',
            category: 'security',
            enabled: true,
            usage: 5670
          },
          {
            id: 'market',
            name: 'Market Overview',
            description: 'Get market overview and trends',
            command: '/market',
            category: 'trading',
            enabled: true,
            usage: 12780
          },
          {
            id: 'history',
            name: 'Trade History',
            description: 'View your recent trades',
            command: '/history',
            category: 'portfolio',
            enabled: false,
            usage: 2340
          },
          {
            id: 'news',
            name: 'Crypto News',
            description: 'Latest cryptocurrency news',
            command: '/news',
            category: 'utility',
            enabled: true,
            usage: 8920
          }
        ];

        const mockMessages: ChatMessage[] = [
          {
            id: 'msg-1',
            type: 'user',
            message: '/portfolio',
            timestamp: '2024-01-15T10:30:00Z',
            command: '/portfolio'
          },
          {
            id: 'msg-2',
            type: 'bot',
            message: 'Your current portfolio value is $12,456.78\n\nBTC: 0.234 ($10,523.46)\nETH: 2.45 ($6,933.32)\n\nDaily change: +2.4% ($291.36)',
            timestamp: '2024-01-15T10:30:05Z'
          },
          {
            id: 'msg-3',
            type: 'user',
            message: '/price btc',
            timestamp: '2024-01-15T10:32:00Z',
            command: '/price'
          },
          {
            id: 'msg-4',
            type: 'bot',
            message: 'Current Bitcoin price: $45,234.56\n\n24h change: +2.8%\nVolume: $28.5B\nMarket Cap: $884.2B',
            timestamp: '2024-01-15T10:32:05Z'
          },
          {
            id: 'msg-5',
            type: 'user',
            message: '/alert btc 50000',
            timestamp: '2024-01-15T10:35:00Z',
            command: '/alert'
          },
          {
            id: 'msg-6',
            type: 'bot',
            message: 'Price alert set! I\'ll notify you when Bitcoin reaches $50,000',
            timestamp: '2024-01-15T10:35:05Z'
          }
        ];

        const mockUsers: BotUser[] = [
          {
            id: 'user-1',
            username: 'crypto_trader',
            firstName: 'Alex',
            isActive: true,
            lastActive: '2024-01-15T10:30:00Z',
            commandsUsed: 234,
            subscription: 'premium'
          },
          {
            id: 'user-2',
            username: 'investor_pro',
            firstName: 'Sarah',
            isActive: true,
            lastActive: '2024-01-15T09:45:00Z',
            commandsUsed: 189,
            subscription: 'enterprise'
          },
          {
            id: 'user-3',
            username: 'bitcoin_hodler',
            firstName: 'Mike',
            isActive: false,
            lastActive: '2024-01-14T18:20:00Z',
            commandsUsed: 67,
            subscription: 'free'
          },
          {
            id: 'user-4',
            username: 'defi_enthusiast',
            firstName: 'Emma',
            isActive: true,
            lastActive: '2024-01-15T08:15:00Z',
            commandsUsed: 145,
            subscription: 'premium'
          }
        ];

        const mockAlerts: Alert[] = [
          {
            id: 'alert-1',
            type: 'price',
            message: 'BTC reached $45,000',
            enabled: true,
            chatId: 'chat-1'
          },
          {
            id: 'alert-2',
            type: 'portfolio',
            message: 'Portfolio up 5% today',
            enabled: true,
            chatId: 'chat-2'
          },
          {
            id: 'alert-3',
            type: 'trade',
            message: 'ETH buy order filled',
            enabled: false,
            chatId: 'chat-1'
          },
          {
            id: 'alert-4',
            type: 'security',
            message: 'New login detected',
            enabled: true,
            chatId: 'chat-3'
          }
        ];

        setCommands(mockCommands);
        setMessages(mockMessages);
        setUsers(mockUsers);
        setAlerts(mockAlerts);
      } catch (error) {
        console.error('Error fetching bot data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBotData();
  }, []);

  const handleToggleCommand = async (commandId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCommands(prev => prev.map(command => 
        command.id === commandId 
          ? { ...command, enabled: !command.enabled }
          : command
      ));
    } catch (error) {
      console.error('Error toggling command:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        type: 'bot',
        message: generateBotResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('/portfolio')) {
      return 'Your current portfolio value is $12,456.78\n\nBTC: 0.234 ($10,523.46)\nETH: 2.45 ($6,933.32)\n\nDaily change: +2.4% ($291.36)';
    } else if (lowerMessage.includes('/price')) {
      return 'Current Bitcoin price: $45,234.56\n\n24h change: +2.8%\nVolume: $28.5B\nMarket Cap: $884.2B';
    } else if (lowerMessage.includes('/help')) {
      return 'Available commands:\n\n/portfolio - View portfolio\n/price [symbol] - Check price\n/buy [symbol] [amount] - Buy crypto\n/sell [symbol] [amount] - Sell crypto\n/alert [symbol] [price] - Set alert\n/balance - Check balance\n/market - Market overview\n/help - Show this help';
    } else {
      return 'I understand! Try /help to see available commands.';
    }
  };

  const getCategoryColor = (category: BotCommand['category']) => {
    switch (category) {
      case 'portfolio': return 'bg-blue-100 text-blue-800';
      case 'trading': return 'bg-green-100 text-green-800';
      case 'alerts': return 'bg-orange-100 text-orange-800';
      case 'utility': return 'bg-purple-100 text-purple-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionColor = (subscription: BotUser['subscription']) => {
    switch (subscription) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Telegram Bot</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {users.filter(u => u.isActive).length} active users
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>Start Bot</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Users</p>
              <p className="text-3xl font-bold">{users.length.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Commands Used</p>
              <p className="text-3xl font-bold">
                {commands.reduce((sum, cmd) => sum + cmd.usage, 0).toLocaleString()}
              </p>
            </div>
            <Send className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Alerts</p>
              <p className="text-3xl font-bold">{alerts.filter(a => a.enabled).length}</p>
            </div>
            <Bell className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Response Rate</p>
              <p className="text-3xl font-bold">98.5%</p>
            </div>
            <Zap className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['commands', 'chat', 'users', 'alerts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Commands Tab */}
        {activeTab === 'commands' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commands.map(command => (
                <div key={command.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        command.enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{command.name}</h4>
                        <p className="text-sm text-gray-600">{command.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{command.command}</code>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(command.category)}`}>
                      {command.category}
                    </span>
                    <span className="text-xs text-gray-600">{command.usage.toLocaleString()} uses</span>
                  </div>
                  
                  <button
                    onClick={() => handleToggleCommand(command.id)}
                    className={`w-full px-3 py-2 rounded-lg transition-colors ${
                      command.enabled
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {command.enabled ? 'Enabled' : 'Enable'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-96">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message or command..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(user => (
                <div key={user.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user.isActive ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Users className={`w-5 h-5 ${user.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">@{user.username}</h4>
                        <p className="text-sm text-gray-600">{user.firstName}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Commands Used:</span>
                      <span className="font-medium">{user.commandsUsed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Active:</span>
                      <span className="font-medium">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subscription:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSubscriptionColor(user.subscription)}`}>
                        {user.subscription}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold capitalize">{alert.type} Alert</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          alert.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {alert.enabled ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      <p className="text-xs text-gray-500">Chat ID: {alert.chatId}</p>
                    </div>
                    
                    <button
                      className={`px-3 py-1 rounded-lg transition-colors text-sm ${
                        alert.enabled
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {alert.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bot Setup Instructions */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Bot Setup Instructions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Getting Started</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Search for "@CrybotBot" in Telegram</li>
                <li>2. Click "Start" to begin the conversation</li>
                <li>3. Link your Crybot account</li>
                <li>4. Configure your preferences</li>
                <li>5. Start using commands</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Popular Commands</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">/portfolio</code>
                  <span className="text-gray-600">View portfolio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">/price btc</code>
                  <span className="text-gray-600">Check Bitcoin price</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">/alert eth 3000</code>
                  <span className="text-gray-600">Set ETH price alert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">/help</code>
                  <span className="text-gray-600">Show all commands</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
