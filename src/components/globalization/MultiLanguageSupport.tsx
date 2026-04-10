import React, { useState, useEffect } from 'react';
import { Globe, Languages, Download, Upload, CheckCircle, AlertCircle, Users, Map, Calendar } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  progress: number;
  translated: number;
  total: number;
  lastUpdated: string;
  translators: number;
  rtl: boolean;
}

interface TranslationKey {
  key: string;
  namespace: string;
  translations: Record<string, string>;
  lastModified: string;
  status: 'completed' | 'in-progress' | 'missing';
}

interface Region {
  code: string;
  name: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
  language: string;
}

export const MultiLanguageSupport: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translations, setTranslations] = useState<TranslationKey[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [showTranslationEditor, setShowTranslationEditor] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);

  useEffect(() => {
    const fetchLanguageData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockLanguages: Language[] = [
          {
            code: 'en',
            name: 'English',
            nativeName: 'English',
            flag: '🇺🇸',
            progress: 100,
            translated: 1250,
            total: 1250,
            lastUpdated: '2024-01-15T10:30:00Z',
            translators: 5,
            rtl: false
          },
          {
            code: 'es',
            name: 'Spanish',
            nativeName: 'Español',
            flag: '🇪🇸',
            progress: 95,
            translated: 1187,
            total: 1250,
            lastUpdated: '2024-01-14T15:45:00Z',
            translators: 3,
            rtl: false
          },
          {
            code: 'fr',
            name: 'French',
            nativeName: 'Français',
            flag: '🇫🇷',
            progress: 87,
            translated: 1087,
            total: 1250,
            lastUpdated: '2024-01-13T09:20:00Z',
            translators: 2,
            rtl: false
          },
          {
            code: 'de',
            name: 'German',
            nativeName: 'Deutsch',
            flag: '🇩🇪',
            progress: 82,
            translated: 1025,
            total: 1250,
            lastUpdated: '2024-01-12T14:10:00Z',
            translators: 2,
            rtl: false
          },
          {
            code: 'ja',
            name: 'Japanese',
            nativeName: '日本語',
            flag: '🇯🇵',
            progress: 78,
            translated: 975,
            total: 1250,
            lastUpdated: '2024-01-11T11:30:00Z',
            translators: 1,
            rtl: false
          },
          {
            code: 'zh',
            name: 'Chinese',
            nativeName: '中文',
            flag: '🇨🇳',
            progress: 71,
            translated: 887,
            total: 1250,
            lastUpdated: '2024-01-10T16:45:00Z',
            translators: 1,
            rtl: false
          },
          {
            code: 'ar',
            name: 'Arabic',
            nativeName: 'العربية',
            flag: '🇸🇦',
            progress: 65,
            translated: 812,
            total: 1250,
            lastUpdated: '2024-01-09T13:20:00Z',
            translators: 1,
            rtl: true
          },
          {
            code: 'pt',
            name: 'Portuguese',
            nativeName: 'Português',
            flag: '🇧🇷',
            progress: 58,
            translated: 725,
            total: 1250,
            lastUpdated: '2024-01-08T10:15:00Z',
            translators: 1,
            rtl: false
          },
          {
            code: 'ru',
            name: 'Russian',
            nativeName: 'Русский',
            flag: '🇷🇺',
            progress: 52,
            translated: 650,
            total: 1250,
            lastUpdated: '2024-01-07T12:30:00Z',
            translators: 1,
            rtl: false
          },
          {
            code: 'hi',
            name: 'Hindi',
            nativeName: 'हिन्दी',
            flag: '🇮🇳',
            progress: 45,
            translated: 562,
            total: 1250,
            lastUpdated: '2024-01-06T09:45:00Z',
            translators: 1,
            rtl: false
          }
        ];

        const mockTranslations: TranslationKey[] = [
          {
            key: 'portfolio.title',
            namespace: 'portfolio',
            translations: {
              en: 'Portfolio',
              es: 'Cartera',
              fr: 'Portefeuille',
              de: 'Portfolio',
              ja: 'ポートフォリオ',
              zh: '投资组合',
              ar: 'محفظة',
              pt: 'Carteira',
              ru: 'Портфель',
              hi: 'पोर्टफोलियो'
            },
            lastModified: '2024-01-15T10:30:00Z',
            status: 'completed'
          },
          {
            key: 'trading.buy',
            namespace: 'trading',
            translations: {
              en: 'Buy',
              es: 'Comprar',
              fr: 'Acheter',
              de: 'Kaufen',
              ja: '購入',
              zh: '购买',
              ar: 'شراء',
              pt: 'Comprar',
              ru: 'Купить',
              hi: 'खरीदें'
            },
            lastModified: '2024-01-14T15:45:00Z',
            status: 'completed'
          },
          {
            key: 'defi.staking',
            namespace: 'defi',
            translations: {
              en: 'Staking',
              es: 'Staking',
              fr: 'Staking',
              de: 'Staking',
              ja: 'ステーキング',
              zh: '质押',
              ar: 'الستيكينغ',
              pt: 'Staking',
              ru: 'Стейкинг',
              hi: 'स्टेकिंग'
            },
            lastModified: '2024-01-13T09:20:00Z',
            status: 'completed'
          }
        ];

        const mockRegions: Region[] = [
          {
            code: 'US',
            name: 'United States',
            currency: 'USD',
            timezone: 'America/New_York',
            dateFormat: 'MM/DD/YYYY',
            numberFormat: 'en-US',
            language: 'en'
          },
          {
            code: 'GB',
            name: 'United Kingdom',
            currency: 'GBP',
            timezone: 'Europe/London',
            dateFormat: 'DD/MM/YYYY',
            numberFormat: 'en-GB',
            language: 'en'
          },
          {
            code: 'DE',
            name: 'Germany',
            currency: 'EUR',
            timezone: 'Europe/Berlin',
            dateFormat: 'DD.MM.YYYY',
            numberFormat: 'de-DE',
            language: 'de'
          },
          {
            code: 'JP',
            name: 'Japan',
            currency: 'JPY',
            timezone: 'Asia/Tokyo',
            dateFormat: 'YYYY/MM/DD',
            numberFormat: 'ja-JP',
            language: 'ja'
          },
          {
            code: 'CN',
            name: 'China',
            currency: 'CNY',
            timezone: 'Asia/Shanghai',
            dateFormat: 'YYYY-MM-DD',
            numberFormat: 'zh-CN',
            language: 'zh'
          }
        ];

        setLanguages(mockLanguages);
        setTranslations(mockTranslations);
        setRegions(mockRegions);
        
        // Calculate overall translation progress
        const totalProgress = mockLanguages.reduce((sum, lang) => sum + lang.progress, 0) / mockLanguages.length;
        setTranslationProgress(Math.round(totalProgress));
      } catch (error) {
        console.error('Error fetching language data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageData();
  }, []);

  const handleExportTranslations = async () => {
    try {
      // Simulate export
      const exportData = {
        languages,
        translations,
        regions,
        exportedAt: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translations-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting translations:', error);
    }
  };

  const handleImportTranslations = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Update with imported data
      if (data.languages) setLanguages(data.languages);
      if (data.translations) setTranslations(data.translations);
      if (data.regions) setRegions(data.regions);
      
      alert('Translations imported successfully!');
    } catch (error) {
      console.error('Error importing translations:', error);
      alert('Error importing translations. Please check the file format.');
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <Globe className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Multi-Language Support</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {languages.length} languages • {translationProgress}% complete
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleExportTranslations}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <label className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportTranslations}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Translation Progress</h3>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">{translationProgress}%</div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-2 h-8 rounded ${
                      level <= (translationProgress / 20) ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm opacity-90 mt-2">
              {languages.filter(l => l.progress === 100).length} fully translated languages
            </p>
          </div>
          <Languages className="w-16 h-16 opacity-50" />
        </div>
      </div>

      {/* Languages Grid */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Supported Languages</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {languages.map(language => (
            <div key={language.code} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <h4 className="font-semibold">{language.name}</h4>
                    <p className="text-sm text-gray-600">{language.nativeName}</p>
                  </div>
                </div>
                {language.rtl && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    RTL
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{language.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(language.progress)}`}
                      style={{ width: `${language.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{language.translated}/{language.total} strings</span>
                  <span>{language.translators} translators</span>
                </div>
                
                <div className="text-xs text-gray-500">
                  Updated: {new Date(language.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Regional Settings</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timezone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regions.map(region => (
                <tr key={region.code}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {region.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.timezone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.dateFormat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {languages.find(l => l.code === region.language)?.name || region.language}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Translation Management */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Translation Management</h3>
            </div>
            <button
              onClick={() => setShowTranslationEditor(!showTranslationEditor)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
            >
              {showTranslationEditor ? 'Hide Editor' : 'Show Editor'}
            </button>
          </div>
        </div>
        
        {showTranslationEditor && (
          <div className="p-6">
            <div className="space-y-4">
              {translations.map(translation => (
                <div key={translation.key} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{translation.key}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      translation.status === 'completed' ? 'bg-green-100 text-green-800' :
                      translation.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {translation.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(translation.translations).map(([lang, value]) => (
                      <div key={lang} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          {languages.find(l => l.code === lang)?.flag} {lang.toUpperCase()}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const updatedTranslations = translations.map(t => 
                              t.key === translation.key
                                ? {
                                    ...t,
                                    translations: {
                                      ...t.translations,
                                      [lang]: e.target.value
                                    }
                                  }
                                : t
                            );
                            setTranslations(updatedTranslations);
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Translators</p>
              <p className="text-2xl font-bold">
                {languages.reduce((sum, lang) => sum + lang.translators, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Translation Keys</p>
              <p className="text-2xl font-bold">{translations.length}</p>
            </div>
            <Languages className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Supported Regions</p>
              <p className="text-2xl font-bold">{regions.length}</p>
            </div>
            <Map className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};
