/**
 * Persona Identity System Component
 * 
 * Complete persona identity system with real person data, documents, and credentials
 * Includes IDs, passports, receipts, and complete personal information
 */

import React, { useState, useEffect, useRef } from 'react';
import { User, FileText, CreditCard, Phone, Mail, Globe, Shield, Camera, Download, Upload, Plus, Trash2, Edit2, Eye, EyeOff, Calendar, MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';

interface PersonalDocument {
  id: string;
  type: 'passport' | 'id_card' | 'driver_license' | 'social_security' | 'birth_certificate' | 'tax_id' | 'residence_permit';
  country: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  gender: 'male' | 'female' | 'other';
  photo: string; // base64
  signature: string; // base64
  qrCode: string; // base64
  verificationStatus: 'verified' | 'pending' | 'failed' | 'expired';
  metadata: {
    documentClass: string;
    machineReadable: boolean;
    biometricData: boolean;
    securityFeatures: string[];
  };
}

interface FinancialIdentity {
  id: string;
  bankAccounts: Array<{
    accountNumber: string;
    routingNumber: string;
    bankName: string;
    accountType: 'checking' | 'savings' | 'business';
    currency: string;
    balance: number;
    status: 'active' | 'inactive' | 'frozen';
  }>;
  creditCards: Array<{
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    cardType: 'visa' | 'mastercard' | 'amex' | 'discover';
    limit: number;
    currentBalance: number;
    status: 'active' | 'expired' | 'blocked';
  }>;
  taxRecords: Array<{
    year: number;
    taxId: string;
    filingStatus: string;
    income: number;
    taxPaid: number;
    refund: number;
    documents: string[];
  }>;
  receipts: Array<{
    id: string;
    type: 'purchase' | 'service' | 'utility' | 'rent' | 'subscription';
    merchant: string;
    amount: number;
    currency: string;
    date: string;
    category: string;
    receiptImage: string; // base64
    paymentMethod: string;
    taxIncluded: boolean;
  }>;
}

interface DigitalIdentity {
  id: string;
  emailAddresses: Array<{
    email: string;
    provider: string;
    isPrimary: boolean;
    isVerified: boolean;
    twoFactorEnabled: boolean;
    createdAt: string;
    lastUsed: string;
  }>;
  phoneNumbers: Array<{
    number: string;
    country: string;
    type: 'mobile' | 'landline' | 'voip';
    isPrimary: boolean;
    isVerified: boolean;
    carrier: string;
    activationDate: string;
  }>;
  socialMedia: Array<{
    platform: string;
    username: string;
    profileUrl: string;
    followerCount: number;
    isVerified: boolean;
    createdAt: string;
    lastActive: string;
  }>;
  cryptoWallets: Array<{
    address: string;
    blockchain: string;
    walletType: string;
    balance: number;
    transactions: number;
    createdAt: string;
    lastUsed: string;
  }>;
  onlineAccounts: Array<{
    service: string;
    username: string;
    email: string;
    password: string;
    twoFactorSecret: string;
    securityQuestions: Array<{question: string; answer: string}>;
    createdAt: string;
    lastLogin: string;
    accountStatus: 'active' | 'suspended' | 'banned';
  }>;
}

interface BiometricData {
  id: string;
  fingerprints: Array<{
    finger: 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
    hand: 'left' | 'right';
    imageData: string; // base64
    template: string; // encoded template
    quality: number; // 0-100
    scanDate: string;
  }>;
  facialRecognition: {
    frontalPhoto: string; // base64
    sideProfile: string; // base64
    facialFeatures: {
      eyeColor: string;
      hairColor: string;
      skinTone: string;
      faceShape: string;
      distinctiveFeatures: string[];
    };
    faceId: string; // encoded template
    livenessData: string; // proof of life
  };
  voiceProfile: {
    voiceSample: string; // base64 audio
    voicePrint: string; // encoded template
    language: string;
    accent: string;
    pitch: number;
    speed: number;
    emotionalRange: string[];
  };
  irisScan: {
    leftEye: string; // base64
    rightEye: string; // base64
    irisPattern: string; // encoded template
    scanDate: string;
  };
}

interface CompletePersona {
  id: string;
  uuid: string;
  basicInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    gender: 'male' | 'female' | 'other';
    height: number; // cm
    weight: number; // kg
    eyeColor: string;
    hairColor: string;
    bloodType: string;
  };
  contactInfo: {
    currentAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      coordinates: { lat: number; lng: number };
    };
    permanentAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    emergencyContacts: Array<{
      name: string;
      relationship: string;
      phone: string;
      email: string;
      address: string;
    }>;
  };
  professionalInfo: {
    occupation: string;
    employer: string;
    workAddress: string;
    workPhone: string;
    workEmail: string;
    income: number;
    employmentStatus: 'employed' | 'self-employed' | 'unemployed' | 'student' | 'retired';
    education: Array<{
      degree: string;
      institution: string;
      graduationYear: number;
      field: string;
      gpa?: number;
    }>;
    skills: string[];
    certifications: Array<{
      name: string;
      issuer: string;
      issueDate: string;
      expiryDate?: string;
      credentialId: string;
    }>;
  };
  documents: PersonalDocument[];
  financialIdentity: FinancialIdentity;
  digitalIdentity: DigitalIdentity;
  biometricData: BiometricData;
  personality: {
    traits: string[];
    interests: string[];
    habits: string[];
    communicationStyle: string;
    riskTolerance: 'low' | 'medium' | 'high';
    socialPreference: 'introvert' | 'extrovert' | 'ambivert';
    decisionMaking: string;
    emotionalIntelligence: number; // 0-100
  };
  medicalInfo: {
    bloodType: string;
    allergies: string[];
    medications: string[];
    conditions: string[];
    emergencyContact: string;
    organDonor: boolean;
    medicalId: string;
  };
  lifestyle: {
    diet: string;
    exercise: string;
    sleep: string;
    hobbies: string[];
    travel: string[];
    pets: string[];
    smoking: boolean;
    drinking: boolean;
  };
  createdAt: string;
  lastModified: string;
  verificationStatus: 'unverified' | 'partially_verified' | 'fully_verified' | 'flagged';
  riskScore: number; // 0-100
}

const PersonaIdentitySystem: React.FC = () => {
  const [personas, setPersonas] = useState<CompletePersona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<CompletePersona | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const [stats, setStats] = useState({
    totalPersonas: 0,
    fullyVerified: 0,
    partiallyVerified: 0,
    unverified: 0,
    flagged: 0,
    averageRiskScore: 0,
    totalDocuments: 0
  });

  // Mock personas initialization
  useEffect(() => {
    const mockPersonas: CompletePersona[] = [
      {
        id: 'persona-1',
        uuid: '550e8400-e29b-41d4-a716-446655440001',
        basicInfo: {
          firstName: 'John',
          lastName: 'Anderson',
          middleName: 'Michael',
          dateOfBirth: '1985-06-15',
          placeOfBirth: 'New York, USA',
          nationality: 'American',
          gender: 'male',
          height: 178,
          weight: 75,
          eyeColor: 'blue',
          hairColor: 'brown',
          bloodType: 'O+'
        },
        contactInfo: {
          currentAddress: {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
            coordinates: { lat: 40.7128, lng: -74.0060 }
          },
          permanentAddress: {
            street: '456 Oak Avenue',
            city: 'Boston',
            state: 'MA',
            zipCode: '02108',
            country: 'USA'
          },
          emergencyContacts: [
            {
              name: 'Sarah Anderson',
              relationship: 'Spouse',
              phone: '+1-555-0123',
              email: 'sarah.anderson@email.com',
              address: '123 Main Street, New York, NY 10001'
            }
          ]
        },
        professionalInfo: {
          occupation: 'Software Engineer',
          employer: 'Tech Corp',
          workAddress: '789 Tech Boulevard, San Francisco, CA 94105',
          workPhone: '+1-555-0456',
          workEmail: 'john.anderson@techcorp.com',
          income: 95000,
          employmentStatus: 'employed',
          education: [
            {
              degree: 'Bachelor of Science',
              institution: 'MIT',
              graduationYear: 2007,
              field: 'Computer Science',
              gpa: 3.8
            }
          ],
          skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning'],
          certifications: [
            {
              name: 'AWS Certified Solutions Architect',
              issuer: 'Amazon Web Services',
              issueDate: '2020-03-15',
              credentialId: 'AWS-ARCH-123456'
            }
          ]
        },
        documents: [
          {
            id: 'doc-1',
            type: 'passport',
            country: 'USA',
            documentNumber: 'C12345678',
            issueDate: '2018-01-15',
            expiryDate: '2028-01-14',
            issuingAuthority: 'U.S. Department of State',
            fullName: 'John Michael Anderson',
            dateOfBirth: '1985-06-15',
            placeOfBirth: 'New York, USA',
            nationality: 'American',
            gender: 'male',
            photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
            signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
            qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
            verificationStatus: 'verified',
            metadata: {
              documentClass: 'P',
              machineReadable: true,
              biometricData: true,
              securityFeatures: ['hologram', 'UV ink', 'microprint']
            }
          }
        ],
        financialIdentity: {
          bankAccounts: [
            {
              accountNumber: '****1234',
              routingNumber: '****5678',
              bankName: 'Chase Bank',
              accountType: 'checking',
              currency: 'USD',
              balance: 15420.50,
              status: 'active'
            }
          ],
          creditCards: [
            {
              cardNumber: '****-****-****-1234',
              expiryDate: '12/25',
              cvv: '***',
              cardholderName: 'John M. Anderson',
              cardType: 'visa',
              limit: 10000,
              currentBalance: 2340.75,
              status: 'active'
            }
          ],
          taxRecords: [
            {
              year: 2023,
              taxId: '123-45-6789',
              filingStatus: 'married_filing_jointly',
              income: 95000,
              taxPaid: 18500,
              refund: 450,
              documents: ['W2_2023.pdf', 'Schedule_A_2023.pdf']
            }
          ],
          receipts: [
            {
              id: 'receipt-1',
              type: 'purchase',
              merchant: 'Amazon',
              amount: 156.99,
              currency: 'USD',
              date: '2024-01-10',
              category: 'Electronics',
              receiptImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
              paymentMethod: 'Visa ****1234',
              taxIncluded: true
            }
          ]
        },
        digitalIdentity: {
          emailAddresses: [
            {
              email: 'john.anderson@email.com',
              provider: 'Gmail',
              isPrimary: true,
              isVerified: true,
              twoFactorEnabled: true,
              createdAt: '2010-03-15',
              lastUsed: '2024-01-20'
            }
          ],
          phoneNumbers: [
            {
              number: '+1-555-0123',
              country: 'USA',
              type: 'mobile',
              isPrimary: true,
              isVerified: true,
              carrier: 'Verizon',
              activationDate: '2015-06-01'
            }
          ],
          socialMedia: [
            {
              platform: 'LinkedIn',
              username: 'johnanderson',
              profileUrl: 'https://linkedin.com/in/johnanderson',
              followerCount: 1250,
              isVerified: false,
              createdAt: '2012-08-20',
              lastActive: '2024-01-19'
            }
          ],
          cryptoWallets: [
            {
              address: '0x1234567890abcdef1234567890abcdef12345678',
              blockchain: 'Ethereum',
              walletType: 'MetaMask',
              balance: 2.456,
              transactions: 156,
              createdAt: '2021-03-10',
              lastUsed: '2024-01-18'
            }
          ],
          onlineAccounts: [
            {
              service: 'Amazon',
              username: 'johnanderson',
              email: 'john.anderson@email.com',
              password: 'encrypted_password_123',
              twoFactorSecret: 'encrypted_2fa_secret',
              securityQuestions: [
                { question: 'What was your first pet\'s name?', answer: 'encrypted_answer' }
              ],
              createdAt: '2015-11-20',
              lastLogin: '2024-01-20',
              accountStatus: 'active'
            }
          ]
        },
        biometricData: {
          id: 'bio-1',
          fingerprints: [
            {
              finger: 'thumb',
              hand: 'right',
              imageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
              template: 'encoded_fingerprint_template_1',
              quality: 95,
              scanDate: '2023-01-15'
            },
            {
              finger: 'index',
              hand: 'right',
              imageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
              template: 'encoded_fingerprint_template_2',
              quality: 92,
              scanDate: '2023-01-15'
            }
          ],
          facialRecognition: {
            frontalPhoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
            sideProfile: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
            facialFeatures: {
              eyeColor: 'blue',
              hairColor: 'brown',
              skinTone: 'fair',
              faceShape: 'oval',
              distinctiveFeatures: ['small scar on left cheek']
            },
            faceId: 'encoded_face_id_12345',
            livenessData: 'liveness_verification_data_12345'
          },
          voiceProfile: {
            voiceSample: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA...',
            voicePrint: 'encoded_voice_print_12345',
            language: 'English',
            accent: 'American',
            pitch: 120,
            speed: 150,
            emotionalRange: ['happy', 'sad', 'angry', 'neutral']
          },
          irisScan: {
            leftEye: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
            rightEye: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
            irisPattern: 'encoded_iris_pattern_12345',
            scanDate: '2023-01-15'
          }
        },
        personality: {
          traits: ['analytical', 'detail-oriented', 'reliable', 'introverted'],
          interests: ['technology', 'coding', 'reading', 'hiking', 'photography'],
          habits: ['early riser', 'coffee drinker', 'regular exercise'],
          communicationStyle: 'direct and concise',
          riskTolerance: 'medium',
          socialPreference: 'introvert',
          decisionMaking: 'analytical',
          emotionalIntelligence: 75
        },
        medicalInfo: {
          bloodType: 'O+',
          allergies: ['penicillin'],
          medications: ['multivitamin'],
          conditions: [],
          emergencyContact: 'Sarah Anderson +1-555-0123',
          organDonor: true,
          medicalId: 'MED-123456'
        },
        lifestyle: {
          diet: 'balanced',
          exercise: 'regular',
          sleep: '7-8 hours',
          hobbies: ['coding', 'reading', 'hiking', 'photography'],
          travel: ['business', 'leisure'],
          pets: ['golden retriever'],
          smoking: false,
          drinking: 'occasionally'
        },
        createdAt: '2023-01-01T00:00:00Z',
        lastModified: '2024-01-20T10:30:00Z',
        verificationStatus: 'fully_verified',
        riskScore: 15
      }
    ];

    setPersonas(mockPersonas);
  }, []);

  // Update stats
  useEffect(() => {
    const fullyVerified = personas.filter(p => p.verificationStatus === 'fully_verified').length;
    const partiallyVerified = personas.filter(p => p.verificationStatus === 'partially_verified').length;
    const unverified = personas.filter(p => p.verificationStatus === 'unverified').length;
    const flagged = personas.filter(p => p.verificationStatus === 'flagged').length;
    const totalDocuments = personas.reduce((sum, p) => sum + p.documents.length, 0);
    const averageRiskScore = personas.length > 0 
      ? personas.reduce((sum, p) => sum + p.riskScore, 0) / personas.length 
      : 0;

    setStats({
      totalPersonas: personas.length,
      fullyVerified,
      partiallyVerified,
      unverified,
      flagged,
      averageRiskScore,
      totalDocuments
    });
  }, [personas]);

  const createPersona = () => {
    const newPersona: CompletePersona = {
      id: `persona-${Date.now()}`,
      uuid: generateUUID(),
      basicInfo: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        nationality: '',
        gender: 'male',
        height: 0,
        weight: 0,
        eyeColor: '',
        hairColor: '',
        bloodType: ''
      },
      contactInfo: {
        currentAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          coordinates: { lat: 0, lng: 0 }
        },
        permanentAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },
        emergencyContacts: []
      },
      professionalInfo: {
        occupation: '',
        employer: '',
        workAddress: '',
        workPhone: '',
        workEmail: '',
        income: 0,
        employmentStatus: 'unemployed',
        education: [],
        skills: [],
        certifications: []
      },
      documents: [],
      financialIdentity: {
        bankAccounts: [],
        creditCards: [],
        taxRecords: [],
        receipts: []
      },
      digitalIdentity: {
        emailAddresses: [],
        phoneNumbers: [],
        socialMedia: [],
        cryptoWallets: [],
        onlineAccounts: []
      },
      biometricData: {
        id: `bio-${Date.now()}`,
        fingerprints: [],
        facialRecognition: {
          frontalPhoto: '',
          sideProfile: '',
          facialFeatures: {
            eyeColor: '',
            hairColor: '',
            skinTone: '',
            faceShape: '',
            distinctiveFeatures: []
          },
          faceId: '',
          livenessData: ''
        },
        voiceProfile: {
          voiceSample: '',
          voicePrint: '',
          language: '',
          accent: '',
          pitch: 0,
          speed: 0,
          emotionalRange: []
        },
        irisScan: {
          leftEye: '',
          rightEye: '',
          irisPattern: '',
          scanDate: ''
        }
      },
      personality: {
        traits: [],
        interests: [],
        habits: [],
        communicationStyle: '',
        riskTolerance: 'medium',
        socialPreference: 'ambivert',
        decisionMaking: '',
        emotionalIntelligence: 50
      },
      medicalInfo: {
        bloodType: '',
        allergies: [],
        medications: [],
        conditions: [],
        emergencyContact: '',
        organDonor: false,
        medicalId: ''
      },
      lifestyle: {
        diet: '',
        exercise: '',
        sleep: '',
        hobbies: [],
        travel: [],
        pets: [],
        smoking: false,
        drinking: false
      },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      verificationStatus: 'unverified',
      riskScore: 50
    };

    setPersonas(prev => [...prev, newPersona]);
    setShowCreateForm(false);
  };

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const deletePersona = (personaId: string) => {
    setPersonas(prev => prev.filter(p => p.id !== personaId));
    if (selectedPersona?.id === personaId) {
      setSelectedPersona(null);
    }
  };

  const exportPersona = (persona: CompletePersona) => {
    const exportData = {
      persona,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `persona-${persona.basicInfo.firstName}-${persona.basicInfo.lastName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importPersona = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.persona) {
          setPersonas(prev => [...prev, { ...data.persona, id: `persona-${Date.now()}` }]);
        }
      } catch (error) {
        console.error('Invalid persona file:', error);
      }
    };
    reader.readAsText(file);
  };

  const getVerificationStatusColor = (status: CompletePersona['verificationStatus']) => {
    switch (status) {
      case 'fully_verified': return 'bg-green-600';
      case 'partially_verified': return 'bg-yellow-600';
      case 'unverified': return 'bg-gray-600';
      case 'flagged': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 20) return 'text-green-400';
    if (score < 40) return 'text-yellow-400';
    if (score < 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getFilteredPersonas = () => {
    return personas.filter(persona => {
      const matchesSearch = `${persona.basicInfo.firstName} ${persona.basicInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           persona.uuid.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVerification = filterVerification === 'all' || persona.verificationStatus === filterVerification;
      return matchesSearch && matchesVerification;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-purple-400" />
            Persona Identity System
          </h1>
          <p className="text-gray-400">
            Complete persona identity system with real person data, documents, and credentials
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Personas</div>
                <div className="text-2xl font-bold">{stats.totalPersonas}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Fully Verified</div>
                <div className="text-2xl font-bold">{stats.fullyVerified}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Total Documents</div>
                <div className="text-2xl font-bold">{stats.totalDocuments}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Risk Score</div>
                <div className={`text-2xl font-bold ${getRiskScoreColor(stats.averageRiskScore)}`}>
                  {stats.averageRiskScore.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Persona Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Persona
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                Import Persona
                <input
                  type="file"
                  accept=".json"
                  onChange={importPersona}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search personas by name or UUID..."
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="fully_verified">Fully Verified</option>
              <option value="partially_verified">Partially Verified</option>
              <option value="unverified">Unverified</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Persona Identities</h3>
            <div className="space-y-3">
              {getFilteredPersonas().map((persona) => (
                <div
                  key={persona.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPersona?.id === persona.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedPersona(persona)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {persona.basicInfo.firstName[0]?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {persona.basicInfo.firstName} {persona.basicInfo.lastName}
                        </h4>
                        <div className="text-sm text-gray-400 font-mono">
                          UUID: {persona.uuid.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getVerificationStatusColor(persona.verificationStatus)}`}>
                        {persona.verificationStatus.replace('_', ' ')}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportPersona(persona);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Export"
                      >
                        <Download className="w-4 h-4 text-green-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePersona(persona.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Age:</span> {calculateAge(persona.basicInfo.dateOfBirth)}
                    </div>
                    <div>
                      <span className="text-gray-400">Nationality:</span> {persona.basicInfo.nationality}
                    </div>
                    <div>
                      <span className="text-gray-400">Occupation:</span> {persona.professionalInfo.occupation}
                    </div>
                    <div>
                      <span className="text-gray-400">Risk Score:</span> 
                      <span className={getRiskScoreColor(persona.riskScore)}>
                        {persona.riskScore}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {persona.documents.length} Documents
                      </span>
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {persona.digitalIdentity.emailAddresses.length} Emails
                      </span>
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {persona.digitalIdentity.phoneNumbers.length} Phones
                      </span>
                    </div>
                    <div className="text-gray-400">
                      Modified: {new Date(persona.lastModified).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Persona Details */}
          {selectedPersona && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Persona Details</h3>
              <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Basic Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Full Name:</span> {selectedPersona.basicInfo.firstName} {selectedPersona.basicInfo.lastName}</div>
                      <div><span className="text-gray-400">Date of Birth:</span> {selectedPersona.basicInfo.dateOfBirth}</div>
                      <div><span className="text-gray-400">Place of Birth:</span> {selectedPersona.basicInfo.placeOfBirth}</div>
                      <div><span className="text-gray-400">Nationality:</span> {selectedPersona.basicInfo.nationality}</div>
                      <div><span className="text-gray-400">Gender:</span> {selectedPersona.basicInfo.gender}</div>
                      <div><span className="text-gray-400">Blood Type:</span> {selectedPersona.basicInfo.bloodType}</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Current Address:</span><br/>
                        {selectedPersona.contactInfo.currentAddress.street}<br/>
                        {selectedPersona.contactInfo.currentAddress.city}, {selectedPersona.contactInfo.currentAddress.state} {selectedPersona.contactInfo.currentAddress.zipCode}<br/>
                        {selectedPersona.contactInfo.currentAddress.country}
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Professional Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Occupation:</span> {selectedPersona.professionalInfo.occupation}</div>
                      <div><span className="text-gray-400">Employer:</span> {selectedPersona.professionalInfo.employer}</div>
                      <div><span className="text-gray-400">Income:</span> ${selectedPersona.professionalInfo.income.toLocaleString()}</div>
                      <div><span className="text-gray-400">Status:</span> {selectedPersona.professionalInfo.employmentStatus}</div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Documents ({selectedPersona.documents.length})</h4>
                    <div className="space-y-2">
                      {selectedPersona.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">{doc.type.replace('_', ' ').toUpperCase()}</span>
                            <span className="text-xs text-gray-400">{doc.country}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            doc.verificationStatus === 'verified' ? 'bg-green-600' :
                            doc.verificationStatus === 'pending' ? 'bg-yellow-600' :
                            doc.verificationStatus === 'failed' ? 'bg-red-600' : 'bg-gray-600'
                          }`}>
                            {doc.verificationStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Digital Identity */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Digital Identity</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Emails:</span> {selectedPersona.digitalIdentity.emailAddresses.length}
                      </div>
                      <div>
                        <span className="text-gray-400">Phones:</span> {selectedPersona.digitalIdentity.phoneNumbers.length}
                      </div>
                      <div>
                        <span className="text-gray-400">Social Media:</span> {selectedPersona.digitalIdentity.socialMedia.length}
                      </div>
                      <div>
                        <span className="text-gray-400">Crypto Wallets:</span> {selectedPersona.digitalIdentity.cryptoWallets.length}
                      </div>
                    </div>
                  </div>

                  {/* Biometric Data */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Biometric Data</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Fingerprints:</span> {selectedPersona.biometricData.fingerprints.length}
                      </div>
                      <div>
                        <span className="text-gray-400">Facial Recognition:</span> {selectedPersona.biometricData.facialRecognition.faceId ? 'Available' : 'Not Available'}
                      </div>
                      <div>
                        <span className="text-gray-400">Voice Profile:</span> {selectedPersona.biometricData.voiceProfile.voicePrint ? 'Available' : 'Not Available'}
                      </div>
                      <div>
                        <span className="text-gray-400">Iris Scan:</span> {selectedPersona.biometricData.irisScan.irisPattern ? 'Available' : 'Not Available'}
                      </div>
                    </div>
                  </div>

                  {/* Personality */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Personality Profile</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-400">Traits:</span> {selectedPersona.personality.traits.join(', ')}</div>
                      <div><span className="text-gray-400">Interests:</span> {selectedPersona.personality.interests.join(', ')}</div>
                      <div><span className="text-gray-400">Risk Tolerance:</span> {selectedPersona.personality.riskTolerance}</div>
                      <div><span className="text-gray-400">Social Preference:</span> {selectedPersona.personality.socialPreference}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export default PersonaIdentitySystem;
