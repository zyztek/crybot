import { useState } from 'react';
import {
  FileText,
  Download,
  Share2,
  Eye,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  ChevronRight,
  Plus,
  Calendar,
  Filter,
} from 'lucide-react';

export default function Reports() {
  const [isSpanish, setIsSpanish] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const reports = [
    {
      id: 1,
      name: 'Daily Report',
      type: 'daily',
      createdAt: '2025-01-15',
      status: 'completed',
      rows: 1234,
      size: '2.3MB',
    },
    {
      id: 2,
      name: 'Weekly Summary',
      type: 'weekly',
      createdAt: '2025-01-14',
      status: 'completed',
      rows: 8923,
      size: '8.5MB',
    },
    {
      id: 3,
      name: 'Monthly Analysis',
      type: 'monthly',
      createdAt: '2025-01-01',
      status: 'completed',
      rows: 45678,
      size: '32.1MB',
    },
    {
      id: 4,
      name: 'Tax Report 2024',
      type: 'tax',
      createdAt: '2025-01-10',
      status: 'completed',
      rows: 56789,
      size: '45.2MB',
    },
    {
      id: 5,
      name: 'Portfolio Performance',
      type: 'portfolio',
      createdAt: '2025-01-13',
      status: 'scheduled',
      rows: 0,
      size: '-',
    },
    {
      id: 6,
      name: 'Trading Analysis Q4',
      type: 'trading',
      createdAt: '2025-01-12',
      status: 'in-progress',
      rows: 5678,
      size: '12.3MB',
    },
  ];

  const templates = [
    { name: 'Daily Portfolio', icon: TrendingUp, description: 'Track daily portfolio changes' },
    { name: 'Tax Summary', icon: DollarSign, description: 'Generate tax-ready reports' },
    { name: 'Trading Performance', icon: Activity, description: 'Analyze trading activity' },
    { name: 'DeFi Overview', icon: Clock, description: 'DeFi positions and yields' },
  ];

  const stats = {
    totalReports: 156,
    generatedToday: 23,
    scheduled: 8,
    totalSize: '2.3GB',
    sharedReports: 45,
  };

  const text = isSpanish
    ? {
        title: 'Sistema de Reportes',
        overview: 'Resumen',
        myReports: 'Mis Reportes',
        templates: 'Plantillas',
        schedule: 'Programar',
        generate: 'Generar Reporte',
        download: 'Descargar',
        view: 'Ver',
        share: 'Compartir',
        status: 'Estado',
        type: 'Tipo',
        created: 'Creado',
        rows: 'Filas',
        size: 'Tamaño',
        completed: 'Completado',
        inProgress: 'En Progreso',
        scheduled: 'Programado',
        totalTime: 'Total Reportes',
        todayGen: 'Generados Hoy',
        scheduledRep: 'Programados',
        totalStorage: 'Almacenamiento Total',
        shared: 'Compartidos',
        newReport: 'Nuevo Reporte',
        selectTemplate: 'Seleccionar Plantilla',
        dateRange: 'Rango de Fechas',
        includeSections: 'Secciones a Incluir',
        generatePdf: 'Generar PDF',
        generateCsv: 'Generar CSV',
        usernameNotif: '¡Bienvenido de nuevo!',
      }
    : {
        title: 'Reports System',
        overview: 'Overview',
        myReports: 'My Reports',
        templates: 'Templates',
        schedule: 'Schedule',
        generate: 'Generate Report',
        download: 'Download',
        view: 'View',
        share: 'Share',
        status: 'Status',
        type: 'Type',
        created: 'Created',
        rows: 'Rows',
        size: 'Size',
        completed: 'Completed',
        inProgress: 'In Progress',
        scheduled: 'Scheduled',
        totalTime: 'Total Reports',
        todayGen: 'Generated Today',
        scheduledRep: 'Scheduled',
        totalStorage: 'Total Storage',
        shared: 'Shared',
        newReport: 'New Report',
        selectTemplate: 'Select Template',
        dateRange: 'Date Range',
        includeSections: 'Include Sections',
        generatePdf: 'Generate PDF',
        generateCsv: 'Generate CSV',
        usernameNotif: 'Welcome back!',
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-400" />
              {text.title}
            </h1>
            <p className="text-purple-300">{text.generate}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
              <Plus className="w-4 h-4" />
              {text.newReport}
            </button>
            <button
              onClick={() => setIsSpanish(!isSpanish)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-all"
            >
              {isSpanish ? 'EN' : 'ES'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-slate-400 text-sm">{text.totalTime}</p>
                <p className="text-2xl font-bold text-white">{stats.totalReports}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">{text.todayGen}</p>
                <p className="text-2xl font-bold text-white">{stats.generatedToday}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">{text.scheduledRep}</p>
                <p className="text-2xl font-bold text-white">{stats.scheduled}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-slate-400 text-sm">{text.totalStorage}</p>
                <p className="text-2xl font-bold text-white">{stats.totalSize}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-pink-500/20">
            <div className="flex items-center gap-3">
              <Share2 className="w-8 h-8 text-pink-400" />
              <div>
                <p className="text-slate-400 text-sm">{text.shared}</p>
                <p className="text-2xl font-bold text-white">{stats.sharedReports}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-2 border border-purple-500/20 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['overview', 'reports', 'templates'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {tab === 'overview'
                  ? text.overview
                  : tab === 'reports'
                    ? text.myReports
                    : text.templates}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                {text.myReports}
              </h3>
              <div className="space-y-3">
                {reports.slice(0, 3).map(report => (
                  <div key={report.id} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">{report.name}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          report.status === 'completed'
                            ? 'bg-green-500/20 text-green-400'
                            : report.status === 'in-progress'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {report.status === 'completed'
                          ? text.completed
                          : report.status === 'in-progress'
                            ? text.inProgress
                            : text.scheduled}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>
                        {report.rows} {text.rows}
                      </span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-400" />
                {text.templates}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    className="bg-slate-700/50 hover:bg-slate-600/50 rounded-lg p-4 text-left transition-all"
                  >
                    <template.icon className="w-6 h-6 text-purple-400 mb-2" />
                    <h4 className="text-white font-semibold mb-1">{template.name}</h4>
                    <p className="text-slate-400 text-sm">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              {text.myReports}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-left border-b border-slate-700">
                    <th className="pb-3">{isSpanish ? 'Nombre' : 'Name'}</th>
                    <th className="pb-3">{text.type}</th>
                    <th className="pb-3">{text.status}</th>
                    <th className="pb-3">{text.created}</th>
                    <th className="pb-3">{text.rows}</th>
                    <th className="pb-3">{text.size}</th>
                    <th className="pb-3">{text.title}</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr
                      key={report.id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30"
                    >
                      <td className="py-4 text-white">{report.name}</td>
                      <td className="py-4 text-slate-400 capitalize">{report.type}</td>
                      <td className="py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            report.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : report.status === 'in-progress'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {report.status === 'completed'
                            ? text.completed
                            : report.status === 'in-progress'
                              ? text.inProgress
                              : text.scheduled}
                        </span>
                      </td>
                      <td className="py-4 text-slate-400">{report.createdAt}</td>
                      <td className="py-4 text-slate-400">{report.rows.toLocaleString()}</td>
                      <td className="py-4 text-slate-400">{report.size}</td>
                      <td className="py-4 flex gap-2">
                        <button
                          className="text-purple-400 hover:text-purple-300 p-1"
                          title={text.view}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-blue-400 hover:text-blue-300 p-1"
                          title={text.download}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-400 hover:text-green-300 p-1"
                          title={text.share}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <button
                key={index}
                className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all text-left group"
              >
                <template.icon className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2">{template.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{template.description}</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
                  {text.generate}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
