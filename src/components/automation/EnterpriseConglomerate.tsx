/**
 * Enterprise Conglomerate Component
 *
 * Enterprise conglomerate system enabling personas to form business entities and corporate structures
 * Creates legal business entities, manages corporate structures, and enables enterprise-level operations
 */

import { Briefcase, Building, CheckCircle, DollarSign, Globe, Search, Settings, TrendingUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface BusinessEntity {
  id: string;
  name: string;
  type: 'sole_proprietorship' | 'partnership' | 'llc' | 'corporation' | 'holding_company' | 'non_profit' | 'trust' | 'foundation' | 'joint_venture';
  industry: 'technology' | 'finance' | 'consulting' | 'trading' | 'investment' | 'real_estate' | 'entertainment' | 'education' | 'healthcare' | 'retail' | 'manufacturing' | 'services' | 'crypto' | 'ai_ml' | 'adult';
  jurisdiction: string;
  registration: {
    registrationNumber: string;
    dateIncorporated: string;
    status: 'pending' | 'approved' | 'active' | 'suspended' | 'revoked';
    authority: string;
    licenseNumber?: string;
    permits: string[];
    compliance: {
      taxId: string;
      ein: string;
      duns: string;
      businessLicense: string;
      specialPermits: string[];
    };
  };
  structure: {
    legalStructure: string;
    ownership: Array<{
      personaId: string;
      percentage: number;
      role: string;
      votingRights: boolean;
      liability: 'limited' | 'unlimited';
    }>;
    management: Array<{
      personaId: string;
      title: string;
      responsibilities: string[];
      authority: number; // 0-100
      decisionMaking: 'executive' | 'managerial' | 'operational';
    }>;
    subsidiaries: string[]; // entity IDs
    departments: Array<{
      name: string;
      headId: string;
      employees: number;
      budget: number;
      functions: string[];
    }>;
  };
  operations: {
    primaryActivities: string[];
    secondaryActivities: string[];
    services: Array<{
      name: string;
      description: string;
      pricing: {
        model: 'fixed' | 'hourly' | 'project' | 'subscription' | 'commission' | 'revenue_share';
        rates: Array<{
          service: string;
          price: number;
          currency: string;
          unit: string;
        }>;
      };
      delivery: string[];
      targetMarket: string[];
    }>;
    revenue: {
      streams: string[];
      projections: Array<{
        year: number;
        revenue: number;
        profit: number;
        growth: number;
      }>;
      actual: Array<{
        year: number;
        revenue: number;
        profit: number;
        growth: number;
      }>;
    };
    expenses: {
      operating: number;
      administrative: number;
      marketing: number;
      legal: number;
      taxes: number;
      other: number;
    };
    assets: {
      cash: number;
      investments: number;
      equipment: number;
      intellectualProperty: string[];
      realEstate: string[];
      digitalAssets: string[];
    };
  };
  compliance: {
    taxCompliance: boolean;
    regulatoryCompliance: boolean;
    reportingRequirements: string[];
    auditHistory: Array<{
      date: string;
      type: string;
      result: string;
      findings: string[];
    }>;
    licenses: Array<{
      type: string;
      number: string;
      issued: string;
      expires: string;
      status: 'active' | 'expired' | 'suspended' | 'pending';
      authority: string;
    }>;
    insurance: {
      generalLiability: boolean;
      professionalLiability: boolean;
      workersCompensation: boolean;
      cyberInsurance: boolean;
      directorsAndOfficers: boolean;
    };
  };
  status: 'forming' | 'active' | 'expanding' | 'merging' | 'dissolving' | 'suspended' | 'inactive';
  createdAt: string;
  lastUpdated: string;
}

interface Conglomerate {
  id: string;
  name: string;
  tier: 'startup' | 'small_business' | 'medium_enterprise' | 'large_enterprise' | 'multinational' | 'holding_company';
  headquarters: {
    country: string;
    state: string;
    city: string;
    address: string;
    virtual: boolean;
  };
  entities: string[]; // entity IDs
  holdings: {
    subsidiaries: string[];
    investments: Array<{
      entityId: string;
      percentage: number;
      investmentAmount: number;
      date: string;
      type: 'equity' | 'debt' | 'joint_venture' | 'acquisition';
    }>;
    partnerships: Array<{
      entityId: string;
      type: string;
      terms: string;
      revenueShare: number;
      duration: string;
    }>;
  };
  governance: {
    boardOfDirectors: Array<{
      personaId: string;
      title: string;
      votingRights: number;
      committees: string[];
      term: string;
    }>;
    executiveTeam: Array<{
      personaId: string;
      title: string;
      department: string;
      reportsTo: string;
      authority: number; // 0-100
    }>;
    shareholders: Array<{
      personaId: string;
      shares: number;
      class: string;
      votingRights: number;
      dividendRights: boolean;
    }>;
    votingStructure: 'one_share_one_vote' | 'weighted' | 'dual_class' | 'proxy';
  };
  financial: {
    totalRevenue: number;
    totalProfit: number;
    totalAssets: number;
    totalLiabilities: number;
    marketCap: number;
    stockPrice?: number;
    sharesOutstanding?: number;
    debtToEquity: number;
    currentRatio: number;
    cashFlow: number;
    creditRating: string;
  };
  operations: {
    globalPresence: Array<{
      country: string;
      offices: number;
      employees: number;
      revenue: number;
      marketShare: number;
    }>;
    supplyChain: {
      suppliers: string[];
      distributors: string[];
      partners: string[];
      logistics: string[];
    };
    technology: {
      platforms: string[];
      systems: string[];
      infrastructure: string[];
      intellectualProperty: string[];
    };
    riskManagement: {
      insurance: string[];
      compliance: string[];
      cybersecurity: string[];
      legal: string[];
      financial: string[];
    };
  };
  strategy: {
    vision: string;
    mission: string;
    values: string[];
    objectives: Array<{
      title: string;
      description: string;
      kpis: string[];
      deadline: string;
      priority: 'low' | 'medium' | 'high' | 'critical';
    }>;
    growthStrategy: 'organic' | 'acquisition' | 'partnership' | 'franchise' | 'licensing' | 'joint_venture';
    marketPosition: string;
    competitiveAdvantage: string[];
    diversification: string[];
  };
  status: 'forming' | 'active' | 'expanding' | 'restructuring' | 'merging' | 'divesting' | 'dissolving';
  createdAt: string;
  lastActivity: string;
}

interface ConglomerateConfig {
  autoFormation: boolean;
  autoCompliance: boolean;
  autoReporting: boolean;
  taxOptimization: boolean;
  riskManagement: boolean;
  growthEnabled: boolean;
  legal: {
    jurisdictionOptimization: boolean;
    taxHaven: boolean;
    assetProtection: boolean;
    liabilityShielding: boolean;
    complianceAutomation: boolean;
  };
  financial: {
    automatedAccounting: boolean;
    cashManagement: boolean;
    investmentOptimization: boolean;
    debtManagement: boolean;
    currencyDiversification: boolean;
  };
  operations: {
    automationEnabled: boolean;
    processOptimization: boolean;
    resourceAllocation: boolean;
    performanceMonitoring: boolean;
    qualityControl: boolean;
  };
  governance: {
    boardAutomation: boolean;
    shareholderManagement: boolean;
    complianceMonitoring: boolean;
    riskAssessment: boolean;
    reportingAutomation: boolean;
  };
}

const EnterpriseConglomerate: React.FC = () => {
  const [entities, setEntities] = useState<BusinessEntity[]>([]);
  const [conglomerates, setConglomerates] = useState<Conglomerate[]>([]);
  const [config, setConfig] = useState<ConglomerateConfig>({
    autoFormation: true,
    autoCompliance: true,
    autoReporting: true,
    taxOptimization: true,
    riskManagement: true,
    growthEnabled: true,
    legal: {
      jurisdictionOptimization: true,
      taxHaven: false,
      assetProtection: true,
      liabilityShielding: true,
      complianceAutomation: true
    },
    financial: {
      automatedAccounting: true,
      cashManagement: true,
      investmentOptimization: true,
      debtManagement: true,
      currencyDiversification: true
    },
    operations: {
      automationEnabled: true,
      processOptimization: true,
      resourceAllocation: true,
      performanceMonitoring: true,
      qualityControl: true
    },
    governance: {
      boardAutomation: true,
      shareholderManagement: true,
      complianceMonitoring: true,
      riskAssessment: true,
      reportingAutomation: true
    }
  });
  const [selectedEntity, setSelectedEntity] = useState<BusinessEntity | null>(null);
  const [selectedConglomerate, setSelectedConglomerate] = useState<Conglomerate | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [stats, setStats] = useState({
    totalEntities: 0,
    activeEntities: 0,
    totalConglomerates: 0,
    activeConglomerates: 0,
    totalRevenue: 0,
    totalAssets: 0,
    bestIndustry: '',
    averageGrowth: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock business entities initialization
  useEffect(() => {
    const mockEntities: BusinessEntity[] = [
      {
        id: 'entity-1',
        name: 'TechGenius Solutions LLC',
        type: 'llc',
        industry: 'technology',
        jurisdiction: 'Delaware, USA',
        registration: {
          registrationNumber: 'DE-1234567890',
          dateIncorporated: '2024-01-15T00:00:00Z',
          status: 'active',
          authority: 'Delaware Division of Corporations',
          licenseNumber: 'TECH-2024-001',
          permits: ['Business License', 'Software Development Permit'],
          compliance: {
            taxId: '12-3456789',
            ein: '12-3456789',
            duns: '12-3456789',
            businessLicense: 'BL-2024-001',
            specialPermits: ['Software Development', 'Data Processing']
          }
        },
        structure: {
          legalStructure: 'Limited Liability Company',
          ownership: [
            {
              personaId: 'persona-1',
              percentage: 60,
              role: 'Managing Member',
              votingRights: true,
              liability: 'limited'
            },
            {
              personaId: 'persona-2',
              percentage: 40,
              role: 'Member',
              votingRights: true,
              liability: 'limited'
            }
          ],
          management: [
            {
              personaId: 'persona-1',
              title: 'CEO',
              responsibilities: ['Strategic Planning', 'Business Development', 'Financial Management'],
              authority: 95,
              decisionMaking: 'executive'
            },
            {
              personaId: 'persona-2',
              title: 'CTO',
              responsibilities: ['Technology Development', 'System Architecture', 'Team Management'],
              authority: 85,
              decisionMaking: 'executive'
            }
          ],
          subsidiaries: [],
          departments: [
            {
              name: 'Development',
              headId: 'persona-2',
              employees: 5,
              budget: 500000,
              functions: ['Software Development', 'Testing', 'Deployment']
            },
            {
              name: 'Sales',
              headId: 'persona-1',
              employees: 3,
              budget: 200000,
              functions: ['Business Development', 'Client Relations', 'Sales']
            }
          ]
        },
        operations: {
          primaryActivities: ['Software Development', 'IT Consulting', 'Cloud Services'],
          secondaryActivities: ['Training', 'Support', 'Maintenance'],
          services: [
            {
              name: 'Custom Software Development',
              description: 'Tailored software solutions for businesses',
              pricing: {
                model: 'project',
                rates: [
                  { service: 'Web Development', price: 5000, currency: 'USD', unit: 'project' },
                  { service: 'Mobile App', price: 8000, currency: 'USD', unit: 'project' },
                  { service: 'Enterprise System', price: 25000, currency: 'USD', unit: 'project' }
                ]
              },
              delivery: ['Remote', 'On-site'],
              targetMarket: ['Small Business', 'Enterprise', 'Startup']
            }
          ],
          revenue: {
            streams: ['Software Development', 'IT Consulting', 'Support Services'],
            projections: [
              { year: 2024, revenue: 250000, profit: 75000, growth: 25 },
              { year: 2025, revenue: 312500, profit: 93750, growth: 25 }
            ],
            actual: [
              { year: 2024, revenue: 180000, profit: 54000, growth: 20 }
            ]
          },
          expenses: {
            operating: 80000,
            administrative: 25000,
            marketing: 30000,
            legal: 15000,
            taxes: 30000,
            other: 10000
          },
          assets: {
            cash: 50000,
            investments: 75000,
            equipment: 100000,
            intellectualProperty: ['Software Copyrights', 'Patents Pending'],
            realEstate: [],
            digitalAssets: ['Domain Names', 'Software Licenses']
          }
        },
        compliance: {
          taxCompliance: true,
          regulatoryCompliance: true,
          reportingRequirements: ['Annual Report', 'Tax Returns', 'Financial Statements'],
          auditHistory: [
            {
              date: '2024-03-01T00:00:00Z',
              type: 'Financial Audit',
              result: 'Clean',
              findings: []
            }
          ],
          licenses: [
            {
              type: 'Business License',
              number: 'BL-2024-001',
              issued: '2024-01-15T00:00:00Z',
              expires: '2025-01-14T00:00:00Z',
              status: 'active',
              authority: 'Delaware Division of Corporations'
            }
          ],
          insurance: {
            generalLiability: true,
            professionalLiability: true,
            workersCompensation: true,
            cyberInsurance: true,
            directorsAndOfficers: true
          }
        },
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'entity-2',
        name: 'Global Trading Corp',
        type: 'corporation',
        industry: 'finance',
        jurisdiction: 'Cayman Islands',
        registration: {
          registrationNumber: 'CI-987654321',
          dateIncorporated: '2024-02-01T00:00:00Z',
          status: 'active',
          authority: 'Cayman Islands Monetary Authority',
          licenseNumber: 'FIN-2024-002',
          permits: ['Financial Services License', 'Trading License'],
          compliance: {
            taxId: 'CI-987654321',
            ein: 'CI-987654321',
            duns: 'CI-987654321',
            businessLicense: 'FS-2024-002',
            specialPermits: ['Financial Services', 'Trading', 'Investment Advisory']
          }
        },
        structure: {
          legalStructure: 'International Business Company',
          ownership: [
            {
              personaId: 'persona-3',
              percentage: 51,
              role: 'Controlling Shareholder',
              votingRights: true,
              liability: 'limited'
            },
            {
              personaId: 'persona-4',
              percentage: 49,
              role: 'Shareholder',
              votingRights: true,
              liability: 'limited'
            }
          ],
          management: [
            {
              personaId: 'persona-3',
              title: 'President',
              responsibilities: ['Strategic Direction', 'Investment Decisions', 'Risk Management'],
              authority: 100,
              decisionMaking: 'executive'
            },
            {
              personaId: 'persona-4',
              title: 'Chief Investment Officer',
              responsibilities: ['Trading Strategy', 'Portfolio Management', 'Market Analysis'],
              authority: 90,
              decisionMaking: 'executive'
            }
          ],
          subsidiaries: [],
          departments: [
            {
              name: 'Trading',
              headId: 'persona-4',
              employees: 8,
              budget: 1000000,
              functions: ['Day Trading', 'Swing Trading', 'Arbitrage', 'Market Making']
            },
            {
              name: 'Research',
              headId: 'persona-3',
              employees: 4,
              budget: 300000,
              functions: ['Market Research', 'Technical Analysis', 'Fundamental Analysis']
            }
          ]
        },
        operations: {
          primaryActivities: ['Day Trading', 'Swing Trading', 'Arbitrage', 'Market Making'],
          secondaryActivities: ['Research', 'Consulting', 'Education'],
          services: [
            {
              name: 'Trading Services',
              description: 'Professional trading and investment services',
              pricing: {
                model: 'commission',
                rates: [
                  { service: 'Day Trading', price: 2, currency: 'USD', unit: '%' },
                  { service: 'Swing Trading', price: 1.5, currency: 'USD', unit: '%' },
                  { service: 'Arbitrage', price: 1, currency: 'USD', unit: '%' }
                ]
              },
              delivery: ['Online', 'Mobile'],
              targetMarket: ['Retail Investors', 'Institutional Investors', 'High Net Worth Individuals']
            }
          ],
          revenue: {
            streams: ['Trading Commissions', 'Investment Returns', 'Consulting Fees'],
            projections: [
              { year: 2024, revenue: 2000000, profit: 800000, growth: 50 },
              { year: 2025, revenue: 3000000, profit: 1200000, growth: 50 }
            ],
            actual: [
              { year: 2024, revenue: 1500000, profit: 600000, growth: 40 }
            ]
          },
          expenses: {
            operating: 400000,
            administrative: 200000,
            marketing: 150000,
            legal: 100000,
            taxes: 200000,
            other: 50000
          },
          assets: {
            cash: 200000,
            investments: 800000,
            equipment: 50000,
            intellectualProperty: ['Trading Algorithms', 'Market Analysis Models'],
            realEstate: [],
            digitalAssets: ['Cryptocurrency Holdings', 'Trading Accounts']
          }
        },
        compliance: {
          taxCompliance: true,
          regulatoryCompliance: true,
          reportingRequirements: ['Quarterly Reports', 'Annual Statements', 'Regulatory Filings'],
          auditHistory: [
            {
              date: '2024-03-15T00:00:00Z',
              type: 'Regulatory Audit',
              result: 'Clean',
              findings: []
            }
          ],
          licenses: [
            {
              type: 'Financial Services License',
              number: 'FS-2024-002',
              issued: '2024-02-01T00:00:00Z',
              expires: '2025-02-01T00:00:00Z',
              status: 'active',
              authority: 'Cayman Islands Monetary Authority'
            }
          ],
          insurance: {
            generalLiability: false,
            professionalLiability: true,
            workersCompensation: false,
            cyberInsurance: true,
            directorsAndOfficers: true
          }
        },
        status: 'active',
        createdAt: '2024-02-01T00:00:00Z',
        lastUpdated: new Date().toISOString()
      }
    ];

    setEntities(mockEntities);
  }, []);

  // Mock conglomerates initialization
  useEffect(() => {
    const mockConglomerates: Conglomerate[] = [
      {
        id: 'conglomerate-1',
        name: 'Innovation Holdings International',
        tier: 'medium_enterprise',
        headquarters: {
          country: 'Switzerland',
          state: 'Zug',
          city: 'Zug',
          address: 'Bahnhofstrasse 1, 6300 Zug',
          virtual: true
        },
        entities: ['entity-1', 'entity-2'],
        holdings: {
          subsidiaries: [],
          investments: [
            {
              entityId: 'entity-1',
              percentage: 100,
              investmentAmount: 500000,
              date: '2024-01-15T00:00:00Z',
              type: 'equity'
            },
            {
              entityId: 'entity-2',
              percentage: 100,
              investmentAmount: 1000000,
              date: '2024-02-01T00:00:00Z',
              type: 'equity'
            }
          ],
          partnerships: [
            {
              entityId: 'entity-1',
              type: 'Strategic Partnership',
              terms: 'Revenue sharing for joint projects',
              revenueShare: 30,
              duration: '5 years'
            }
          ]
        },
        governance: {
          boardOfDirectors: [
            {
              personaId: 'persona-1',
              title: 'Chairman',
              votingRights: 100,
              committees: ['Executive', 'Audit', 'Strategy'],
              term: '3 years'
            },
            {
              personaId: 'persona-3',
              title: 'Board Member',
              votingRights: 100,
              committees: ['Investment', 'Risk'],
              term: '3 years'
            }
          ],
          executiveTeam: [
            {
              personaId: 'persona-1',
              title: 'CEO',
              department: 'Executive',
              reportsTo: 'Board of Directors',
              authority: 100
            },
            {
              personaId: 'persona-2',
              title: 'CTO',
              department: 'Technology',
              reportsTo: 'CEO',
              authority: 85
            }
          ],
          shareholders: [
            {
              personaId: 'persona-1',
              shares: 1000000,
              class: 'Common',
              votingRights: 1000000,
              dividendRights: true
            },
            {
              personaId: 'persona-3',
              shares: 500000,
              class: 'Common',
              votingRights: 500000,
              dividendRights: true
            }
          ],
          votingStructure: 'one_share_one_vote'
        },
        financial: {
          totalRevenue: 1680000,
          totalProfit: 654000,
          totalAssets: 2500000,
          totalLiabilities: 500000,
          marketCap: 5000000,
          sharesOutstanding: 1000000,
          debtToEquity: 0.2,
          currentRatio: 2.5,
          cashFlow: 300000,
          creditRating: 'A-'
        },
        operations: {
          globalPresence: [
            {
              country: 'Switzerland',
              offices: 1,
              employees: 15,
              revenue: 500000,
              marketShare: 2.5
            },
            {
              country: 'United States',
              offices: 2,
              employees: 8,
              revenue: 800000,
              marketShare: 1.5
            }
          ],
          supplyChain: {
            suppliers: ['Cloud Providers', 'Software Vendors', 'Consulting Firms'],
            distributors: ['Direct Sales', 'Partner Networks'],
            partners: ['Technology Partners', 'Strategic Alliances'],
            logistics: ['Digital Delivery', 'Remote Support']
          },
          technology: {
            platforms: ['Cloud Infrastructure', 'Development Tools', 'Trading Platforms'],
            systems: ['ERP System', 'CRM System', 'Financial System'],
            infrastructure: ['AWS', 'Google Cloud', 'Azure'],
            intellectualProperty: ['Software Copyrights', 'Patents', 'Trademarks']
          },
          riskManagement: {
            insurance: ['Professional Liability', 'Cyber Insurance', 'Directors & Officers'],
            compliance: ['Regulatory Compliance', 'Tax Compliance', 'AML/KYC'],
            cybersecurity: ['Firewall', 'Encryption', 'Monitoring', 'Incident Response'],
            legal: ['Corporate Counsel', 'Compliance Officer', 'Audit Committee'],
            financial: ['Cash Management', 'Investment Controls', 'Risk Assessment']
          }
        },
        strategy: {
          vision: 'To be a leading technology and financial services conglomerate through innovation and strategic expansion',
          mission: 'Provide innovative technology solutions and financial services while maximizing shareholder value',
          values: ['Innovation', 'Integrity', 'Excellence', 'Growth', 'Collaboration'],
          objectives: [
            {
              title: 'Market Expansion',
              description: 'Expand into 3 new markets within 2 years',
              kpis: ['Market Share', 'Revenue Growth', 'Customer Acquisition'],
              deadline: '2026-01-01T00:00:00Z',
              priority: 'high'
            },
            {
              title: 'Product Innovation',
              description: 'Launch 5 new products/services annually',
              kpis: ['Product Launches', 'Adoption Rate', 'Customer Satisfaction'],
              deadline: '2025-12-31T00:00:00Z',
              priority: 'high'
            }
          ],
          growthStrategy: 'acquisition',
          marketPosition: 'Innovative Technology and Financial Services Provider',
          competitiveAdvantage: ['Technology Expertise', 'Global Reach', 'Innovation Culture', 'Strategic Partnerships'],
          diversification: ['Technology Services', 'Financial Services', 'Consulting', 'Education']
        },
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date().toISOString()
      }
    ];

    setConglomerates(mockConglomerates);
  }, []);

  // Auto operations simulation
  useEffect(() => {
    if (!isOperating) return;

    const interval = setInterval(() => {
      // Simulate revenue generation
      entities.forEach(entity => {
        if (entity.status !== 'active') return;

        const monthlyRevenue = entity.operations.revenue.actual[0]?.revenue || 0;
        const monthlyGrowth = Math.random() * 0.1 + 0.05; // 5-15% monthly growth

        setEntities(prev => prev.map(e =>
          e.id === entity.id
            ? {
                ...e,
                operations: {
                  ...e.operations,
                  revenue: {
                    ...e.operations.revenue,
                    actual: e.operations.revenue.actual.map((actual, index) => ({
                      ...actual,
                      revenue: actual.revenue + (monthlyRevenue * monthlyGrowth),
                      profit: actual.profit + (monthlyRevenue * monthlyGrowth * 0.4), // 40% profit margin
                      growth: actual.growth + (monthlyGrowth * 100)
                    }))
                  }
                }
              } : e
        ));
      });

      // Simulate conglomerate growth
      conglomerates.forEach(conglomerate => {
        if (conglomerate.status !== 'active') return;

        const quarterlyGrowth = Math.random() * 0.08 + 0.02; // 2-10% quarterly growth

        setConglomerates(prev => prev.map(c =>
          c.id === conglomerate.id
            ? {
                ...c,
                financial: {
                  ...c.financial,
                  totalRevenue: c.financial.totalRevenue + (c.financial.totalRevenue * quarterlyGrowth),
                  totalProfit: c.financial.totalProfit + (c.financial.totalProfit * quarterlyGrowth * 0.4),
                  marketCap: c.financial.marketCap + (c.financial.marketCap * quarterlyGrowth)
                }
              } : c
        ));
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isOperating, entities, conglomerates]);

  // Update stats
  useEffect(() => {
    const activeEntities = entities.filter(e => e.status === 'active').length;
    const activeConglomerates = conglomerates.filter(c => c.status === 'active').length;
    const totalRevenue = conglomerates.reduce((sum, c) => sum + c.financial.totalRevenue, 0);
    const totalAssets = conglomerates.reduce((sum, c) => sum + c.financial.totalAssets, 0);
    const averageGrowth = conglomerates.length > 0
      ? conglomerates.reduce((sum, c) => sum + (c.operations.globalPresence.reduce((s, p) => s + p.marketShare, 0) / c.operations.globalPresence.length), 0) / conglomerates.length
      : 0;

    const industryCounts = entities.reduce((acc, entity) => {
      acc[entity.industry] = (acc[entity.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestIndustry = Object.entries(industryCounts).reduce((best, [industry, count]) =>
      count > (best?.count || 0) ? { industry, count } : best, null as { industry: string; count: number } | null);

    setStats({
      totalEntities: entities.length,
      activeEntities,
      totalConglomerates: conglomerates.length,
      activeConglomerates,
      totalRevenue,
      totalAssets,
      bestIndustry: bestIndustry?.industry || '',
      averageGrowth
    });
  }, [entities, conglomerates]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const createEntity = () => {
    const types: BusinessEntity['type'][] = ['llc', 'corporation', 'partnership', 'sole_proprietorship'];
    const industries: BusinessEntity['industry'][] = ['technology', 'finance', 'consulting', 'trading', 'investment', 'crypto', 'ai_ml'];
    const jurisdictions = ['Delaware, USA', 'Wyoming, USA', 'Cayman Islands', 'Switzerland', 'Singapore', 'Hong Kong'];

    const newEntity: BusinessEntity = {
      id: `entity-${Date.now()}`,
      name: `New Business Entity ${entities.length + 1}`,
      type: types[Math.floor(Math.random() * types.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      jurisdiction: jurisdictions[Math.floor(Math.random() * jurisdictions.length)],
      registration: {
        registrationNumber: `REG-${Date.now()}`,
        dateIncorporated: new Date().toISOString(),
        status: 'pending',
        authority: 'Corporate Registry',
        licenseNumber: `LIC-${Date.now()}`,
        permits: ['Business License'],
        compliance: {
          taxId: `TAX-${Date.now()}`,
          ein: `EIN-${Date.now()}`,
          duns: `DUNS-${Date.now()}`,
          businessLicense: `BL-${Date.now()}`,
          specialPermits: []
        }
      },
      structure: {
        legalStructure: 'Limited Liability Company',
        ownership: [
          {
            personaId: 'persona-1',
            percentage: 100,
            role: 'Owner',
            votingRights: true,
            liability: 'limited'
          }
        ],
        management: [
          {
            personaId: 'persona-1',
            title: 'CEO',
            responsibilities: ['Business Management'],
            authority: 100,
            decisionMaking: 'executive'
          }
        ],
        subsidiaries: [],
        departments: [
          {
            name: 'Operations',
            headId: 'persona-1',
            employees: 1,
            budget: 10000,
            functions: ['Core Operations']
          }
        ]
      },
      operations: {
        primaryActivities: ['Business Operations'],
        secondaryActivities: [],
        services: [
          {
            name: 'Professional Services',
            description: 'Business consulting and services',
            pricing: {
              model: 'hourly',
              rates: [
                { service: 'Consulting', price: 100, currency: 'USD', unit: 'hour' }
              ]
            },
            delivery: ['Remote'],
            targetMarket: ['Small Business']
          }
        ],
        revenue: {
          streams: ['Professional Services'],
          projections: [
            { year: new Date().getFullYear(), revenue: 120000, profit: 36000, growth: 10 }
          ],
          actual: []
        },
        expenses: {
          operating: 20000,
          administrative: 5000,
          marketing: 3000,
          legal: 2000,
          taxes: 10000,
          other: 1000
        },
        assets: {
          cash: 5000,
          investments: 10000,
          equipment: 5000,
          intellectualProperty: [],
          realEstate: [],
          digitalAssets: []
        }
      },
      compliance: {
        taxCompliance: false,
        regulatoryCompliance: false,
        reportingRequirements: ['Annual Report'],
        auditHistory: [],
        licenses: [],
        insurance: {
          generalLiability: false,
          professionalLiability: false,
          workersCompensation: false,
          cyberInsurance: false,
          directorsAndOfficers: false
        }
      },
      status: 'forming',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setEntities(prev => [...prev, newEntity]);
  };

  const createConglomerate = () => {
    const availableEntities = entities.filter(e => e.status === 'active');
    if (availableEntities.length < 2) return;

    const newConglomerate: Conglomerate = {
      id: `conglomerate-${Date.now()}`,
      name: `New Conglomerate ${conglomerates.length + 1}`,
      tier: 'small_business',
      headquarters: {
        country: 'Switzerland',
        state: 'Zug',
        city: 'Zug',
        address: 'Virtual Office Address',
        virtual: true
      },
      entities: availableEntities.slice(0, 3).map(e => e.id),
      holdings: {
        subsidiaries: [],
        investments: availableEntities.slice(0, 3).map(e => ({
          entityId: e.id,
          percentage: 100,
          investmentAmount: 100000,
          date: new Date().toISOString(),
          type: 'equity'
        })),
        partnerships: []
      },
      governance: {
        boardOfDirectors: [
          {
            personaId: 'persona-1',
            title: 'Chairman',
            votingRights: 100,
            committees: ['Executive'],
            term: '3 years'
          }
        ],
        executiveTeam: [
          {
            personaId: 'persona-1',
            title: 'CEO',
            department: 'Executive',
            reportsTo: 'Board of Directors',
            authority: 100
          }
        ],
        shareholders: [
          {
            personaId: 'persona-1',
            shares: 1000000,
            class: 'Common',
            votingRights: 1000000,
            dividendRights: true
          }
        ],
        votingStructure: 'one_share_one_vote'
      },
      financial: {
        totalRevenue: availableEntities.reduce((sum, e) => sum + (e.operations.revenue.actual[0]?.revenue || 0), 0),
        totalProfit: availableEntities.reduce((sum, e) => sum + (e.operations.revenue.actual[0]?.profit || 0), 0),
        totalAssets: availableEntities.reduce((sum, e) => sum + e.operations.assets.cash + e.operations.assets.investments, 0),
        totalLiabilities: availableEntities.reduce((sum, e) => sum + e.operations.expenses.operating, 0),
        marketCap: 1000000,
        sharesOutstanding: 1000000,
        debtToEquity: 0.1,
        currentRatio: 2.0,
        cashFlow: 50000,
        creditRating: 'B+'
      },
      operations: {
        globalPresence: [
          {
            country: 'Switzerland',
            offices: 1,
            employees: availableEntities.reduce((sum, e) => sum + e.structure.departments.reduce((s, d) => s + d.employees, 0), 0),
            revenue: availableEntities.reduce((sum, e) => sum + (e.operations.revenue.actual[0]?.revenue || 0), 0),
            marketShare: 1.0
          }
        ],
        supplyChain: {
          suppliers: ['Technology Vendors'],
          distributors: ['Direct Sales'],
          partners: ['Strategic Partners'],
          logistics: ['Digital Delivery']
        },
        technology: {
          platforms: ['Cloud Infrastructure'],
          systems: ['Management Systems'],
          infrastructure: ['AWS', 'Google Cloud'],
          intellectualProperty: ['Software Copyrights']
        },
        riskManagement: {
          insurance: ['Professional Liability'],
          compliance: ['Regulatory Compliance'],
          cybersecurity: ['Basic Security'],
          legal: ['Legal Counsel'],
          financial: ['Cash Management']
        }
      },
      strategy: {
        vision: 'To grow through strategic expansion and innovation',
        mission: 'Provide value-added services to global markets',
        values: ['Growth', 'Innovation', 'Excellence'],
        objectives: [
          {
            title: 'Growth',
            description: 'Achieve 50% annual growth',
            kpis: ['Revenue Growth', 'Market Share', 'Customer Satisfaction'],
            deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'high'
          }
        ],
        growthStrategy: 'organic',
        marketPosition: 'Emerging Technology Services Provider',
        competitiveAdvantage: ['Innovation', 'Agility', 'Cost Efficiency'],
        diversification: ['Technology Services', 'Consulting']
      },
      status: 'forming',
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    setConglomerates(prev => [...prev, newConglomerate]);
  };

  const getEntityTypeColor = (type: BusinessEntity['type']) => {
    switch (type) {
      case 'sole_proprietorship': return 'bg-blue-600';
      case 'partnership': return 'bg-green-600';
      case 'llc': return 'bg-purple-600';
      case 'corporation': return 'bg-orange-600';
      case 'holding_company': return 'bg-red-600';
      case 'non_profit': return 'bg-yellow-600';
      case 'trust': return 'bg-pink-600';
      case 'foundation': return 'bg-cyan-600';
      case 'joint_venture': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  const getIndustryColor = (industry: BusinessEntity['industry']) => {
    switch (industry) {
      case 'technology': return 'bg-blue-600';
      case 'finance': return 'bg-green-600';
      case 'consulting': return 'bg-purple-600';
      case 'trading': return 'bg-orange-600';
      case 'investment': return 'bg-yellow-600';
      case 'crypto': return 'bg-red-600';
      case 'ai_ml': return 'bg-pink-600';
      case 'adult': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: BusinessEntity['status']) => {
    switch (status) {
      case 'forming': return 'bg-blue-600';
      case 'active': return 'bg-green-600';
      case 'expanding': return 'bg-purple-600';
      case 'merging': return 'bg-orange-600';
      case 'dissolving': return 'bg-red-600';
      case 'suspended': return 'bg-yellow-600';
      case 'inactive': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredEntities = () => {
    return entities.filter(entity => {
      const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entity.registration.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entity.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = filterIndustry === 'all' || entity.industry === filterIndustry;
      const matchesStatus = filterStatus === 'all' || entity.status === filterStatus;
      return matchesSearch && matchesIndustry && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Building className="w-8 h-8 text-purple-400" />
            Enterprise Conglomerate
          </h1>
          <p className="text-gray-400">
            Enterprise conglomerate system enabling personas to form business entities and corporate structures
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Entities</div>
                <div className="text-2xl font-bold">{stats.totalEntities}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeEntities}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-2xl font-bold">${(stats.totalRevenue / 1000000).toFixed(1)}M</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Growth</div>
                <div className="text-2xl font-bold">{stats.averageGrowth.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Conglomerates</div>
                <div className="text-2xl font-bold">{stats.totalConglomerates}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Enterprise Operations</h2>
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
                    Stop Operations
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Operations
                  </>
                )}
              </button>
              <button
                onClick={createEntity}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Create Entity
              </button>
              <button
                onClick={createConglomerate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Building className="w-4 h-4" />
                Create Conglomerate
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
              Best Industry: {stats.bestIndustry || 'None'} |
              Total Assets: ${(stats.totalAssets / 1000000).toFixed(1)}M |
              Operations: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Business Entities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Entities</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entities..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Industries</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="consulting">Consulting</option>
                <option value="trading">Trading</option>
                <option value="investment">Investment</option>
                <option value="crypto">Crypto</option>
                <option value="ai_ml">AI/ML</option>
                <option value="adult">Adult</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="forming">Forming</option>
                <option value="active">Active</option>
                <option value="expanding">Expanding</option>
                <option value="merging">Merging</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredEntities().map((entity) => (
                <div
                  key={entity.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedEntity?.id === entity.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedEntity(entity)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${entity.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{entity.name}</h4>
                        <div className="text-sm text-gray-400">{entity.registration.registrationNumber}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getEntityTypeColor(entity.type)}`}>
                        {entity.type.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getIndustryColor(entity.industry)}`}>
                        {entity.industry}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(entity.status)}`}>
                        {entity.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Jurisdiction:</span> {entity.jurisdiction}
                    </div>
                    <div>
                      <span className="text-gray-400">Incorporated:</span> {new Date(entity.registration.dateIncorporated).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span> ${(entity.operations.revenue.actual[0]?.revenue || 0).toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Profit:</span> ${(entity.operations.revenue.actual[0]?.profit || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {entity.structure.ownership.length} owners | {entity.structure.departments.length} departments
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {entity.operations.primaryActivities.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredEntities().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No business entities found
              </div>
            )}
          </div>

          {/* Selected Entity Details */}
          {selectedEntity && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Entity Details: {selectedEntity.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Registration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedEntity.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Jurisdiction:</span>
                        <span className="font-medium">{selectedEntity.jurisdiction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedEntity.status)}`}>
                          {selectedEntity.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Registration:</span>
                        <span className="font-medium">{selectedEntity.registration.registrationNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Financial Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="font-medium">${(selectedEntity.operations.revenue.actual[0]?.revenue || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Profit:</span>
                        <span className="font-medium">${(selectedEntity.operations.revenue.actual[0]?.profit || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth:</span>
                        <span className="font-medium">{(selectedEntity.operations.revenue.actual[0]?.growth || 0).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assets:</span>
                        <span className="font-medium">${(selectedEntity.operations.assets.cash + selectedEntity.operations.assets.investments).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Ownership Structure</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Owners:</span>
                        <span className="font-medium">{selectedEntity.structure.ownership.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Departments:</span>
                        <span className="font-medium">{selectedEntity.structure.departments.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Employees:</span>
                        <span className="font-medium">{selectedEntity.structure.departments.reduce((sum, d) => sum + d.employees, 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Budget:</span>
                        <span className="font-medium">${selectedEntity.structure.departments.reduce((sum, d) => sum + d.budget, 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Compliance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax Compliance:</span>
                        <span className="font-medium">{selectedEntity.compliance.taxCompliance ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Regulatory Compliance:</span>
                        <span className="font-medium">{selectedEntity.compliance.regulatoryCompliance ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Insurance Coverage:</span>
                        <span className="font-medium">{Object.values(selectedEntity.compliance.insurance).filter(Boolean).length}/6</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Active Licenses:</span>
                        <span className="font-medium">{selectedEntity.compliance.licenses.filter(l => l.status === 'active').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Conglomerates */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Conglomerates</h3>
          <div className="space-y-4">
            {conglomerates.map((conglomerate) => (
              <div key={conglomerate.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{conglomerate.name}</h4>
                    <div className="text-sm text-gray-400">{conglomerate.tier.replace('_', ' ').toUpperCase()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${conglomerate.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {conglomerate.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      {conglomerate.entities.length} entities
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Total Revenue:</span> ${(conglomerate.financial.totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div>
                    <span className="text-gray-400">Total Profit:</span> ${(conglomerate.financial.totalProfit / 1000000).toFixed(1)}M
                  </div>
                  <div>
                    <span className="text-gray-400">Total Assets:</span> ${(conglomerate.financial.totalAssets / 1000000).toFixed(1)}M
                  </div>
                  <div>
                    <span className="text-gray-400">Market Cap:</span> ${(conglomerate.financial.marketCap / 1000000).toFixed(1)}M
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(conglomerate.operations.globalPresence[0]?.marketShare || 0) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {conglomerate.strategy.growthStrategy.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {conglomerate.governance.votingStructure.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Credit Rating: {conglomerate.financial.creditRating}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {conglomerates.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No conglomerates formed
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Enterprise Settings</h2>

              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoFormation}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoFormation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Formation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoCompliance}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoCompliance: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Compliance</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoReporting}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoReporting: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Reporting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.growthEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, growthEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Growth Enabled</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Legal</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.legal.jurisdictionOptimization}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          legal: { ...prev.legal, jurisdictionOptimization: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Jurisdiction Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.legal.assetProtection}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          legal: { ...prev.legal, assetProtection: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Asset Protection</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.legal.liabilityShielding}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          legal: { ...prev.legal, liabilityShielding: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Liability Shielding</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.legal.complianceAutomation}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          legal: { ...prev.legal, complianceAutomation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Compliance Automation</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Financial</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.financial.automatedAccounting}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          financial: { ...prev.financial, automatedAccounting: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Automated Accounting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.financial.cashManagement}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          financial: { ...prev.financial, cashManagement: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Cash Management</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.financial.investmentOptimization}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          financial: { ...prev.financial, investmentOptimization: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Investment Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.financial.currencyDiversification}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          financial: { ...prev.financial, currencyDiversification: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Currency Diversification</span>
                    </label>
                  </div>
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

export default EnterpriseConglomerate;
