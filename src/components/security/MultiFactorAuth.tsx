import React, { useState, useEffect } from 'react';
import { Shield, Smartphone, Key, Mail, Lock, CheckCircle, AlertCircle, Clock, RefreshCw, QrCode } from 'lucide-react';

interface AuthMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  configured: boolean;
  lastUsed?: string;
  setupRequired: boolean;
}

interface SecuritySession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  current: boolean;
}

export const MultiFactorAuth: React.FC = () => {
  const [authMethods, setAuthMethods] = useState<AuthMethod[]>([]);
  const [activeSessions, setActiveSessions] = useState<SecuritySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSetupModal, setShowSetupModal] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchSecurityData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAuthMethods: AuthMethod[] = [
          {
            id: 'totp',
            name: 'Authenticator App',
            description: 'Use TOTP apps like Google Authenticator or Authy',
            icon: <Smartphone className="w-5 h-5" />,
            enabled: true,
            configured: true,
            lastUsed: '2024-01-15T10:30:00Z',
            setupRequired: false
          },
          {
            id: 'sms',
            name: 'SMS Authentication',
            description: 'Receive verification codes via SMS',
            icon: <Mail className="w-5 h-5" />,
            enabled: false,
            configured: false,
            setupRequired: true
          },
          {
            id: 'email',
            name: 'Email Authentication',
            description: 'Receive verification codes via email',
            icon: <Mail className="w-5 h-5" />,
            enabled: true,
            configured: true,
            lastUsed: '2024-01-14T15:45:00Z',
            setupRequired: false
          },
          {
            id: 'hardware',
            name: 'Hardware Security Key',
            description: 'Use YubiKey or other FIDO2 compatible keys',
            icon: <Key className="w-5 h-5" />,
            enabled: false,
            configured: false,
            setupRequired: true
          }
        ];

        const mockSessions: SecuritySession[] = [
          {
            id: 'session-1',
            device: 'Chrome on Windows',
            location: 'New York, USA',
            ipAddress: '192.168.1.100',
            lastActive: new Date().toISOString(),
            current: true
          },
          {
            id: 'session-2',
            device: 'Safari on iPhone',
            location: 'San Francisco, USA',
            ipAddress: '192.168.1.101',
            lastActive: '2024-01-15T09:15:00Z',
            current: false
          },
          {
            id: 'session-3',
            device: 'Firefox on Mac',
            location: 'London, UK',
            ipAddress: '192.168.1.102',
            lastActive: '2024-01-14T18:30:00Z',
            current: false
          }
        ];

        const mockBackupCodes = [
          'ABCD-1234-EFGH-5678',
          'IJKL-9012-MNOP-3456',
          'QRST-7890-UVWX-1234',
          'YZAB-5678-CDEF-9012',
          'GHIJ-3456-KLMN-7890',
          'OPQR-2345-STUV-6789',
          'WXYZ-1234-ABCD-5678',
          'EFGH-8901-IJKL-2345',
          'MNOP-4567-QRST-8901',
          'UVWX-1234-YZAB-5678'
        ];

        setAuthMethods(mockAuthMethods);
        setActiveSessions(mockSessions);
        setBackupCodes(mockBackupCodes);
      } catch (error) {
        console.error('Error fetching security data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityData();
  }, []);

  const handleToggleAuthMethod = async (methodId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAuthMethods(prev => prev.map(method => 
        method.id === methodId 
          ? { ...method, enabled: !method.enabled }
          : method
      ));
    } catch (error) {
      console.error('Error toggling auth method:', error);
    }
  };

  const handleSetupAuthMethod = (methodId: string) => {
    setShowSetupModal(methodId);
  };

  const handleVerifyCode = async () => {
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode === '123456') {
        setAuthMethods(prev => prev.map(method => 
          method.id === showSetupModal 
            ? { ...method, configured: true, setupRequired: false }
            : method
        ));
        setShowSetupModal(null);
        setVerificationCode('');
      } else {
        alert('Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
    } catch (error) {
      console.error('Error revoking session:', error);
    }
  };

  const regenerateBackupCodes = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCodes = Array.from({ length: 10 }, (_, i) => 
        `${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
      );
      setBackupCodes(newCodes);
    } catch (error) {
      console.error('Error regenerating backup codes:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const enabledMethodsCount = authMethods.filter(m => m.enabled && m.configured).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold">Multi-Factor Authentication</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{enabledMethodsCount} methods enabled</span>
        </div>
      </div>

      {/* Security Score */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Security Score</h3>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">
                {enabledMethodsCount >= 2 ? 'Excellent' : enabledMethodsCount >= 1 ? 'Good' : 'Needs Improvement'}
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-2 h-8 rounded ${
                      level <= enabledMethodsCount + 1 ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm opacity-90 mt-2">
              {enabledMethodsCount >= 2 
                ? 'Your account is well protected with multiple authentication methods.'
                : enabledMethodsCount >= 1
                ? 'Consider enabling more authentication methods for better security.'
                : 'Enable at least one authentication method to secure your account.'
              }
            </p>
          </div>
          <Shield className="w-16 h-16 opacity-50" />
        </div>
      </div>

      {/* Authentication Methods */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Authentication Methods</h3>
        </div>
        <div className="divide-y">
          {authMethods.map(method => (
            <div key={method.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    method.configured ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    {method.lastUsed && (
                      <p className="text-xs text-gray-500 mt-1">
                        Last used: {new Date(method.lastUsed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.configured ? (
                    <>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Configured
                      </span>
                      <button
                        onClick={() => handleToggleAuthMethod(method.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          method.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            method.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleSetupAuthMethod(method.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Set Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
        </div>
        <div className="divide-y">
          {activeSessions.map(session => (
            <div key={session.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    session.current ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{session.device}</h4>
                    <p className="text-sm text-gray-600">{session.location}</p>
                    <p className="text-xs text-gray-500">IP: {session.ipAddress}</p>
                    <p className="text-xs text-gray-500">
                      {session.current 
                        ? 'Currently active' 
                        : `Last active: ${new Date(session.lastActive).toLocaleString()}`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {session.current && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Current
                    </span>
                  )}
                  {!session.current && (
                    <button
                      onClick={() => handleRevokeSession(session.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Codes */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Backup Codes</h3>
            <button
              onClick={regenerateBackupCodes}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Save these backup codes in a secure location. You can use them to access your account if you lose access to your authentication methods.
            </p>
            <div className="flex items-center space-x-2 text-sm text-yellow-600">
              <AlertCircle className="w-4 h-4" />
              <span>Each code can only be used once</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {backupCodes.map((code, index) => (
              <div key={index} className="bg-gray-50 border rounded p-2 text-center font-mono text-sm">
                {code}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Set up {authMethods.find(m => m.id === showSetupModal)?.name}
            </h3>
            
            {showSetupModal === 'totp' && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <QrCode className="w-32 h-32 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Scan this QR code with your authenticator app</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Or enter this code manually:</p>
                  <code className="bg-gray-100 px-3 py-2 rounded text-sm">ABCD-EFGH-IJKL-MNOP</code>
                </div>
              </div>
            )}

            {showSetupModal === 'sms' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Enter your phone number:</p>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {showSetupModal === 'hardware' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Insert your hardware key and follow the on-screen instructions.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Key className="w-5 h-5" />
                    <span className="text-sm">Touch your hardware key when prompted</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter verification code:</label>
                <input
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleVerifyCode}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Verify
                </button>
                <button
                  onClick={() => {
                    setShowSetupModal(null);
                    setVerificationCode('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
