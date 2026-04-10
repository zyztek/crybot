import React, { useState, useEffect } from 'react';
import { Crown, Star, Zap, Shield, Globe, Headphones, CheckCircle, X, CreditCard, TrendingUp, Users } from 'lucide-react';

interface PremiumTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    lifetime: number;
  };
  features: string[];
  popular: boolean;
  color: string;
  icon: React.ReactNode;
  limits: {
    apiCalls: number;
    alerts: number;
    portfolios: number;
    exportData: boolean;
    prioritySupport: boolean;
    advancedAnalytics: boolean;
    aiFeatures: boolean;
    customThemes: boolean;
    earlyAccess: boolean;
  };
}

interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'analytics' | 'automation' | 'security' | 'support' | 'ai' | 'customization';
  icon: React.ReactNode;
  availableIn: string[];
}

interface Subscription {
  id: string;
  tier: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  paymentMethod: string;
  nextBilling: string;
}

export const PremiumFeatures: React.FC = () => {
  const [tiers, setTiers] = useState<PremiumTier[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly' | 'lifetime'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const fetchPremiumData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockTiers: PremiumTier[] = [
          {
            id: 'free',
            name: 'Free',
            description: 'Perfect for getting started with crypto',
            price: {
              monthly: 0,
              yearly: 0,
              lifetime: 0
            },
            features: [
              'Basic portfolio tracking',
              'Price alerts (5 max)',
              'Market data (15 min delay)',
              'Community support',
              'Mobile app access',
              'Basic charts'
            ],
            popular: false,
            color: 'gray',
            icon: <Users className="w-6 h-6" />,
            limits: {
              apiCalls: 1000,
              alerts: 5,
              portfolios: 1,
              exportData: false,
              prioritySupport: false,
              advancedAnalytics: false,
              aiFeatures: false,
              customThemes: false,
              earlyAccess: false
            }
          },
          {
            id: 'pro',
            name: 'Pro',
            description: 'For serious crypto enthusiasts',
            price: {
              monthly: 19.99,
              yearly: 199.99,
              lifetime: 999.99
            },
            features: [
              'Everything in Free',
              'Real-time market data',
              'Advanced analytics',
              'Unlimited price alerts',
              'API access (10k calls/month)',
              'Portfolio analytics',
              'Tax reporting',
              'Custom themes',
              'Email support'
            ],
            popular: true,
            color: 'blue',
            icon: <Zap className="w-6 h-6" />,
            limits: {
              apiCalls: 10000,
              alerts: 50,
              portfolios: 5,
              exportData: true,
              prioritySupport: false,
              advancedAnalytics: true,
              aiFeatures: false,
              customThemes: true,
              earlyAccess: false
            }
          },
          {
            id: 'business',
            name: 'Business',
            description: 'For professionals and teams',
            price: {
              monthly: 49.99,
              yearly: 499.99,
              lifetime: 2499.99
            },
            features: [
              'Everything in Pro',
              'AI-powered insights',
              'Priority support',
              'API access (100k calls/month)',
              'Unlimited portfolios',
              'Team collaboration',
              'Advanced security features',
              'Custom integrations',
              'Early access to features'
            ],
            popular: false,
            color: 'purple',
            icon: <Crown className="w-6 h-6" />,
            limits: {
              apiCalls: 100000,
              alerts: 200,
              portfolios: 50,
              exportData: true,
              prioritySupport: true,
              advancedAnalytics: true,
              aiFeatures: true,
              customThemes: true,
              earlyAccess: true
            }
          },
          {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'For large organizations',
            price: {
              monthly: 199.99,
              yearly: 1999.99,
              lifetime: 9999.99
            },
            features: [
              'Everything in Business',
              'Unlimited API access',
              'Dedicated account manager',
              'Custom development',
              'SLA guarantee',
              'On-premise deployment',
              'White-label options',
              'Advanced compliance tools',
              '24/7 phone support'
            ],
            popular: false,
            color: 'gold',
            icon: <Shield className="w-6 h-6" />,
            limits: {
              apiCalls: -1, // unlimited
              alerts: -1, // unlimited
              portfolios: -1, // unlimited
              exportData: true,
              prioritySupport: true,
              advancedAnalytics: true,
              aiFeatures: true,
              customThemes: true,
              earlyAccess: true
            }
          }
        ];

        const mockFeatures: Feature[] = [
          {
            id: 'real-time-data',
            name: 'Real-time Market Data',
            description: 'Get instant price updates and live market data',
            category: 'analytics',
            icon: <TrendingUp className="w-5 h-5" />,
            availableIn: ['pro', 'business', 'enterprise']
          },
          {
            id: 'ai-insights',
            name: 'AI-Powered Insights',
            description: 'Machine learning predictions and smart recommendations',
            category: 'ai',
            icon: <Star className="w-5 h-5" />,
            availableIn: ['business', 'enterprise']
          },
          {
            id: 'priority-support',
            name: 'Priority Support',
            description: 'Get faster response times and dedicated support',
            category: 'support',
            icon: <Headphones className="w-5 h-5" />,
            availableIn: ['business', 'enterprise']
          },
          {
            id: 'advanced-security',
            name: 'Advanced Security',
            description: 'Enhanced security features and compliance tools',
            category: 'security',
            icon: <Shield className="w-5 h-5" />,
            availableIn: ['business', 'enterprise']
          },
          {
            id: 'custom-themes',
            name: 'Custom Themes',
            description: 'Create and customize your own themes',
            category: 'customization',
            icon: <Globe className="w-5 h-5" />,
            availableIn: ['pro', 'business', 'enterprise']
          },
          {
            id: 'api-access',
            name: 'API Access',
            description: 'Access our API for custom integrations',
            category: 'automation',
            icon: <Zap className="w-5 h-5" />,
            availableIn: ['pro', 'business', 'enterprise']
          }
        ];

        const mockSubscription: Subscription = {
          id: 'sub-1',
          tier: 'pro',
          status: 'active',
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-02-01T00:00:00Z',
          autoRenew: true,
          paymentMethod: 'Visa ending in 4242',
          nextBilling: '2024-02-01T00:00:00Z'
        };

        setTiers(mockTiers);
        setFeatures(mockFeatures);
        setSubscription(mockSubscription);
      } catch (error) {
        console.error('Error fetching premium data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumData();
  }, []);

  const handleUpgrade = async (tierId: string) => {
    try {
      setSelectedTier(tierId);
      setShowUpgradeModal(true);
    } catch (error) {
      console.error('Error upgrading:', error);
    }
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedTier) return;
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const tier = tiers.find(t => t.id === selectedTier);
      if (tier) {
        setSubscription({
          id: `sub-${Date.now()}`,
          tier: selectedTier,
          status: 'active',
          startDate: new Date().toISOString(),
          autoRenew: true,
          paymentMethod: 'Credit Card',
          nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      
      setShowUpgradeModal(false);
      setSelectedTier(null);
    } catch (error) {
      console.error('Error confirming upgrade:', error);
    }
  };

  const getTierColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500 bg-blue-50';
      case 'purple': return 'border-purple-500 bg-purple-50';
      case 'gold': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getPrice = (tier: PremiumTier) => {
    switch (billingCycle) {
      case 'monthly': return tier.price.monthly;
      case 'yearly': return tier.price.yearly;
      case 'lifetime': return tier.price.lifetime;
      default: return tier.price.monthly;
    }
  };

  const currentTier = tiers.find(t => t.id === subscription?.tier);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Crown className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold">Premium Features</h2>
        </div>
        {currentTier && currentTier.id !== 'free' && (
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {currentTier.name} Plan
            </span>
            <span className="text-sm text-gray-600">
              Active since {new Date(subscription?.startDate || '').toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Current Subscription Status */}
      {subscription && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Subscription</h3>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold capitalize">{subscription.tier}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {subscription.status}
                </span>
              </div>
              <p className="text-sm opacity-90 mt-2">
                {subscription.autoRenew ? 'Auto-renewal enabled' : 'Auto-renewal disabled'}
                {subscription.nextBilling && ` • Next billing: ${new Date(subscription.nextBilling).toLocaleDateString()}`}
              </p>
            </div>
            <Crown className="w-16 h-16 opacity-50" />
          </div>
        </div>
      )}

      {/* Billing Cycle Toggle */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              billingCycle === 'monthly' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              billingCycle === 'yearly' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yearly
            <span className="ml-1 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
          <button
            onClick={() => setBillingCycle('lifetime')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              billingCycle === 'lifetime' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lifetime
            <span className="ml-1 text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
              Best Value
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map(tier => {
          const price = getPrice(tier);
          const isCurrentTier = currentTier?.id === tier.id;
          
          return (
            <div
              key={tier.id}
              className={`relative rounded-lg border-2 p-6 ${getTierColor(tier.color)} ${
                tier.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="flex justify-center mb-2">
                  {tier.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                
                <div className="text-3xl font-bold mb-2">
                  {price === 0 ? 'Free' : (
                    <>
                      ${price}
                      <span className="text-sm font-normal text-gray-600">
                        /{billingCycle === 'lifetime' ? 'lifetime' : billingCycle}
                      </span>
                    </>
                  )}
                </div>
                
                {billingCycle === 'yearly' && tier.price.yearly > 0 && (
                  <p className="text-sm text-green-600">
                    Save ${(tier.price.monthly * 12 - tier.price.yearly).toFixed(2)}/year
                  </p>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handleUpgrade(tier.id)}
                disabled={isCurrentTier}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  isCurrentTier
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : tier.id === 'free'
                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                {isCurrentTier ? 'Current Plan' : tier.id === 'free' ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Feature Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                {tiers.map(tier => (
                  <th key={tier.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map(feature => (
                <tr key={feature.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-500">{feature.description}</div>
                      </div>
                    </div>
                  </td>
                  {tiers.map(tier => (
                    <td key={tier.id} className="px-6 py-4 whitespace-nowrap text-center">
                      {feature.availableIn.includes(tier.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedTier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Confirm Upgrade</h3>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-2">
                  {tiers.find(t => t.id === selectedTier)?.name}
                </div>
                <div className="text-3xl font-bold text-purple-600">
                  ${getPrice(tiers.find(t => t.id === selectedTier)!)}
                  <span className="text-sm font-normal text-gray-600">
                    /{billingCycle === 'lifetime' ? 'lifetime' : billingCycle}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Credit Card</option>
                    <option>PayPal</option>
                    <option>Crypto</option>
                  </select>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">What's included:</h4>
                  <ul className="space-y-1 text-sm">
                    {tiers.find(t => t.id === selectedTier)?.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={handleConfirmUpgrade}
                className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Confirm Upgrade
              </button>
              <button
                onClick={() => {
                  setShowUpgradeModal(false);
                  setSelectedTier(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
