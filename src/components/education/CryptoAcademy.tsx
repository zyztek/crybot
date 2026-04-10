import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Award, Clock, Users, PlayCircle, CheckCircle, Lock, Star, TrendingUp, Target } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'trading' | 'defi' | 'security';
  level: number;
  duration: number; // in minutes
  lessons: number;
  enrolled: number;
  rating: number;
  instructor: string;
  thumbnail: string;
  price: number;
  certificate: boolean;
  progress?: number;
  completed?: boolean;
  enrolledAt?: string;
}

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number;
  type: 'video' | 'text' | 'quiz' | 'interactive';
  order: number;
  completed: boolean;
  locked: boolean;
}

interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  certificateId: string;
  verified: boolean;
  shareable: boolean;
}

export const CryptoAcademy: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchAcademyData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockCourses: Course[] = [
          {
            id: 'course-1',
            title: 'Bitcoin Fundamentals',
            description: 'Learn the basics of Bitcoin, blockchain technology, and cryptocurrency principles.',
            category: 'beginner',
            level: 1,
            duration: 120,
            lessons: 8,
            enrolled: 15420,
            rating: 4.8,
            instructor: 'Dr. Sarah Chen',
            thumbnail: 'bitcoin-fundamentals',
            price: 0,
            certificate: true,
            progress: 75,
            completed: false,
            enrolledAt: '2024-01-10T10:30:00Z'
          },
          {
            id: 'course-2',
            title: 'Ethereum Smart Contracts',
            description: 'Deep dive into Ethereum, smart contracts, and decentralized applications.',
            category: 'intermediate',
            level: 2,
            duration: 180,
            lessons: 12,
            enrolled: 8930,
            rating: 4.7,
            instructor: 'Prof. Michael Roberts',
            thumbnail: 'ethereum-smart-contracts',
            price: 49,
            certificate: true,
            progress: 30,
            completed: false,
            enrolledAt: '2024-01-08T14:20:00Z'
          },
          {
            id: 'course-3',
            title: 'Advanced Trading Strategies',
            description: 'Master technical analysis, risk management, and professional trading techniques.',
            category: 'trading',
            level: 3,
            duration: 240,
            lessons: 16,
            enrolled: 6750,
            rating: 4.9,
            instructor: 'Alex Thompson',
            thumbnail: 'advanced-trading',
            price: 99,
            certificate: true
          },
          {
            id: 'course-4',
            title: 'DeFi Yield Farming',
            description: 'Learn how to generate passive income through DeFi protocols and yield farming.',
            category: 'defi',
            level: 2,
            duration: 150,
            lessons: 10,
            enrolled: 12300,
            rating: 4.6,
            instructor: 'Lisa Wang',
            thumbnail: 'defi-yield',
            price: 79,
            certificate: true
          },
          {
            id: 'course-5',
            title: 'Crypto Security Best Practices',
            description: 'Essential security practices for protecting your digital assets.',
            category: 'security',
            level: 1,
            duration: 90,
            lessons: 6,
            enrolled: 18900,
            rating: 4.9,
            instructor: 'Security Team',
            thumbnail: 'crypto-security',
            price: 0,
            certificate: true,
            progress: 100,
            completed: true,
            enrolledAt: '2024-01-05T09:15:00Z'
          }
        ];

        const mockLessons: Lesson[] = [
          {
            id: 'lesson-1',
            courseId: 'course-1',
            title: 'Introduction to Bitcoin',
            description: 'What is Bitcoin and how does it work?',
            duration: 15,
            type: 'video',
            order: 1,
            completed: true,
            locked: false
          },
          {
            id: 'lesson-2',
            courseId: 'course-1',
            title: 'Blockchain Technology',
            description: 'Understanding the blockchain fundamentals',
            duration: 20,
            type: 'video',
            order: 2,
            completed: true,
            locked: false
          },
          {
            id: 'lesson-3',
            courseId: 'course-1',
            title: 'Bitcoin Mining',
            description: 'How mining works and its importance',
            duration: 18,
            type: 'interactive',
            order: 3,
            completed: false,
            locked: false
          },
          {
            id: 'lesson-4',
            courseId: 'course-1',
            title: 'Bitcoin Wallets',
            description: 'Types of wallets and how to use them',
            duration: 12,
            type: 'text',
            order: 4,
            completed: false,
            locked: false
          }
        ];

        const mockCertificates: Certificate[] = [
          {
            id: 'cert-1',
            courseId: 'course-5',
            courseTitle: 'Crypto Security Best Practices',
            issuedAt: '2024-01-15T16:30:00Z',
            certificateId: 'CRYBOT-CERT-2024-001234',
            verified: true,
            shareable: true
          }
        ];

        setCourses(mockCourses);
        setLessons(mockLessons);
        setCertificates(mockCertificates);
        setEnrolledCourses(['course-1', 'course-2', 'course-5']);
      } catch (error) {
        console.error('Error fetching academy data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademyData();
  }, []);

  const handleEnrollCourse = async (courseId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEnrolledCourses(prev => [...prev, courseId]);
      
      setCourses(prev => prev.map(course => 
        course.id === courseId 
          ? { 
              ...course, 
              enrolledAt: new Date().toISOString(),
              progress: 0,
              completed: false
            }
          : course
      ));
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleCompleteLesson = async (lessonId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLessons(prev => prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed: true }
          : lesson
      ));

      // Update course progress
      const lesson = lessons.find(l => l.id === lessonId);
      if (lesson) {
        const courseLessons = lessons.filter(l => l.courseId === lesson.courseId);
        const completedLessons = courseLessons.filter(l => l.completed).length;
        const progress = (completedLessons / courseLessons.length) * 100;
        
        setCourses(prev => prev.map(course => 
          course.id === lesson.courseId 
            ? { ...course, progress }
            : course
        ));
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const getCategoryColor = (category: Course['category']) => {
    switch (category) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'trading': return 'bg-orange-100 text-orange-800';
      case 'defi': return 'bg-yellow-100 text-yellow-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = courses.filter(course => 
    selectedCategory === 'all' || course.category === selectedCategory
  );

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
          <GraduationCap className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Crypto Academy</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {enrolledCourses.length} courses enrolled
          </div>
          <div className="text-sm text-gray-600">
            {certificates.length} certificates earned
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Students</p>
              <p className="text-3xl font-bold">
                {courses.reduce((sum, course) => sum + course.enrolled, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Courses Completed</p>
              <p className="text-3xl font-bold">{courses.filter(c => c.completed).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Learning Hours</p>
              <p className="text-3xl font-bold">
                {courses
                  .filter(c => enrolledCourses.includes(c.id))
                  .reduce((sum, course) => sum + (course.progress || 0) / 100 * course.duration, 0)
                  .toFixed(0)}
              </p>
            </div>
            <Clock className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Certificates</p>
              <p className="text-3xl font-bold">{certificates.length}</p>
            </div>
            <Award className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', name: 'All Courses' },
          { id: 'beginner', name: 'Beginner' },
          { id: 'intermediate', name: 'Intermediate' },
          { id: 'advanced', name: 'Advanced' },
          { id: 'trading', name: 'Trading' },
          { id: 'defi', name: 'DeFi' },
          { id: 'security', name: 'Security' }
        ].map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Course Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white opacity-50" />
            </div>
            
            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(course.category)}`}>
                  {course.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              
              {/* Course Info */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}min</span>
                  </span>
                  <span>{course.lessons} lessons</span>
                </div>
                <span>Level {course.level}</span>
              </div>
              
              {/* Progress */}
              {enrolledCourses.includes(course.id) && course.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round(course.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Instructor */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">by {course.instructor}</span>
                <div className="flex items-center space-x-2">
                  {course.certificate && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Certificate
                    </span>
                  )}
                  {course.price === 0 ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      ${course.price}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                {enrolledCourses.includes(course.id) ? (
                  <>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {course.completed ? 'Review' : 'Continue'}
                    </button>
                    {course.completed && course.certificate && (
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <Award className="w-4 h-4" />
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleEnrollCourse(course.id)}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{selectedCourse.title}</h3>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Course Lessons */}
              <h4 className="font-semibold mb-4">Course Content</h4>
              <div className="space-y-3">
                {lessons
                  .filter(lesson => lesson.courseId === selectedCourse.id)
                  .sort((a, b) => a.order - b.order)
                  .map(lesson => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          lesson.completed 
                            ? 'bg-green-100 text-green-600' 
                            : lesson.locked 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {lesson.type === 'video' && <PlayCircle className="w-5 h-5" />}
                          {lesson.type === 'text' && <BookOpen className="w-5 h-5" />}
                          {lesson.type === 'quiz' && <Target className="w-5 h-5" />}
                          {lesson.type === 'interactive' && <TrendingUp className="w-5 h-5" />}
                        </div>
                        <div>
                          <h5 className="font-medium">{lesson.title}</h5>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{lesson.duration} minutes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {lesson.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {lesson.locked && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        {!lesson.completed && !lesson.locked && (
                          <button
                            onClick={() => handleCompleteLesson(lesson.id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificates Section */}
      {certificates.length > 0 && (
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Your Certificates</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map(certificate => (
                <div key={certificate.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{certificate.courseTitle}</h4>
                      <p className="text-sm text-gray-600">ID: {certificate.certificateId}</p>
                    </div>
                    {certificate.verified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Issued: {new Date(certificate.issuedAt).toLocaleDateString()}</span>
                    <span>Verified: {certificate.verified ? 'Yes' : 'No'}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      View Certificate
                    </button>
                    {certificate.shareable && (
                      <button className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                        Share
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
