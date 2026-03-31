import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Star,
  Play,
  Lock,
  CheckCircle,
  Award,
  TrendingUp,
  Search,
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  students: number;
  lessons: number;
  price: number;
  enrolled: boolean;
  completed: boolean;
  image: string;
  tags: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Bitcoin Fundamentals',
    description: 'Aprende todo sobre Bitcoin desde cero',
    instructor: 'Carlos Crypto',
    duration: '4 hours',
    level: 'beginner',
    category: 'Basics',
    rating: 4.9,
    students: 12543,
    lessons: 12,
    price: 0,
    enrolled: true,
    completed: true,
    image: '₿',
    tags: ['Bitcoin', 'Blockchain'],
  },
  {
    id: 2,
    title: 'DeFi Mastery',
    description: 'Domina las finanzas descentralizadas',
    instructor: 'Maria Defi',
    duration: '8 hours',
    level: 'intermediate',
    category: 'DeFi',
    rating: 4.8,
    students: 8921,
    lessons: 20,
    price: 0,
    enrolled: true,
    completed: false,
    image: '💎',
    tags: ['DeFi', 'Yield', 'Staking'],
  },
  {
    id: 3,
    title: 'Smart Contracts',
    description: 'Desarrolla smart contracts en Solidity',
    instructor: 'Juan Dev',
    duration: '12 hours',
    level: 'advanced',
    category: 'Development',
    rating: 4.7,
    students: 5632,
    lessons: 24,
    price: 49,
    enrolled: false,
    completed: false,
    image: '📜',
    tags: ['Solidity', 'Ethereum', 'Smart Contracts'],
  },
  {
    id: 4,
    title: 'Trading Technical Analysis',
    description: 'Análisis técnico para trading crypto',
    instructor: 'Pedro Trader',
    duration: '6 hours',
    level: 'intermediate',
    category: 'Trading',
    rating: 4.9,
    students: 15432,
    lessons: 15,
    price: 0,
    enrolled: false,
    completed: false,
    image: '📊',
    tags: ['Trading', 'Charts', 'Indicators'],
  },
  {
    id: 5,
    title: 'NFT Creation',
    description: 'Crea y vende tus propios NFTs',
    instructor: 'Ana NFT',
    duration: '5 hours',
    level: 'beginner',
    category: 'NFT',
    rating: 4.6,
    students: 7854,
    lessons: 10,
    price: 29,
    enrolled: false,
    completed: false,
    image: '🖼️',
    tags: ['NFT', 'Digital Art', 'Marketplace'],
  },
  {
    id: 6,
    title: 'Yield Farming Strategies',
    description: 'Estrategias avanzadas de yield farming',
    instructor: 'Luis Farm',
    duration: '7 hours',
    level: 'advanced',
    category: 'DeFi',
    rating: 4.8,
    students: 4321,
    lessons: 18,
    price: 0,
    enrolled: false,
    completed: false,
    image: '🌾',
    tags: ['Farming', 'Liquidity', 'Pools'],
  },
  {
    id: 7,
    title: 'Crypto Security',
    description: 'Protege tus criptomonedas de hacks',
    instructor: 'Security Expert',
    duration: '4 hours',
    level: 'beginner',
    category: 'Security',
    rating: 4.9,
    students: 23456,
    lessons: 8,
    price: 0,
    enrolled: true,
    completed: false,
    image: '🔐',
    tags: ['Security', 'Wallet', 'Private Keys'],
  },
  {
    id: 8,
    title: 'Web3 Development',
    description: 'Construye apps decentralizadas',
    instructor: 'Tech Master',
    duration: '15 hours',
    level: 'advanced',
    category: 'Development',
    rating: 4.7,
    students: 6543,
    lessons: 30,
    price: 79,
    enrolled: false,
    completed: false,
    image: '🌐',
    tags: ['Web3', 'dApps', 'React'],
  },
  {
    id: 9,
    title: 'Metaverse Guide',
    description: 'Explora el metaverse crypto',
    instructor: 'Meta Guide',
    duration: '5 hours',
    level: 'intermediate',
    category: 'Metaverse',
    rating: 4.5,
    students: 3456,
    lessons: 12,
    price: 0,
    enrolled: false,
    completed: false,
    image: '🌟',
    tags: ['Metaverse', 'Virtual Worlds'],
  },
  {
    id: 10,
    title: 'Tokenomics 101',
    description: 'Entiende la economía de tokens',
    instructor: 'Econ Crypto',
    duration: '6 hours',
    level: 'intermediate',
    category: 'Basics',
    rating: 4.8,
    students: 8765,
    lessons: 14,
    price: 0,
    enrolled: false,
    completed: false,
    image: '💰',
    tags: ['Tokenomics', 'Economics'],
  },
];

const certificates = [
  { course: 'Bitcoin Fundamentals', date: '2024-01-15', certificateId: 'BTC-2024-1234' },
  { course: 'Crypto Security', date: '2024-01-20', certificateId: 'SEC-2024-5678' },
];

export const CryptoCourses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [tab, setTab] = useState<'courses' | 'enrolled' | 'certificates'>('courses');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const displayedCourses =
    tab === 'enrolled' ? courses.filter(c => c.enrolled) : tab === 'courses' ? filteredCourses : [];

  const categories = [...new Set(courses.map(c => c.category))];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced':
        return 'bg-red-500/20 text-red-400';
    }
  };

  const getProgress = (course: Course) => {
    if (course.completed) return 100;
    if (course.enrolled) {
      // eslint-disable-next-line react-hooks/purity
      return Math.floor(Math.random() * 80) + 10;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <GraduationCap className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Crypto Academy
            </h1>
          </div>
          <p className="text-slate-400">Aprende sobre criptomonedas con cursos profesionales</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{courses.length}</p>
                <p className="text-sm text-slate-400">Cursos</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {courses.filter(c => c.completed).length}
                </p>
                <p className="text-sm text-slate-400">Completados</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{certificates.length}</p>
                <p className="text-sm text-slate-400">Certificados</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {(courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)}
                </p>
                <p className="text-sm text-slate-400">Rating Promedio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setTab('courses')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                tab === 'courses'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              📚 Catálogo
            </button>
            <button
              onClick={() => setTab('enrolled')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                tab === 'enrolled'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🎓 Mis Cursos
            </button>
            <button
              onClick={() => setTab('certificates')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                tab === 'certificates'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🏆 Certificados
            </button>
          </div>
        </div>

        {/* Certificates View */}
        {tab === 'certificates' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Mis Certificados</h2>
            <div className="space-y-4">
              {certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <h3 className="font-semibold text-white">{cert.course}</h3>
                      </div>
                      <p className="text-sm text-slate-400">
                        Completado el: {new Date(cert.date).toLocaleDateString('es-ES')}
                      </p>
                      <p className="text-xs text-slate-500">ID: {cert.certificateId}</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Ver Certificado
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters for Courses */}
        {(tab === 'courses' || tab === 'enrolled') && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Todos
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 ml-auto">
                {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${getLevelColor(level)} ${
                      selectedLevel === level ? 'ring-2 ring-purple-500' : ''
                    } capitalize`}
                  >
                    {level === 'all' ? 'Todos' : level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map(course => {
            const progress = getProgress(course);
            return (
              <div
                key={course.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <span className="text-6xl">{course.image}</span>
                  </div>
                  {course.completed && (
                    <div className="absolute top-2 right-2 bg-green-500/80 px-2 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completado
                    </div>
                  )}
                  {course.price > 0 && !course.enrolled && (
                    <div className="absolute top-2 left-2 bg-purple-500/80 px-2 py-1 rounded-full text-xs font-medium text-white">
                      ${course.price}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}
                    >
                      {course.level}
                    </span>
                    <span className="text-xs text-slate-400">{course.category}</span>
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{course.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-white">{course.rating}</span>
                    <span className="text-xs text-slate-400">
                      ({course.students.toLocaleString()} estudiantes)
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {course.lessons} lecciones
                    </span>
                  </div>
                  {course.enrolled && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Progreso</span>
                        <span className="text-white font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        course.enrolled
                          ? 'bg-purple-600 text-white'
                          : course.price === 0
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                    >
                      {course.enrolled ? (
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3" /> Continuar
                        </span>
                      ) : course.price === 0 ? (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Inscribirse
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">${course.price}</span>
                      )}
                    </button>
                    {!course.enrolled && course.price > 0 && (
                      <Lock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCourse(null)}
          >
            <div
              className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-slate-400 hover:text-white float-right text-xl"
                >
                  ×
                </button>
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-8xl">{selectedCourse.image}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedCourse.title}</h2>
                <p className="text-slate-400 mb-4">{selectedCourse.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCourse.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400">Instructor</p>
                    <p className="text-white font-medium">{selectedCourse.instructor}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400">Duración</p>
                    <p className="text-white font-medium">{selectedCourse.duration}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400">Nivel</p>
                    <p className={`font-medium text-white`}>{selectedCourse.level}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400">Lecciones</p>
                    <p className="text-white font-medium">{selectedCourse.lessons}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg">
                  {selectedCourse.enrolled
                    ? '🎓 Continuar Curso'
                    : selectedCourse.price > 0
                      ? `Comprar por $${selectedCourse.price}`
                      : '📝 Inscribirse Gratis'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
