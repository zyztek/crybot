/**
 * Fingerprint Spoofing Component
 * 
 * Create advanced fingerprint spoofing with individual finger ID generation
 * Comprehensive fingerprint generation and spoofing system for maximum anonymity
 */

import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, Shield, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Users, Zap, Eye, EyeOff, RefreshCw, Lock, Unlock } from 'lucide-react';

interface FingerProfile {
  id: string;
  name: string;
  finger: 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
  hand: 'left' | 'right';
  pattern: {
    type: 'whorl' | 'loop' | 'arch' | 'tented_arch' | 'double_loop';
    complexity: number; // 1-10
    uniqueness: number; // 1-100
    minutiae: number; // count of minutiae points
    ridges: number; // count of ridge characteristics
  };
  biometrics: {
    pressure: number; // 1-10
    temperature: number; // Celsius
    moisture: number; // 1-100%
    electrical: number; // microvolts
    elasticity: number; // 1-10
  };
  characteristics: {
    core: boolean;
    delta: boolean;
    bifurcations: number;
    ridge_ending: number;
    dots: number;
    islands: number;
    enclosures: number;
    trifurcations: number;
  };
  spoofing: {
    technique: 'silicone' | 'gelatin' | 'latex' | 'conductive_ink' | '3d_printed' | 'optical';
    quality: number; // 1-10
    durability: number; // 1-10
    detection_resistance: number; // 1-100%
    success_rate: number; // 1-100%
  };
  usage: {
    total_scans: number;
    successful_scans: number;
    failed_scans: number;
    last_used: string;
    platforms_used: string[];
    average_scan_time: number; // milliseconds
  };
  metadata: {
    created_at: string;
    updated_at: string;
    version: string;
    algorithm: string;
    resolution: string;
    format: string;
  };
  status: 'active' | 'inactive' | 'compromised' | 'deprecated' | 'testing';
  is_default: boolean;
}

interface FingerprintDevice {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  type: 'optical' | 'capacitive' | 'ultrasonic' | 'thermal' | 'rfid';
  resolution: string;
  capture_area: string;
  accuracy: number; // 1-100%
  speed: number; // milliseconds
  anti_spoofing: {
    liveness_detection: boolean;
    pressure_detection: boolean;
    temperature_detection: boolean;
    pulse_detection: boolean;
    multi_spectral: boolean;
  };
  compatibility: {
    platforms: string[];
    apis: string[];
    protocols: string[];
  };
  features: {
    encryption: boolean;
    compression: boolean;
    template_extraction: boolean;
    image_enhancement: boolean;
    quality_assessment: boolean;
  };
  status: 'connected' | 'disconnected' | 'error' | 'updating';
  last_calibration: string;
  firmware_version: string;
}

interface SpoofingSession {
  id: string;
  finger_profile_id: string;
  finger_name: string;
  target_platform: string;
  target_device: string;
  technique: string;
  status: 'preparing' | 'active' | 'scanning' | 'authenticated' | 'failed' | 'cancelled';
  progress: {
    percentage: number;
    current_step: string;
    estimated_time: number; // seconds
    attempts: number;
    max_attempts: number;
  };
  results: {
    scan_count: number;
    success_count: number;
    failure_count: number;
    average_time: number;
    best_time: number;
    quality_score: number;
  };
  anti_detection: {
    randomization: number; // 1-100%
    variation: number; // 1-100%
    adaptive: boolean;
    learning: boolean;
  };
  started_at: string;
  completed_at?: string;
  error_message?: string;
}

interface FingerprintSpoofingConfig {
  autoMode: boolean;
  adaptiveSpoofing: boolean;
  randomization: boolean;
  learning: boolean;
  generation: {
    realistic_patterns: boolean;
    unique_minutiae: boolean;
    biometric_variance: boolean;
    quality_control: boolean;
  };
  spoofing: {
    multiple_techniques: boolean;
    adaptive_quality: boolean;
    real_time_adjustment: boolean;
    failure_recovery: boolean;
  };
  anti_detection: {
    pattern_variation: boolean;
    behavioral_simulation: boolean;
    environmental_adaptation: boolean;
    device_specific: boolean;
  };
  performance: {
    cache_profiles: boolean;
    precompute_templates: boolean;
    parallel_processing: boolean;
    optimization_level: number; // 1-10
  };
  security: {
    encrypt_storage: boolean;
    secure_deletion: boolean;
    access_logging: boolean;
    audit_trail: boolean;
  };
}

const FingerprintSpoofing: React.FC = () => {
  const [fingerProfiles, setFingerProfiles] = useState<FingerProfile[]>([]);
  const [devices, setDevices] = useState<FingerprintDevice[]>([]);
  const [sessions, setSessions] = useState<SpoofingSession[]>([]);
  const [config, setConfig] = useState<FingerprintSpoofingConfig>({
    autoMode: true,
    adaptiveSpoofing: true,
    randomization: true,
    learning: true,
    generation: {
      realistic_patterns: true,
      unique_minutiae: true,
      biometric_variance: true,
      quality_control: true
    },
    spoofing: {
      multiple_techniques: true,
      adaptive_quality: true,
      real_time_adjustment: true,
      failure_recovery: true
    },
    anti_detection: {
      pattern_variation: true,
      behavioral_simulation: true,
      environmental_adaptation: true,
      device_specific: true
    },
    performance: {
      cache_profiles: true,
      precompute_templates: true,
      parallel_processing: true,
      optimization_level: 8
    },
    security: {
      encrypt_storage: true,
      secure_deletion: true,
      access_logging: true,
      audit_trail: true
    }
  });
  const [selectedProfile, setSelectedProfile] = useState<FingerProfile | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<FingerprintDevice | null>(null);
  const [selectedSession, setSelectedSession] = useState<SpoofingSession | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFinger, setFilterFinger] = useState<string>('all');
  const [filterHand, setFilterHand] = useState<string>('all');
  const [stats, setStats] = useState({
    totalProfiles: 0,
    activeProfiles: 0,
    totalDevices: 0,
    connectedDevices: 0,
    totalSessions: 0,
    successfulSessions: 0,
    averageSuccessRate: 0,
    bestTechnique: ''
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock finger profiles initialization
  useEffect(() => {
    const mockProfiles: FingerProfile[] = [
      {
        id: 'finger-1',
        name: 'Primary Right Thumb',
        finger: 'thumb',
        hand: 'right',
        pattern: {
          type: 'whorl',
          complexity: 8,
          uniqueness: 94,
          minutiae: 156,
          ridges: 234
        },
        biometrics: {
          pressure: 7,
          temperature: 33.5,
          moisture: 65,
          electrical: 45,
          elasticity: 6
        },
        characteristics: {
          core: true,
          delta: true,
          bifurcations: 12,
          ridge_ending: 23,
          dots: 5,
          islands: 3,
          enclosures: 2,
          trifurcations: 1
        },
        spoofing: {
          technique: 'silicone',
          quality: 9,
          durability: 8,
          detection_resistance: 87,
          success_rate: 92
        },
        usage: {
          total_scans: 1247,
          successful_scans: 1147,
          failed_scans: 100,
          last_used: new Date().toISOString(),
          platforms_used: ['Android', 'iOS', 'Windows', 'Banking Apps'],
          average_scan_time: 1250
        },
        metadata: {
          created_at: '2024-01-15T00:00:00Z',
          updated_at: new Date().toISOString(),
          version: '2.1.0',
          algorithm: 'AdvancedMinutiae',
          resolution: '500dpi',
          format: 'ISO/IEC 19794-2'
        },
        status: 'active',
        is_default: true
      },
      {
        id: 'finger-2',
        name: 'Secondary Right Index',
        finger: 'index',
        hand: 'right',
        pattern: {
          type: 'loop',
          complexity: 7,
          uniqueness: 89,
          minutiae: 142,
          ridges: 198
        },
        biometrics: {
          pressure: 6,
          temperature: 32.8,
          moisture: 58,
          electrical: 42,
          elasticity: 7
        },
        characteristics: {
          core: true,
          delta: false,
          bifurcations: 8,
          ridge_ending: 18,
          dots: 3,
          islands: 2,
          enclosures: 1,
          trifurcations: 0
        },
        spoofing: {
          technique: 'gelatin',
          quality: 8,
          durability: 6,
          detection_resistance: 82,
          success_rate: 88
        },
        usage: {
          total_scans: 892,
          successful_scans: 785,
          failed_scans: 107,
          last_used: new Date(Date.now() - 3600000).toISOString(),
          platforms_used: ['iOS', 'Banking Apps', 'Auth Apps'],
          average_scan_time: 1180
        },
        metadata: {
          created_at: '2024-01-10T00:00:00Z',
          updated_at: new Date(Date.now() - 3600000).toISOString(),
          version: '2.1.0',
          algorithm: 'AdvancedMinutiae',
          resolution: '500dpi',
          format: 'ISO/IEC 19794-2'
        },
        status: 'active',
        is_default: false
      },
      {
        id: 'finger-3',
        name: 'Alternative Left Thumb',
        finger: 'thumb',
        hand: 'left',
        pattern: {
          type: 'arch',
          complexity: 6,
          uniqueness: 76,
          minutiae: 98,
          ridges: 156
        },
        biometrics: {
          pressure: 5,
          temperature: 31.2,
          moisture: 52,
          electrical: 38,
          elasticity: 8
        },
        characteristics: {
          core: false,
          delta: false,
          bifurcations: 5,
          ridge_ending: 12,
          dots: 2,
          islands: 1,
          enclosures: 0,
          trifurcations: 0
        },
        spoofing: {
          technique: 'latex',
          quality: 7,
          durability: 9,
          detection_resistance: 78,
          success_rate: 85
        },
        usage: {
          total_scans: 456,
          successful_scans: 388,
          failed_scans: 68,
          last_used: new Date(Date.now() - 7200000).toISOString(),
          platforms_used: ['Android', 'Time Tracking'],
          average_scan_time: 1320
        },
        metadata: {
          created_at: '2024-01-05T00:00:00Z',
          updated_at: new Date(Date.now() - 7200000).toISOString(),
          version: '2.0.0',
          algorithm: 'StandardMinutiae',
          resolution: '400dpi',
          format: 'ANSI 378'
        },
        status: 'active',
        is_default: false
      }
    ];

    setFingerProfiles(mockProfiles);
  }, []);

  // Mock devices initialization
  useEffect(() => {
    const mockDevices: FingerprintDevice[] = [
      {
        id: 'device-1',
        name: 'iPhone 14 Pro Sensor',
        manufacturer: 'Apple',
        model: 'A16 Bionic Secure Enclave',
        type: 'capacitive',
        resolution: '500dpi',
        capture_area: '16x20mm',
        accuracy: 98.5,
        speed: 150,
        anti_spoofing: {
          liveness_detection: true,
          pressure_detection: true,
          temperature_detection: true,
          pulse_detection: true,
          multi_spectral: false
        },
        compatibility: {
          platforms: ['iOS'],
          apis: ['TouchID API', 'LocalAuthentication'],
          protocols: ['Apple Secure Enclave']
        },
        features: {
          encryption: true,
          compression: true,
          template_extraction: true,
          image_enhancement: true,
          quality_assessment: true
        },
        status: 'connected',
        last_calibration: '2024-01-20T00:00:00Z',
        firmware_version: '2.4.1'
      },
      {
        id: 'device-2',
        name: 'Samsung Galaxy S23 Ultra',
        manufacturer: 'Samsung',
        model: 'Ultrasonic Sensor 2.0',
        type: 'ultrasonic',
        resolution: '600dpi',
        capture_area: '18x22mm',
        accuracy: 99.2,
        speed: 120,
        anti_spoofing: {
          liveness_detection: true,
          pressure_detection: true,
          temperature_detection: true,
          pulse_detection: true,
          multi_spectral: true
        },
        compatibility: {
          platforms: ['Android'],
          apis: ['Samsung Pass SDK', 'Android Biometric'],
          protocols: ['Qualcomm SecureMSM']
        },
        features: {
          encryption: true,
          compression: true,
          template_extraction: true,
          image_enhancement: true,
          quality_assessment: true
        },
        status: 'connected',
        last_calibration: '2024-01-18T00:00:00Z',
        firmware_version: '3.1.2'
      },
      {
        id: 'device-3',
        name: 'Windows Hello Fingerprint',
        manufacturer: 'Microsoft',
        model: 'Goodix GF3258',
        type: 'optical',
        resolution: '508dpi',
        capture_area: '14x18mm',
        accuracy: 96.8,
        speed: 200,
        anti_spoofing: {
          liveness_detection: true,
          pressure_detection: false,
          temperature_detection: false,
          pulse_detection: false,
          multi_spectral: false
        },
        compatibility: {
          platforms: ['Windows'],
          apis: ['Windows Hello API', 'WinBio'],
          protocols: ['Windows Biometric Framework']
        },
        features: {
          encryption: true,
          compression: true,
          template_extraction: true,
          image_enhancement: false,
          quality_assessment: true
        },
        status: 'connected',
        last_calibration: '2024-01-15T00:00:00Z',
        firmware_version: '1.8.5'
      }
    ];

    setDevices(mockDevices);
  }, []);

  // Mock sessions initialization
  useEffect(() => {
    const mockSessions: SpoofingSession[] = [
      {
        id: 'session-1',
        finger_profile_id: 'finger-1',
        finger_name: 'Primary Right Thumb',
        target_platform: 'Banking App',
        target_device: 'iPhone 14 Pro Sensor',
        technique: 'silicone',
        status: 'authenticated',
        progress: {
          percentage: 100,
          current_step: 'Authentication Complete',
          estimated_time: 0,
          attempts: 2,
          max_attempts: 5
        },
        results: {
          scan_count: 2,
          success_count: 1,
          failure_count: 1,
          average_time: 1250,
          best_time: 1180,
          quality_score: 87
        },
        anti_detection: {
          randomization: 85,
          variation: 78,
          adaptive: true,
          learning: true
        },
        started_at: new Date(Date.now() - 300000).toISOString(),
        completed_at: new Date(Date.now() - 295000).toISOString()
      },
      {
        id: 'session-2',
        finger_profile_id: 'finger-2',
        finger_name: 'Secondary Right Index',
        target_platform: 'Auth App',
        target_device: 'Samsung Galaxy S23 Ultra',
        technique: 'gelatin',
        status: 'scanning',
        progress: {
          percentage: 65,
          current_step: 'Analyzing biometric response',
          estimated_time: 15,
          attempts: 1,
          max_attempts: 5
        },
        results: {
          scan_count: 1,
          success_count: 0,
          failure_count: 0,
          average_time: 0,
          best_time: 0,
          quality_score: 0
        },
        anti_detection: {
          randomization: 92,
          variation: 85,
          adaptive: true,
          learning: true
        },
        started_at: new Date(Date.now() - 60000).toISOString()
      }
    ];

    setSessions(mockSessions);
  }, []);

  // Auto operations simulation
  useEffect(() => {
    if (!config.autoMode || !isOperating) return;

    const interval = setInterval(() => {
      // Update session progress
      setSessions(prev => prev.map(session => {
        if (session.status === 'scanning' || session.status === 'preparing') {
          const progressIncrement = Math.random() * 15 + 5;
          const newPercentage = Math.min(100, session.progress.percentage + progressIncrement);
          const newAttempts = session.progress.attempts + (Math.random() > 0.8 ? 1 : 0);
          
          // Determine session outcome
          if (newPercentage >= 100) {
            const success = Math.random() * 100 < session.anti_detection.randomization;
            return {
              ...session,
              status: success ? 'authenticated' : 'failed',
              progress: {
                ...session.progress,
                percentage: 100,
                current_step: success ? 'Authentication Complete' : 'Authentication Failed',
                attempts: newAttempts,
                estimated_time: 0
              },
              results: {
                scan_count: newAttempts,
                success_count: success ? 1 : 0,
                failure_count: success ? 0 : 1,
                average_time: 1180 + Math.random() * 200,
                best_time: 1100 + Math.random() * 100,
                quality_score: 75 + Math.random() * 20
              },
              completed_at: new Date().toISOString(),
              error_message: success ? undefined : 'Authentication failed - biometric mismatch detected'
            };
          }
          
          return {
            ...session,
            progress: {
              ...session.progress,
              percentage: newPercentage,
              current_step: newPercentage < 30 ? 'Initializing spoofing technique' :
                           newPercentage < 60 ? 'Calibrating biometric parameters' :
                           newPercentage < 90 ? 'Analyzing sensor response' :
                           'Finalizing authentication',
              attempts: newAttempts,
              estimated_time: Math.max(0, 30 - (newPercentage / 100) * 30)
            }
          };
        }
        return session;
      }));

      // Auto profile generation
      if (Math.random() > 0.9) { // 10% chance
        const fingers: FingerProfile['finger'][] = ['thumb', 'index', 'middle', 'ring', 'pinky'];
        const hands: FingerProfile['hand'][] = ['left', 'right'];
        const patterns: FingerProfile['pattern']['type'][] = ['whorl', 'loop', 'arch', 'tented_arch', 'double_loop'];
        const techniques: FingerProfile['spoofing']['technique'][] = ['silicone', 'gelatin', 'latex', 'conductive_ink', '3d_printed', 'optical'];
        
        const newProfile: FingerProfile = {
          id: `finger-${Date.now()}`,
          name: `Generated ${hands[Math.floor(Math.random() * hands.length)]} ${fingers[Math.floor(Math.random() * fingers.length)].charAt(0).toUpperCase() + fingers[Math.floor(Math.random() * fingers.length)].slice(1)}`,
          finger: fingers[Math.floor(Math.random() * fingers.length)],
          hand: hands[Math.floor(Math.random() * hands.length)],
          pattern: {
            type: patterns[Math.floor(Math.random() * patterns.length)],
            complexity: Math.floor(Math.random() * 5) + 6,
            uniqueness: Math.floor(Math.random() * 30) + 70,
            minutiae: Math.floor(Math.random() * 100) + 80,
            ridges: Math.floor(Math.random() * 150) + 120
          },
          biometrics: {
            pressure: Math.floor(Math.random() * 5) + 5,
            temperature: 30 + Math.random() * 5,
            moisture: Math.floor(Math.random() * 40) + 40,
            electrical: Math.floor(Math.random() * 20) + 35,
            elasticity: Math.floor(Math.random() * 5) + 5
          },
          characteristics: {
            core: Math.random() > 0.5,
            delta: Math.random() > 0.6,
            bifurcations: Math.floor(Math.random() * 15) + 3,
            ridge_ending: Math.floor(Math.random() * 20) + 8,
            dots: Math.floor(Math.random() * 8) + 1,
            islands: Math.floor(Math.random() * 5) + 1,
            enclosures: Math.floor(Math.random() * 3),
            trifurcations: Math.floor(Math.random() * 2)
          },
          spoofing: {
            technique: techniques[Math.floor(Math.random() * techniques.length)],
            quality: Math.floor(Math.random() * 3) + 7,
            durability: Math.floor(Math.random() * 4) + 6,
            detection_resistance: Math.floor(Math.random() * 20) + 75,
            success_rate: Math.floor(Math.random() * 15) + 80
          },
          usage: {
            total_scans: 0,
            successful_scans: 0,
            failed_scans: 0,
            last_used: new Date().toISOString(),
            platforms_used: [],
            average_scan_time: 1200
          },
          metadata: {
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            version: '2.1.0',
            algorithm: 'AdvancedMinutiae',
            resolution: '500dpi',
            format: 'ISO/IEC 19794-2'
          },
          status: 'testing',
          is_default: false
        };

        setFingerProfiles(prev => [...prev, newProfile]);
      }

      // Update profile usage stats
      setFingerProfiles(prev => prev.map(profile => {
        if (profile.status === 'active' && Math.random() > 0.8) { // 20% chance
          const newScans = Math.floor(Math.random() * 3) + 1;
          const successful = Math.floor(Math.random() * newScans) + 1;
          
          return {
            ...profile,
            usage: {
              ...profile.usage,
              total_scans: profile.usage.total_scans + newScans,
              successful_scans: profile.usage.successful_scans + successful,
              failed_scans: profile.usage.failed_scans + (newScans - successful),
              last_used: new Date().toISOString(),
              average_scan_time: profile.usage.average_scan_time + (Math.random() * 100 - 50)
            },
            metadata: {
              ...profile.metadata,
              updated_at: new Date().toISOString()
            }
          };
        }
        return profile;
      }));
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, [config.autoMode, isOperating]);

  // Update stats
  useEffect(() => {
    const activeProfiles = fingerProfiles.filter(p => p.status === 'active').length;
    const connectedDevices = devices.filter(d => d.status === 'connected').length;
    const successfulSessions = sessions.filter(s => s.status === 'authenticated').length;
    const averageSuccessRate = sessions.length > 0 
      ? (successfulSessions / sessions.length) * 100 
      : 0;
    
    const techniqueCounts = sessions.reduce((acc, session) => {
      acc[session.technique] = (acc[session.technique] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestTechnique = Object.entries(techniqueCounts).reduce((best, [technique, count]) => 
      count > (best?.count || 0) ? { technique, count } : best, null as { technique: string; count: number } | null);

    setStats({
      totalProfiles: fingerProfiles.length,
      activeProfiles,
      totalDevices: devices.length,
      connectedDevices,
      totalSessions: sessions.length,
      successfulSessions,
      averageSuccessRate,
      bestTechnique: bestTechnique?.technique || ''
    });
  }, [fingerProfiles, devices, sessions]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const startSpoofingSession = (profileId: string, deviceId: string, platform: string) => {
    const profile = fingerProfiles.find(p => p.id === profileId);
    const device = devices.find(d => d.id === deviceId);
    if (!profile || !device) return;

    const newSession: SpoofingSession = {
      id: `session-${Date.now()}`,
      finger_profile_id: profileId,
      finger_name: profile.name,
      target_platform: platform,
      target_device: device.name,
      technique: profile.spoofing.technique,
      status: 'preparing',
      progress: {
        percentage: 0,
        current_step: 'Initializing spoofing technique',
        estimated_time: 30,
        attempts: 0,
        max_attempts: 5
      },
      results: {
        scan_count: 0,
        success_count: 0,
        failure_count: 0,
        average_time: 0,
        best_time: 0,
        quality_score: 0
      },
      anti_detection: {
        randomization: 85 + Math.random() * 15,
        variation: 80 + Math.random() * 20,
        adaptive: true,
        learning: true
      },
      started_at: new Date().toISOString()
    };

    setSessions(prev => [...prev, newSession]);
  };

  const getPatternColor = (type: FingerProfile['pattern']['type']) => {
    switch (type) {
      case 'whorl': return 'bg-blue-600';
      case 'loop': return 'bg-green-600';
      case 'arch': return 'bg-purple-600';
      case 'tented_arch': return 'bg-orange-600';
      case 'double_loop': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTechniqueColor = (technique: FingerProfile['spoofing']['technique']) => {
    switch (technique) {
      case 'silicone': return 'bg-blue-600';
      case 'gelatin': return 'bg-green-600';
      case 'latex': return 'bg-purple-600';
      case 'conductive_ink': return 'bg-orange-600';
      case '3d_printed': return 'bg-red-600';
      case 'optical': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: FingerProfile['status'] | FingerprintDevice['status'] | SpoofingSession['status']) => {
    switch (status) {
      case 'active': case 'connected': case 'authenticated': return 'bg-green-600';
      case 'inactive': case 'disconnected': return 'bg-gray-600';
      case 'compromised': case 'error': case 'failed': return 'bg-red-600';
      case 'deprecated': case 'cancelled': return 'bg-orange-600';
      case 'testing': case 'updating': case 'preparing': case 'scanning': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredProfiles = () => {
    return fingerProfiles.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.finger.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.hand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFinger = filterFinger === 'all' || profile.finger === filterFinger;
      const matchesHand = filterHand === 'all' || profile.hand === filterHand;
      return matchesSearch && matchesFinger && matchesHand;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Fingerprint className="w-8 h-8 text-purple-400" />
            Fingerprint Spoofing
          </h1>
          <p className="text-gray-400">
            Create advanced fingerprint spoofing with individual finger ID generation
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Profiles</div>
                <div className="text-2xl font-bold">{stats.totalProfiles}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeProfiles}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Devices</div>
                <div className="text-2xl font-bold">{stats.connectedDevices}/{stats.totalDevices}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold">{stats.averageSuccessRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Best Technique</div>
                <div className="text-2xl font-bold">{stats.bestTechnique || 'None'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Spoofing Operations</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleOperation}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isOperating
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isOperating ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Spoofing
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Spoofing
                  </>
                )}
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
              Sessions: {stats.totalSessions} | 
              Successful: {stats.successfulSessions} | 
              Automation: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Finger Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Finger Profiles</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search profiles..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterFinger}
                onChange={(e) => setFilterFinger(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Fingers</option>
                <option value="thumb">Thumb</option>
                <option value="index">Index</option>
                <option value="middle">Middle</option>
                <option value="ring">Ring</option>
                <option value="pinky">Pinky</option>
              </select>
              <select
                value={filterHand}
                onChange={(e) => setFilterHand(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Hands</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredProfiles().map((profile) => (
                <div
                  key={profile.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProfile?.id === profile.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedProfile(profile)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(profile.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{profile.name}</h4>
                        <div className="text-sm text-gray-400">{profile.finger} - {profile.hand}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getPatternColor(profile.pattern.type)}`}>
                        {profile.pattern.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getTechniqueColor(profile.spoofing.technique)}`}>
                        {profile.spoofing.technique}
                      </span>
                      {profile.is_default && <span className="px-2 py-1 rounded text-xs bg-yellow-600">Default</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Uniqueness:</span> {profile.pattern.uniqueness}%
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {profile.spoofing.success_rate}%
                    </div>
                    <div>
                      <span className="text-gray-400">Total Scans:</span> {profile.usage.total_scans}
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Time:</span> {profile.usage.average_scan_time}ms
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${profile.spoofing.success_rate}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Quality: {profile.spoofing.quality}/10 | 
                        Detection Resistance: {profile.spoofing.detection_resistance}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Start spoofing with this profile
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredProfiles().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No profiles found
              </div>
            )}
          </div>

          {/* Selected Profile Details */}
          {selectedProfile && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Details: {selectedProfile.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Pattern Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedProfile.pattern.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Complexity:</span>
                        <span className="font-medium">{selectedProfile.pattern.complexity}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uniqueness:</span>
                        <span className="font-medium">{selectedProfile.pattern.uniqueness}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Minutiae:</span>
                        <span className="font-medium">{selectedProfile.pattern.minutiae}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Biometrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pressure:</span>
                        <span className="font-medium">{selectedProfile.biometrics.pressure}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Temperature:</span>
                        <span className="font-medium">{selectedProfile.biometrics.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Moisture:</span>
                        <span className="font-medium">{selectedProfile.biometrics.moisture}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Electrical:</span>
                        <span className="font-medium">{selectedProfile.biometrics.electrical}µV</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Spoofing</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Technique:</span>
                        <span className="font-medium">{selectedProfile.spoofing.technique}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quality:</span>
                        <span className="font-medium">{selectedProfile.spoofing.quality}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Durability:</span>
                        <span className="font-medium">{selectedProfile.spoofing.durability}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="font-medium">{selectedProfile.spoofing.success_rate}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Usage Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Scans:</span>
                        <span className="font-medium">{selectedProfile.usage.total_scans}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="font-medium">
                          {selectedProfile.usage.total_scans > 0 
                            ? ((selectedProfile.usage.successful_scans / selectedProfile.usage.total_scans) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Time:</span>
                        <span className="font-medium">{selectedProfile.usage.average_scan_time}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Platforms:</span>
                        <span className="font-medium">{selectedProfile.usage.platforms_used.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Characteristics */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Characteristics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedProfile.characteristics.core ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300">Core</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedProfile.characteristics.delta ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300">Delta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Bifurcations:</span>
                      <span className="text-gray-300">{selectedProfile.characteristics.bifurcations}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Ridge Endings:</span>
                      <span className="text-gray-300">{selectedProfile.characteristics.ridge_ending}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Devices */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Connected Devices</h3>
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{device.name}</h4>
                    <div className="text-sm text-gray-400">{device.manufacturer} - {device.model}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getPatternColor(device.type as any)}`}>
                      {device.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Resolution:</span> {device.resolution}
                  </div>
                  <div>
                    <span className="text-gray-400">Accuracy:</span> {device.accuracy}%
                  </div>
                  <div>
                    <span className="text-gray-400">Speed:</span> {device.speed}ms
                  </div>
                  <div>
                    <span className="text-gray-400">Capture Area:</span> {device.capture_area}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Firmware: {device.firmware_version} | 
                      Last Calibration: {new Date(device.last_calibration).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        // Start session with this device
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {devices.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No devices found
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
          <div className="space-y-4">
            {sessions.filter(s => s.status !== 'completed' && s.status !== 'failed' && s.status !== 'cancelled').map((session) => (
              <div key={session.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{session.finger_name}</h4>
                    <div className="text-sm text-gray-400">
                      {session.target_platform} - {session.target_device}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getTechniqueColor(session.technique as any)}`}>
                      {session.technique}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Progress:</span> {session.progress.percentage.toFixed(1)}%
                  </div>
                  <div>
                    <span className="text-gray-400">Current Step:</span> {session.progress.current_step}
                  </div>
                  <div>
                    <span className="text-gray-400">Attempts:</span> {session.progress.attempts}/{session.progress.max_attempts}
                  </div>
                  <div>
                    <span className="text-gray-400">Time Remaining:</span> {session.progress.estimated_time}s
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      session.status === 'authenticated' ? 'bg-green-500' :
                      session.status === 'failed' ? 'bg-red-500' :
                      session.status === 'scanning' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${session.progress.percentage}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Randomization: {session.anti_detection.randomization.toFixed(1)}% | 
                      Started: {new Date(session.started_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        // Cancel session
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {sessions.filter(s => s.status !== 'completed' && s.status !== 'failed' && s.status !== 'cancelled').length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No active sessions
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Fingerprint Spoofing Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Spoofing Mode</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoMode}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoMode: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Mode</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.adaptiveSpoofing}
                        onChange={(e) => setConfig(prev => ({ ...prev, adaptiveSpoofing: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Adaptive Spoofing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.randomization}
                        onChange={(e) => setConfig(prev => ({ ...prev, randomization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Randomization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.learning}
                        onChange={(e) => setConfig(prev => ({ ...prev, learning: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Learning</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Generation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.generation.realistic_patterns}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          generation: { ...prev.generation, realistic_patterns: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Realistic Patterns</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.generation.unique_minutiae}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          generation: { ...prev.generation, unique_minutiae: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Unique Minutiae</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.generation.biometric_variance}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          generation: { ...prev.generation, biometric_variance: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Biometric Variance</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.generation.quality_control}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          generation: { ...prev.generation, quality_control: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Quality Control</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Anti-Detection</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.anti_detection.pattern_variation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          anti_detection: { ...prev.anti_detection, pattern_variation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Pattern Variation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.anti_detection.behavioral_simulation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          anti_detection: { ...prev.anti_detection, behavioral_simulation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Behavioral Simulation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.anti_detection.environmental_adaptation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          anti_detection: { ...prev.anti_detection, environmental_adaptation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Environmental Adaptation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.anti_detection.device_specific}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          anti_detection: { ...prev.anti_detection, device_specific: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Device Specific</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Performance</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.performance.cache_profiles}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, cache_profiles: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Cache Profiles</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.performance.precompute_templates}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, precompute_templates: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Precompute Templates</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.performance.parallel_processing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          performance: { ...prev.performance, parallel_processing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Parallel Processing</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Optimization Level (1-10)</label>
                    <input
                      type="number"
                      value={config.performance.optimization_level}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        performance: { ...prev.performance, optimization_level: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="10"
                    />
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

export default FingerprintSpoofing;
