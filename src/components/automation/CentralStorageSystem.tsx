/**
 * Central Storage System Component
 * 
 * TeraBox-based central storage system for unified account and resource management
 * Manages all storage accounts and provides unified access to distributed storage
 */

import React, { useState, useEffect, useRef } from 'react';
import { HardDrive, Cloud, Database, Shield, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Upload, Download, Link, Folder, File, Key, Zap, Activity } from 'lucide-react';

interface StorageAccount {
  id: string;
  provider: string;
  type: 'terabox' | 'google_drive' | 'dropbox' | 'onedrive' | 'mega' | 'pcloud' | 'icloud' | 'box';
  email: string;
  username: string;
  plan: 'free' | 'premium' | 'business' | 'enterprise';
  specifications: {
    totalStorage: string; // GB/TB
    usedStorage: string;
    availableStorage: string;
    bandwidth: string;
    maxFileSize: string;
    concurrentConnections: number;
    uploadSpeed: string;
    downloadSpeed: string;
  };
  features: {
    encryption: boolean;
    sharing: boolean;
    collaboration: boolean;
    versioning: boolean;
    automaticBackup: boolean;
    apiAccess: boolean;
    mobileApp: boolean;
    desktopApp: boolean;
    webInterface: boolean;
    fileVersioning: boolean;
    passwordProtection: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    endToEndEncryption: boolean;
    sslEncryption: boolean;
    privacyPolicy: string;
    dataLocation: string[];
    compliance: string[];
  };
  integration: {
    status: 'connected' | 'disconnected' | 'error' | 'syncing' | 'maintenance';
    lastSync: string;
    syncProgress: number; // 0-100
    autoSync: boolean;
    syncFrequency: number; // minutes
    credentials: {
      accessToken?: string;
      refreshToken?: string;
      apiKey?: string;
      endpoint?: string;
      encrypted: boolean;
    };
    errorCount: number;
    lastError?: string;
  };
  usage: {
    filesCount: number;
    foldersCount: number;
    sharedFiles: number;
    bandwidthUsed: string;
    bandwidthLimit: string;
    lastActivity: string;
    totalUploads: number;
    totalDownloads: number;
  };
  isActive: boolean;
  priority: number;
  createdAt: string;
  lastChecked: string;
}

interface StorageFile {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: string;
  mimeType: string;
  path: string;
  accountId: string;
  provider: string;
  hash: string;
  checksum: string;
  encrypted: boolean;
  shared: boolean;
  publicUrl?: string;
  downloadCount: number;
  uploadDate: string;
  lastModified: string;
  tags: string[];
  metadata: {
    description?: string;
    category?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    retention?: string;
    backup?: boolean;
    archived?: boolean;
  };
}

interface StorageOperation {
  id: string;
  type: 'upload' | 'download' | 'sync' | 'backup' | 'restore' | 'delete' | 'move' | 'copy' | 'share';
  source: {
    accountId: string;
    path: string;
    fileId?: string;
  };
  destination?: {
    accountId: string;
    path: string;
  };
  file: {
    name: string;
    size: string;
    type: string;
  };
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';
  progress: number; // 0-100
  speed: string; // MB/s
  startTime: string;
  endTime?: string;
  estimatedTime?: string;
  error?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  retryCount: number;
  maxRetries: number;
}

interface StorageConfig {
  autoSync: boolean;
  syncFrequency: number; // minutes
  backupEnabled: boolean;
  backupFrequency: number; // hours
  encryptionEnabled: boolean;
  compressionEnabled: boolean;
  deduplication: boolean;
  loadBalancing: boolean;
  failoverEnabled: boolean;
  replication: {
    enabled: boolean;
    factor: number; // number of replicas
    strategy: 'immediate' | 'delayed' | 'scheduled';
  };
  optimization: {
    autoCleanup: boolean;
    duplicateDetection: boolean;
    unusedFileCleanup: boolean;
    oldVersionCleanup: boolean;
    bandwidthOptimization: boolean;
  };
  security: {
    encryptCredentials: boolean;
    auditLogging: boolean;
    accessControl: boolean;
    dataIntegrity: boolean;
    secureTransfer: boolean;
  };
  notifications: {
    syncComplete: boolean;
    backupComplete: boolean;
    storageFull: boolean;
    operationFailed: boolean;
    securityAlerts: boolean;
  };
}

const CentralStorageSystem: React.FC = () => {
  const [accounts, setAccounts] = useState<StorageAccount[]>([]);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [operations, setOperations] = useState<StorageOperation[]>([]);
  const [config, setConfig] = useState<StorageConfig>({
    autoSync: true,
    syncFrequency: 30,
    backupEnabled: true,
    backupFrequency: 24,
    encryptionEnabled: true,
    compressionEnabled: true,
    deduplication: true,
    loadBalancing: true,
    failoverEnabled: true,
    replication: {
      enabled: true,
      factor: 2,
      strategy: 'immediate'
    },
    optimization: {
      autoCleanup: true,
      duplicateDetection: true,
      unusedFileCleanup: true,
      oldVersionCleanup: true,
      bandwidthOptimization: true
    },
    security: {
      encryptCredentials: true,
      auditLogging: true,
      accessControl: true,
      dataIntegrity: true,
      secureTransfer: true
    },
    notifications: {
      syncComplete: true,
      backupComplete: true,
      storageFull: true,
      operationFailed: true,
      securityAlerts: true
    }
  });
  const [selectedAccount, setSelectedAccount] = useState<StorageAccount | null>(null);
  const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [stats, setStats] = useState({
    totalAccounts: 0,
    activeAccounts: 0,
    totalStorage: 0,
    usedStorage: 0,
    availableStorage: 0,
    totalFiles: 0,
    totalOperations: 0,
    activeOperations: 0,
    bestProvider: '',
    averageSpeed: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock storage accounts initialization
  useEffect(() => {
    const mockAccounts: StorageAccount[] = [
      {
        id: 'account-1',
        provider: 'TeraBox',
        type: 'terabox',
        email: 'crybot.tera1@example.com',
        username: 'crybot_storage_1',
        plan: 'free',
        specifications: {
          totalStorage: '1TB',
          usedStorage: '350GB',
          availableStorage: '674GB',
          bandwidth: 'Unlimited',
          maxFileSize: '5GB',
          concurrentConnections: 3,
          uploadSpeed: '10MB/s',
          downloadSpeed: '15MB/s'
        },
        features: {
          encryption: true,
          sharing: true,
          collaboration: false,
          versioning: false,
          automaticBackup: true,
          apiAccess: true,
          mobileApp: true,
          desktopApp: true,
          webInterface: true,
          fileVersioning: false,
          passwordProtection: true
        },
        security: {
          twoFactorAuth: false,
          endToEndEncryption: true,
          sslEncryption: true,
          privacyPolicy: 'Standard',
          dataLocation: ['US', 'EU', 'Asia'],
          compliance: ['GDPR', 'CCPA']
        },
        integration: {
          status: 'connected',
          lastSync: new Date().toISOString(),
          syncProgress: 100,
          autoSync: true,
          syncFrequency: 30,
          credentials: {
            accessToken: 'encrypted_token_123',
            refreshToken: 'encrypted_refresh_123',
            endpoint: 'https://api.terabox.com',
            encrypted: true
          },
          errorCount: 0
        },
        usage: {
          filesCount: 15234,
          foldersCount: 892,
          sharedFiles: 156,
          bandwidthUsed: '2.5TB',
          bandwidthLimit: 'Unlimited',
          lastActivity: new Date().toISOString(),
          totalUploads: 8923,
          totalDownloads: 12456
        },
        isActive: true,
        priority: 1,
        createdAt: '2024-01-01T00:00:00Z',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'account-2',
        provider: 'Google Drive',
        type: 'google_drive',
        email: 'crybot.google1@example.com',
        username: 'crybot_drive_1',
        plan: 'free',
        specifications: {
          totalStorage: '15GB',
          usedStorage: '8.2GB',
          availableStorage: '6.8GB',
          bandwidth: 'Unlimited',
          maxFileSize: '5GB',
          concurrentConnections: 5,
          uploadSpeed: '25MB/s',
          downloadSpeed: '30MB/s'
        },
        features: {
          encryption: true,
          sharing: true,
          collaboration: true,
          versioning: true,
          automaticBackup: true,
          apiAccess: true,
          mobileApp: true,
          desktopApp: true,
          webInterface: true,
          fileVersioning: true,
          passwordProtection: true
        },
        security: {
          twoFactorAuth: true,
          endToEndEncryption: true,
          sslEncryption: true,
          privacyPolicy: 'Enhanced',
          dataLocation: ['Global'],
          compliance: ['GDPR', 'SOC2', 'ISO27001']
        },
        integration: {
          status: 'connected',
          lastSync: new Date(Date.now() - 3600000).toISOString(),
          syncProgress: 100,
          autoSync: true,
          syncFrequency: 15,
          credentials: {
            accessToken: 'encrypted_google_token_123',
            refreshToken: 'encrypted_google_refresh_123',
            endpoint: 'https://www.googleapis.com/drive/v3',
            encrypted: true
          },
          errorCount: 0
        },
        usage: {
          filesCount: 3456,
          foldersCount: 234,
          sharedFiles: 89,
          bandwidthUsed: '850GB',
          bandwidthLimit: 'Unlimited',
          lastActivity: new Date(Date.now() - 1800000).toISOString(),
          totalUploads: 2341,
          totalDownloads: 4567
        },
        isActive: true,
        priority: 2,
        createdAt: '2024-01-05T00:00:00Z',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'account-3',
        provider: 'Mega',
        type: 'mega',
        email: 'crybot.mega1@example.com',
        username: 'crybot_mega_1',
        plan: 'free',
        specifications: {
          totalStorage: '20GB',
          usedStorage: '12.5GB',
          availableStorage: '7.5GB',
          bandwidth: '10GB/month',
          maxFileSize: '2GB',
          concurrentConnections: 2,
          uploadSpeed: '8MB/s',
          downloadSpeed: '12MB/s'
        },
        features: {
          encryption: true,
          sharing: true,
          collaboration: true,
          versioning: false,
          automaticBackup: false,
          apiAccess: true,
          mobileApp: true,
          desktopApp: true,
          webInterface: true,
          fileVersioning: false,
          passwordProtection: true
        },
        security: {
          twoFactorAuth: true,
          endToEndEncryption: true,
          sslEncryption: true,
          privacyPolicy: 'Maximum',
          dataLocation: ['New Zealand', 'EU'],
          compliance: ['GDPR', 'Privacy Shield']
        },
        integration: {
          status: 'connected',
          lastSync: new Date(Date.now() - 7200000).toISOString(),
          syncProgress: 100,
          autoSync: true,
          syncFrequency: 60,
          credentials: {
            accessToken: 'encrypted_mega_token_123',
            endpoint: 'https://g.api.mega.co.nz',
            encrypted: true
          },
          errorCount: 1,
          lastError: 'Rate limit exceeded'
        },
        usage: {
          filesCount: 5678,
          foldersCount: 345,
          sharedFiles: 234,
          bandwidthUsed: '8.5GB',
          bandwidthLimit: '10GB',
          lastActivity: new Date(Date.now() - 3600000).toISOString(),
          totalUploads: 3456,
          totalDownloads: 6789
        },
        isActive: true,
        priority: 3,
        createdAt: '2024-01-10T00:00:00Z',
        lastChecked: new Date().toISOString()
      }
    ];

    setAccounts(mockAccounts);
  }, []);

  // Mock files initialization
  useEffect(() => {
    const mockFiles: StorageFile[] = [
      {
        id: 'file-1',
        name: 'persona_data_backup.zip',
        type: 'file',
        size: '125MB',
        mimeType: 'application/zip',
        path: '/backups/persona_data/',
        accountId: 'account-1',
        provider: 'TeraBox',
        hash: 'sha256:abc123...',
        checksum: 'checksum_123',
        encrypted: true,
        shared: false,
        downloadCount: 0,
        uploadDate: '2024-01-15T00:00:00Z',
        lastModified: '2024-01-15T00:00:00Z',
        tags: ['backup', 'persona', 'encrypted'],
        metadata: {
          description: 'Monthly persona data backup',
          category: 'backup',
          priority: 'high',
          retention: '90 days',
          backup: true,
          archived: false
        }
      },
      {
        id: 'file-2',
        name: 'automation_logs_2024.json',
        type: 'file',
        size: '45MB',
        mimeType: 'application/json',
        path: '/logs/automation/',
        accountId: 'account-2',
        provider: 'Google Drive',
        hash: 'sha256:def456...',
        checksum: 'checksum_456',
        encrypted: true,
        shared: false,
        downloadCount: 12,
        uploadDate: '2024-01-20T00:00:00Z',
        lastModified: '2024-01-20T00:00:00Z',
        tags: ['logs', 'automation', 'json'],
        metadata: {
          description: 'Automation system logs for January 2024',
          category: 'logs',
          priority: 'medium',
          retention: '30 days',
          backup: true,
          archived: false
        }
      }
    ];

    setFiles(mockFiles);
  }, []);

  // Mock operations initialization
  useEffect(() => {
    const mockOperations: StorageOperation[] = [
      {
        id: 'op-1',
        type: 'upload',
        source: {
          accountId: 'account-1',
          path: '/uploads/'
        },
        file: {
          name: 'new_backup.zip',
          size: '250MB',
          type: 'application/zip'
        },
        status: 'running',
        progress: 65,
        speed: '8.5MB/s',
        startTime: new Date(Date.now() - 300000).toISOString(),
        estimatedTime: '00:02:30',
        priority: 'high',
        retryCount: 0,
        maxRetries: 3
      },
      {
        id: 'op-2',
        type: 'sync',
        source: {
          accountId: 'account-2',
          path: '/sync/'
        },
        file: {
          name: 'sync_data.json',
          size: '15MB',
          type: 'application/json'
        },
        status: 'completed',
        progress: 100,
        speed: '12.3MB/s',
        startTime: new Date(Date.now() - 600000).toISOString(),
        endTime: new Date(Date.now() - 300000).toISOString(),
        priority: 'medium',
        retryCount: 0,
        maxRetries: 3
      }
    ];

    setOperations(mockOperations);
  }, []);

  // Auto sync simulation
  useEffect(() => {
    if (!config.autoSync || !isSyncing) return;

    const interval = setInterval(() => {
      accounts.forEach(account => {
        if (!account.integration.autoSync || account.integration.status !== 'connected') return;

        // Simulate sync operation
        if (Math.random() > 0.7) { // 30% chance
          const newOperation: StorageOperation = {
            id: `op-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'sync',
            source: {
              accountId: account.id,
              path: '/auto_sync/'
            },
            file: {
              name: `sync_${Date.now()}.json`,
              size: `${(Math.random() * 50 + 5).toFixed(1)}MB`,
              type: 'application/json'
            },
            status: 'running',
            progress: 0,
            speed: `${(Math.random() * 20 + 5).toFixed(1)}MB/s`,
            startTime: new Date().toISOString(),
            estimatedTime: '00:01:30',
            priority: 'low',
            retryCount: 0,
            maxRetries: 3
          };

          setOperations(prev => [...prev, newOperation]);

          // Simulate sync progress
          const progressInterval = setInterval(() => {
            setOperations(prev => prev.map(op => 
              op.id === newOperation.id 
                ? {
                    ...op,
                    progress: Math.min(100, op.progress + Math.random() * 20 + 5),
                    speed: `${(Math.random() * 20 + 5).toFixed(1)}MB/s`
                  }
                : op
            ));
          }, 2000);

          // Complete sync
          setTimeout(() => {
            clearInterval(progressInterval);
            setOperations(prev => prev.map(op => 
              op.id === newOperation.id 
                ? {
                    ...op,
                    status: 'completed',
                    progress: 100,
                    endTime: new Date().toISOString()
                  }
                : op
            ));

            // Update account sync
            setAccounts(prev => prev.map(acc => 
              acc.id === account.id 
                ? {
                    ...acc,
                    integration: {
                      ...acc.integration,
                      lastSync: new Date().toISOString(),
                      syncProgress: 100
                    },
                    usage: {
                      ...acc.usage,
                      lastActivity: new Date().toISOString()
                    }
                  }
                : acc
            ));
          }, 90000); // 90 seconds
        }
      });
    }, config.syncFrequency * 60 * 1000); // Convert minutes to milliseconds

    return () => clearInterval(interval);
  }, [config.autoSync, config.syncFrequency, accounts, isSyncing]);

  // Auto backup simulation
  useEffect(() => {
    if (!config.backupEnabled) return;

    const interval = setInterval(() => {
      accounts.forEach(account => {
        if (!account.isActive) return;

        // Simulate backup operation
        const newOperation: StorageOperation = {
          id: `backup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'backup',
          source: {
            accountId: account.id,
            path: '/backups/'
          },
          file: {
            name: `backup_${new Date().toISOString().split('T')[0]}.zip`,
            size: `${(Math.random() * 500 + 100).toFixed(1)}MB`,
            type: 'application/zip'
          },
          status: 'running',
          progress: 0,
          speed: `${(Math.random() * 15 + 3).toFixed(1)}MB/s`,
          startTime: new Date().toISOString(),
          estimatedTime: '00:05:00',
          priority: 'medium',
          retryCount: 0,
          maxRetries: 3
        };

        setOperations(prev => [...prev, newOperation]);

        // Simulate backup progress
        const progressInterval = setInterval(() => {
          setOperations(prev => prev.map(op => 
            op.id === newOperation.id 
              ? {
                  ...op,
                  progress: Math.min(100, op.progress + Math.random() * 10 + 2),
                  speed: `${(Math.random() * 15 + 3).toFixed(1)}MB/s`
                }
              : op
          ));
        }, 5000);

        // Complete backup
        setTimeout(() => {
          clearInterval(progressInterval);
          setOperations(prev => prev.map(op => 
            op.id === newOperation.id 
              ? {
                  ...op,
                  status: 'completed',
                  progress: 100,
                  endTime: new Date().toISOString()
                }
              : op
          ));

          // Add backup file
          const backupFile: StorageFile = {
            id: `file-backup-${Date.now()}`,
            name: newOperation.file.name,
            type: 'file',
            size: newOperation.file.size,
            mimeType: newOperation.file.type,
            path: newOperation.source.path,
            accountId: account.id,
            provider: account.provider,
            hash: `sha256:backup_${Date.now()}`,
            checksum: `checksum_backup_${Date.now()}`,
            encrypted: config.encryptionEnabled,
            shared: false,
            downloadCount: 0,
            uploadDate: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            tags: ['backup', 'automatic', 'encrypted'],
            metadata: {
              description: `Automatic backup for ${new Date().toLocaleDateString()}`,
              category: 'backup',
              priority: 'high',
              retention: '90 days',
              backup: true,
              archived: false
            }
          };

          setFiles(prev => [...prev, backupFile]);
        }, 300000); // 5 minutes
      });
    }, config.backupFrequency * 60 * 60 * 1000); // Convert hours to milliseconds

    return () => clearInterval(interval);
  }, [config.backupEnabled, config.backupFrequency, accounts, config.encryptionEnabled]);

  // Update stats
  useEffect(() => {
    const activeAccounts = accounts.filter(a => a.isActive).length;
    const totalStorageGB = accounts.reduce((sum, acc) => {
      const storage = parseFloat(acc.specifications.totalStorage.replace(/[^\d.]/g, ''));
      return sum + (acc.specifications.totalStorage.includes('TB') ? storage * 1024 : storage);
    }, 0);
    const usedStorageGB = accounts.reduce((sum, acc) => {
      const storage = parseFloat(acc.specifications.usedStorage.replace(/[^\d.]/g, ''));
      return sum + (acc.specifications.usedStorage.includes('TB') ? storage * 1024 : storage);
    }, 0);
    const availableStorageGB = totalStorageGB - usedStorageGB;
    const totalFiles = files.length;
    const activeOperations = operations.filter(op => op.status === 'running').length;
    const averageSpeed = operations.filter(op => op.status === 'running').length > 0
      ? operations.filter(op => op.status === 'running').reduce((sum, op) => {
          const speed = parseFloat(op.speed.replace(/[^\d.]/g, ''));
          return sum + speed;
        }, 0) / operations.filter(op => op.status === 'running').length
      : 0;
    
    const providerCounts = accounts.reduce((acc, account) => {
      acc[account.provider] = (acc[account.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestProvider = Object.entries(providerCounts).reduce((best, [provider, count]) => 
      count > (best?.count || 0) ? { provider, count } : best, null as { provider: string; count: number } | null);

    setStats({
      totalAccounts: accounts.length,
      activeAccounts,
      totalStorage: totalStorageGB,
      usedStorage: usedStorageGB,
      availableStorage: availableStorageGB,
      totalFiles,
      totalOperations: operations.length,
      activeOperations,
      bestProvider: bestProvider?.provider || '',
      averageSpeed
    });
  }, [accounts, files, operations]);

  const toggleSync = () => {
    setIsSyncing(!isSyncing);
  };

  const addAccount = () => {
    const providers: StorageAccount['provider'][] = ['TeraBox', 'Google Drive', 'Dropbox', 'OneDrive', 'Mega', 'pCloud'];
    const plans: StorageAccount['plan'][] = ['free', 'premium', 'business'];
    
    const newAccount: StorageAccount = {
      id: `account-${Date.now()}`,
      provider: providers[Math.floor(Math.random() * providers.length)],
      type: 'terabox',
      email: `crybot.${Date.now()}@example.com`,
      username: `crybot_storage_${Date.now()}`,
      plan: plans[Math.floor(Math.random() * plans.length)],
      specifications: {
        totalStorage: `${Math.floor(Math.random() * 1000) + 10}GB`,
        usedStorage: `${Math.floor(Math.random() * 500)}GB`,
        availableStorage: `${Math.floor(Math.random() * 500)}GB`,
        bandwidth: 'Unlimited',
        maxFileSize: '5GB',
        concurrentConnections: Math.floor(Math.random() * 5) + 1,
        uploadSpeed: `${Math.floor(Math.random() * 20) + 5}MB/s`,
        downloadSpeed: `${Math.floor(Math.random() * 30) + 10}MB/s`
      },
      features: {
        encryption: true,
        sharing: true,
        collaboration: Math.random() > 0.5,
        versioning: Math.random() > 0.5,
        automaticBackup: true,
        apiAccess: true,
        mobileApp: true,
        desktopApp: true,
        webInterface: true,
        fileVersioning: Math.random() > 0.5,
        passwordProtection: true
      },
      security: {
        twoFactorAuth: Math.random() > 0.5,
        endToEndEncryption: true,
        sslEncryption: true,
        privacyPolicy: 'Standard',
        dataLocation: ['US', 'EU', 'Asia'],
        compliance: ['GDPR']
      },
      integration: {
        status: 'disconnected',
        lastSync: new Date().toISOString(),
        syncProgress: 0,
        autoSync: true,
        syncFrequency: 30,
        credentials: {
          encrypted: true
        },
        errorCount: 0
      },
      usage: {
        filesCount: 0,
        foldersCount: 0,
        sharedFiles: 0,
        bandwidthUsed: '0GB',
        bandwidthLimit: 'Unlimited',
        lastActivity: new Date().toISOString(),
        totalUploads: 0,
        totalDownloads: 0
      },
      isActive: true,
      priority: accounts.length + 1,
      createdAt: new Date().toISOString(),
      lastChecked: new Date().toISOString()
    };

    setAccounts(prev => [...prev, newAccount]);
  };

  const connectAccount = (accountId: string) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? {
            ...account,
            integration: {
              ...account.integration,
              status: 'connected',
              lastSync: new Date().toISOString(),
              syncProgress: 100,
              credentials: {
                ...account.integration.credentials,
                accessToken: 'encrypted_token_' + Date.now(),
                endpoint: 'https://api.' + account.provider.toLowerCase().replace(/\s+/g, '') + '.com'
              }
            }
          }
        : account
    ));
  };

  const syncAccount = (accountId: string) => {
    const newOperation: StorageOperation = {
      id: `sync-${Date.now()}`,
      type: 'sync',
      source: {
        accountId,
        path: '/manual_sync/'
      },
      file: {
        name: `manual_sync_${Date.now()}.json`,
        size: '25MB',
        type: 'application/json'
      },
      status: 'running',
      progress: 0,
      speed: '12.5MB/s',
      startTime: new Date().toISOString(),
      estimatedTime: '00:00:30',
      priority: 'high',
      retryCount: 0,
      maxRetries: 3
    };

    setOperations(prev => [...prev, newOperation]);

    // Simulate sync completion
    setTimeout(() => {
      setOperations(prev => prev.map(op => 
        op.id === newOperation.id 
          ? {
              ...op,
              status: 'completed',
              progress: 100,
              endTime: new Date().toISOString()
            }
          : op
      ));

      setAccounts(prev => prev.map(account => 
        account.id === accountId 
          ? {
              ...account,
              integration: {
                ...account.integration,
                lastSync: new Date().toISOString(),
                syncProgress: 100
              },
              usage: {
                ...account.usage,
                lastActivity: new Date().toISOString()
              }
            }
          : account
      ));
    }, 30000);
  };

  const getProviderColor = (provider: StorageAccount['provider']) => {
    switch (provider) {
      case 'TeraBox': return 'bg-blue-600';
      case 'Google Drive': return 'bg-red-600';
      case 'Dropbox': return 'bg-blue-800';
      case 'OneDrive': return 'bg-blue-700';
      case 'Mega': return 'bg-red-800';
      case 'pCloud': return 'bg-purple-600';
      case 'iCloud': return 'bg-gray-600';
      case 'Box': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: StorageAccount['integration']['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-600';
      case 'disconnected': return 'bg-red-600';
      case 'error': return 'bg-orange-600';
      case 'syncing': return 'bg-blue-600';
      case 'maintenance': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getOperationTypeColor = (type: StorageOperation['type']) => {
    switch (type) {
      case 'upload': return 'bg-green-600';
      case 'download': return 'bg-blue-600';
      case 'sync': return 'bg-purple-600';
      case 'backup': return 'bg-orange-600';
      case 'restore': return 'bg-pink-600';
      case 'delete': return 'bg-red-600';
      case 'move': return 'bg-yellow-600';
      case 'copy': return 'bg-cyan-600';
      case 'share': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredAccounts = () => {
    return accounts.filter(account => {
      const matchesSearch = account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           account.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvider = filterProvider === 'all' || account.provider === filterProvider;
      return matchesSearch && matchesProvider;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-purple-400" />
            Central Storage System
          </h1>
          <p className="text-gray-400">
            TeraBox-based central storage system for unified account and resource management
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <HardDrive className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Accounts</div>
                <div className="text-2xl font-bold">{stats.totalAccounts}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeAccounts}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Storage</div>
                <div className="text-2xl font-bold">{stats.totalStorage.toFixed(0)}GB</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Active Operations</div>
                <div className="text-2xl font-bold">{stats.activeOperations}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Speed</div>
                <div className="text-2xl font-bold">{stats.averageSpeed.toFixed(1)}MB/s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Storage Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSync}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isSyncing
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSyncing ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Sync
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Sync
                  </>
                )}
              </button>
              <button
                onClick={addAccount}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Account
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              Best Provider: {stats.bestProvider || 'None'} | 
              Available: {stats.availableStorage.toFixed(0)}GB | 
              Auto Sync: {config.autoSync ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Storage Accounts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Storage Accounts</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search accounts..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Providers</option>
                <option value="TeraBox">TeraBox</option>
                <option value="Google Drive">Google Drive</option>
                <option value="Dropbox">Dropbox</option>
                <option value="Mega">Mega</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredAccounts().map((account) => (
                <div
                  key={account.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAccount?.id === account.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${account.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{account.provider}</h4>
                        <div className="text-sm text-gray-400">{account.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getProviderColor(account.provider)}`}>
                        {account.plan}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(account.integration.status)}`}>
                        {account.integration.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Storage:</span> {account.specifications.usedStorage}/{account.specifications.totalStorage}
                    </div>
                    <div>
                      <span className="text-gray-400">Files:</span> {account.usage.filesCount.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Upload Speed:</span> {account.specifications.uploadSpeed}
                    </div>
                    <div>
                      <span className="text-gray-400">Download Speed:</span> {account.specifications.downloadSpeed}
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ 
                        width: `${(parseFloat(account.specifications.usedStorage.replace(/[^\d.]/g, '')) / 
                               parseFloat(account.specifications.totalStorage.replace(/[^\d.]/g, ''))) * 100}%` 
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {account.features.encryption && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Encrypted</span>
                      )}
                      {account.features.apiAccess && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">API</span>
                      )}
                      {account.security.twoFactorAuth && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">2FA</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {account.integration.status === 'disconnected' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            connectAccount(account.id);
                          }}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                        >
                          Connect
                        </button>
                      )}
                      {account.integration.status === 'connected' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            syncAccount(account.id);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                        >
                          Sync
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Account Details */}
          {selectedAccount && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Details: {selectedAccount.provider}</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Storage Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Storage:</span>
                        <span className="font-medium">{selectedAccount.specifications.totalStorage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Used Storage:</span>
                        <span className="font-medium">{selectedAccount.specifications.usedStorage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Available:</span>
                        <span className="font-medium">{selectedAccount.specifications.availableStorage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max File Size:</span>
                        <span className="font-medium">{selectedAccount.specifications.maxFileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Usage Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Files:</span>
                        <span className="font-medium">{selectedAccount.usage.filesCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Folders:</span>
                        <span className="font-medium">{selectedAccount.usage.foldersCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Shared Files:</span>
                        <span className="font-medium">{selectedAccount.usage.sharedFiles}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Uploads:</span>
                        <span className="font-medium">{selectedAccount.usage.totalUploads.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Integration Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedAccount.integration.status)}`}>
                          {selectedAccount.integration.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Sync:</span>
                        <span className="font-medium">{new Date(selectedAccount.integration.lastSync).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Auto Sync:</span>
                        <span className="font-medium">{selectedAccount.integration.autoSync ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sync Frequency:</span>
                        <span className="font-medium">{selectedAccount.integration.syncFrequency} min</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Security Features</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Encryption:</span>
                        <span className="font-medium">{selectedAccount.features.encryption ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">2FA:</span>
                        <span className="font-medium">{selectedAccount.security.twoFactorAuth ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">E2E Encryption:</span>
                        <span className="font-medium">{selectedAccount.security.endToEndEncryption ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">API Access:</span>
                        <span className="font-medium">{selectedAccount.features.apiAccess ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Operations */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Active Operations</h3>
          <div className="space-y-3">
            {operations.filter(op => op.status === 'running' || op.status === 'completed').map((operation) => (
              <div key={operation.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs ${getOperationTypeColor(operation.type)}`}>
                      {operation.type.toUpperCase()}
                    </span>
                    <div>
                      <h4 className="font-semibold">{operation.file.name}</h4>
                      <div className="text-sm text-gray-400">{operation.file.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      operation.status === 'running' ? 'bg-blue-600' :
                      operation.status === 'completed' ? 'bg-green-600' :
                      operation.status === 'failed' ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {operation.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      {operation.speed}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full ${
                      operation.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${operation.progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Progress:</span>
                    <span className="font-medium">{operation.progress.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Started:</span>
                    <span className="font-medium">{new Date(operation.startTime).toLocaleString()}</span>
                  </div>
                  {operation.estimatedTime && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">ETA:</span>
                      <span className="font-medium">{operation.estimatedTime}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {operations.filter(op => op.status === 'running' || op.status === 'completed').length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No active operations
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Storage System Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sync Frequency (minutes)</label>
                    <input
                      type="number"
                      value={config.syncFrequency}
                      onChange={(e) => setConfig(prev => ({ ...prev, syncFrequency: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="1440"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Backup Frequency (hours)</label>
                    <input
                      type="number"
                      value={config.backupFrequency}
                      onChange={(e) => setConfig(prev => ({ ...prev, backupFrequency: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="168"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoSync}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoSync: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Sync</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.backupEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, backupEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Backup Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.encryptionEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, encryptionEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Encryption</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.compressionEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, compressionEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Compression</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.deduplication}
                        onChange={(e) => setConfig(prev => ({ ...prev, deduplication: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Deduplication</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.loadBalancing}
                        onChange={(e) => setConfig(prev => ({ ...prev, loadBalancing: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Load Balancing</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Replication</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Replication Factor</label>
                      <input
                        type="number"
                        value={config.replication.factor}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          replication: { ...prev.replication, factor: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="1"
                        max="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Strategy</label>
                      <select
                        value={config.replication.strategy}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          replication: { ...prev.replication, strategy: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="delayed">Delayed</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Security</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.encryptCredentials}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, encryptCredentials: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Encrypt Credentials</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.auditLogging}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, auditLogging: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Audit Logging</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.accessControl}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, accessControl: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Access Control</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.dataIntegrity}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, dataIntegrity: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Data Integrity</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CentralStorageSystem;
