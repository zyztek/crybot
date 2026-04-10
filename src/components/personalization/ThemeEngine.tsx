import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Monitor, Download, Upload, Eye, Save, Trash2, Copy, CheckCircle } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    error: string;
    warning: string;
    success: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: string;
  shadows: boolean;
  isDark: boolean;
  isCustom: boolean;
  createdBy?: string;
  downloads?: number;
  rating?: number;
}

interface ThemePreset {
  id: string;
  name: string;
  category: 'professional' | 'dark' | 'colorful' | 'minimal' | 'accessibility';
  preview: string;
  popular: boolean;
}

export const ThemeEngine: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [presets, setPresets] = useState<ThemePreset[]>([]);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'advanced'>('colors');

  useEffect(() => {
    const fetchThemeData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockThemes: Theme[] = [
          {
            id: 'default-light',
            name: 'Default Light',
            description: 'Clean and professional light theme',
            colors: {
              primary: '#3b82f6',
              secondary: '#6b7280',
              background: '#ffffff',
              surface: '#f9fafb',
              text: '#111827',
              textSecondary: '#6b7280',
              accent: '#8b5cf6',
              error: '#ef4444',
              warning: '#f59e0b',
              success: '#10b981'
            },
            typography: {
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.5'
            },
            spacing: {
              xs: '0.25rem',
              sm: '0.5rem',
              md: '1rem',
              lg: '1.5rem',
              xl: '2rem'
            },
            borderRadius: '0.5rem',
            shadows: true,
            isDark: false,
            isCustom: false
          },
          {
            id: 'default-dark',
            name: 'Default Dark',
            description: 'Modern dark theme for reduced eye strain',
            colors: {
              primary: '#60a5fa',
              secondary: '#9ca3af',
              background: '#111827',
              surface: '#1f2937',
              text: '#f9fafb',
              textSecondary: '#9ca3af',
              accent: '#a78bfa',
              error: '#f87171',
              warning: '#fbbf24',
              success: '#34d399'
            },
            typography: {
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.5'
            },
            spacing: {
              xs: '0.25rem',
              sm: '0.5rem',
              md: '1rem',
              lg: '1.5rem',
              xl: '2rem'
            },
            borderRadius: '0.5rem',
            shadows: true,
            isDark: true,
            isCustom: false
          },
          {
            id: 'crypto-pro',
            name: 'Crypto Pro',
            description: 'Professional theme for traders',
            colors: {
              primary: '#10b981',
              secondary: '#6b7280',
              background: '#0f172a',
              surface: '#1e293b',
              text: '#f1f5f9',
              textSecondary: '#94a3b8',
              accent: '#f59e0b',
              error: '#ef4444',
              warning: '#f59e0b',
              success: '#10b981'
            },
            typography: {
              fontFamily: 'JetBrains Mono',
              fontSize: '13px',
              fontWeight: '500',
              lineHeight: '1.4'
            },
            spacing: {
              xs: '0.25rem',
              sm: '0.5rem',
              md: '1rem',
              lg: '1.5rem',
              xl: '2rem'
            },
            borderRadius: '0.375rem',
            shadows: false,
            isDark: true,
            isCustom: true,
            createdBy: 'Crybot Team',
            downloads: 1250,
            rating: 4.8
          }
        ];

        const mockPresets: ThemePreset[] = [
          {
            id: 'minimal-light',
            name: 'Minimal Light',
            category: 'minimal',
            preview: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
            popular: true
          },
          {
            id: 'ocean-dark',
            name: 'Ocean Dark',
            category: 'dark',
            preview: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
            popular: false
          },
          {
            id: 'sunset',
            name: 'Sunset',
            category: 'colorful',
            preview: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
            popular: true
          },
          {
            id: 'forest',
            name: 'Forest',
            category: 'colorful',
            preview: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
            popular: false
          },
          {
            id: 'high-contrast',
            name: 'High Contrast',
            category: 'accessibility',
            preview: 'linear-gradient(135deg, #000000 0%, #ffffff 100%)',
            popular: false
          }
        ];

        setThemes(mockThemes);
        setPresets(mockPresets);
        setCurrentTheme(mockThemes[0]);
      } catch (error) {
        console.error('Error fetching theme data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemeData();
  }, []);

  const handleColorChange = (colorKey: string, value: string) => {
    if (!editingTheme) return;
    
    setEditingTheme(prev => prev ? {
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    } : null);
  };

  const handleTypographyChange = (key: string, value: string) => {
    if (!editingTheme) return;
    
    setEditingTheme(prev => prev ? {
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value
      }
    } : null);
  };

  const handleSaveTheme = () => {
    if (!editingTheme) return;
    
    const updatedTheme = {
      ...editingTheme,
      id: editingTheme.isCustom ? editingTheme.id : `custom-${Date.now()}`,
      isCustom: true,
      createdBy: 'User'
    };
    
    setThemes(prev => {
      const existingIndex = prev.findIndex(t => t.id === updatedTheme.id);
      if (existingIndex >= 0) {
        const newThemes = [...prev];
        newThemes[existingIndex] = updatedTheme;
        return newThemes;
      }
      return [...prev, updatedTheme];
    });
    
    setCurrentTheme(updatedTheme);
    setEditingTheme(null);
  };

  const handleDeleteTheme = (themeId: string) => {
    setThemes(prev => prev.filter(t => t.id !== themeId));
    if (currentTheme?.id === themeId) {
      setCurrentTheme(themes.find(t => !t.isCustom) || themes[0]);
    }
  };

  const handleDuplicateTheme = (theme: Theme) => {
    const duplicatedTheme = {
      ...theme,
      id: `custom-${Date.now()}`,
      name: `${theme.name} (Copy)`,
      isCustom: true,
      createdBy: 'User'
    };
    
    setThemes(prev => [...prev, duplicatedTheme]);
  };

  const handleExportTheme = (theme: Theme) => {
    const exportData = {
      theme,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTheme = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.theme) {
        const importedTheme = {
          ...data.theme,
          id: `imported-${Date.now()}`,
          isCustom: true,
          createdBy: 'Imported'
        };
        
        setThemes(prev => [...prev, importedTheme]);
        alert('Theme imported successfully!');
      }
    } catch (error) {
      console.error('Error importing theme:', error);
      alert('Error importing theme. Please check the file format.');
    }
  };

  const applyTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    
    // Apply theme to CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    Object.entries(theme.typography).forEach(([key, value]) => {
      root.style.setProperty(`--typography-${key}`, value);
    });
  };

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
          <Palette className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold">Theme Engine</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm ${
              previewMode 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{previewMode ? 'Exit Preview' : 'Preview'}</span>
          </button>
          <label className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportTheme}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Current Theme Preview */}
      {currentTheme && (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Theme</h3>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Active
              </span>
              <button
                onClick={() => handleExportTheme(currentTheme)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Color Palette</h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(currentTheme.colors).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div 
                      className="w-full h-12 rounded border mb-1"
                      style={{ backgroundColor: value }}
                    ></div>
                    <p className="text-xs text-gray-600">{key}</p>
                    <p className="text-xs font-mono">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Typography</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Family:</span>
                  <span className="font-medium">{currentTheme.typography.fontFamily}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Size:</span>
                  <span className="font-medium">{currentTheme.typography.fontSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Weight:</span>
                  <span className="font-medium">{currentTheme.typography.fontWeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Line Height:</span>
                  <span className="font-medium">{currentTheme.typography.lineHeight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme Editor */}
      {editingTheme && (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Theme Editor</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveTheme}
                className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setEditingTheme(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 border-b">
            {(['colors', 'typography', 'spacing', 'advanced'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'colors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(editingTheme.colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="h-10 w-20 border rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Font Family</label>
                <select
                  value={editingTheme.typography.fontFamily}
                  onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                  <option value="SF Pro">SF Pro</option>
                  <option value="Helvetica">Helvetica</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                <input
                  type="text"
                  value={editingTheme.typography.fontSize}
                  onChange={(e) => handleTypographyChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Font Weight</label>
                <select
                  value={editingTheme.typography.fontWeight}
                  onChange={(e) => handleTypographyChange('fontWeight', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="600">Semibold</option>
                  <option value="700">Bold</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Line Height</label>
                <input
                  type="text"
                  value={editingTheme.typography.lineHeight}
                  onChange={(e) => handleTypographyChange('lineHeight', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'spacing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(editingTheme.spacing).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key} ({key === 'xs' ? 'Extra Small' : key === 'sm' ? 'Small' : key === 'md' ? 'Medium' : key === 'lg' ? 'Large' : 'Extra Large'})
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setEditingTheme(prev => prev ? {
                      ...prev,
                      spacing: {
                        ...prev.spacing,
                        [key]: e.target.value
                      }
                    } : null)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingTheme.shadows}
                    onChange={(e) => setEditingTheme(prev => prev ? {
                      ...prev,
                      shadows: e.target.checked
                    } : null)}
                    className="rounded text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium">Enable Shadows</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingTheme.isDark}
                    onChange={(e) => setEditingTheme(prev => prev ? {
                      ...prev,
                      isDark: e.target.checked
                    } : null)}
                    className="rounded text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium">Dark Mode</span>
                </label>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Border Radius</label>
                <input
                  type="text"
                  value={editingTheme.borderRadius}
                  onChange={(e) => setEditingTheme(prev => prev ? {
                    ...prev,
                    borderRadius: e.target.value
                  } : null)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Theme Library */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Theme Library</h3>
            <button
              onClick={() => {
                const newTheme: Theme = {
                  id: `custom-${Date.now()}`,
                  name: 'New Custom Theme',
                  description: 'Your custom theme',
                  colors: currentTheme?.colors || themes[0].colors,
                  typography: currentTheme?.typography || themes[0].typography,
                  spacing: currentTheme?.spacing || themes[0].spacing,
                  borderRadius: currentTheme?.borderRadius || themes[0].borderRadius,
                  shadows: currentTheme?.shadows || themes[0].shadows,
                  isDark: currentTheme?.isDark || themes[0].isDark,
                  isCustom: true,
                  createdBy: 'User'
                };
                setEditingTheme(newTheme);
              }}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Create New Theme
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {themes.map(theme => (
            <div
              key={theme.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                currentTheme?.id === theme.id ? 'border-purple-500 bg-purple-50' : 'hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{theme.name}</h4>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </div>
                {currentTheme?.id === theme.id && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              
              {/* Color Preview */}
              <div className="flex space-x-1 mb-3">
                {Object.values(theme.colors).slice(0, 6).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              {/* Theme Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>{theme.isDark ? 'Dark' : 'Light'}</span>
                {theme.isCustom && (
                  <span>by {theme.createdBy}</span>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => applyTheme(theme)}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Apply
                </button>
                <button
                  onClick={() => setEditingTheme(theme)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicateTheme(theme)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {theme.isCustom && (
                  <button
                    onClick={() => handleDeleteTheme(theme.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Theme Presets</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
          {presets.map(preset => (
            <div
              key={preset.id}
              className="cursor-pointer group"
              onClick={() => {
                // Apply preset logic would go here
                console.log('Apply preset:', preset.id);
              }}
            >
              <div
                className="w-full h-20 rounded-lg mb-2 border-2 border-transparent group-hover:border-purple-500 transition-colors"
                style={{ background: preset.preview }}
              />
              <p className="text-sm font-medium text-center">{preset.name}</p>
              {preset.popular && (
                <span className="text-xs text-purple-600 text-center block">Popular</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
