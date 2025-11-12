'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Timer, Trophy, Calendar, Flame, Target, CheckCircle2, Clock, Zap, Droplets, Scale, TrendingDown, User, Calculator, Heart } from 'lucide-react'

interface Exercise {
  id: string
  name: string
  description: string
  duration: number // em segundos
  calories: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  category: 'Cardio' | 'Força' | 'Flexibilidade' | 'HIIT'
}

interface WorkoutSession {
  id: string
  date: string
  exercises: string[]
  totalTime: number
  totalCalories: number
}

interface UserProfile {
  weight: number
  height: number
  age: number
  gender: 'masculino' | 'feminino'
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso'
  goal: 'perder' | 'manter' | 'ganhar'
  targetWeight: number
}

interface DailyGoals {
  waterIntake: number // ml
  caloriesBurn: number
  steps: number
  workoutTime: number // minutos
}

interface DailyProgress {
  date: string
  waterConsumed: number
  caloriesBurned: number
  steps: number
  workoutTime: number
}

const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Jumping Jacks',
    description: 'Salte abrindo e fechando pernas e braços simultaneamente',
    duration: 30,
    calories: 8,
    difficulty: 'Fácil',
    category: 'Cardio'
  },
  {
    id: '2',
    name: 'Burpees',
    description: 'Agachamento, prancha, flexão, salto vertical',
    duration: 45,
    calories: 15,
    difficulty: 'Difícil',
    category: 'HIIT'
  },
  {
    id: '3',
    name: 'Mountain Climbers',
    description: 'Posição de prancha alternando joelhos ao peito',
    duration: 30,
    calories: 10,
    difficulty: 'Médio',
    category: 'Cardio'
  },
  {
    id: '4',
    name: 'Agachamentos',
    description: 'Flexione joelhos mantendo costas retas',
    duration: 45,
    calories: 12,
    difficulty: 'Fácil',
    category: 'Força'
  },
  {
    id: '5',
    name: 'Prancha',
    description: 'Mantenha corpo reto apoiado nos antebraços',
    duration: 60,
    calories: 8,
    difficulty: 'Médio',
    category: 'Força'
  },
  {
    id: '6',
    name: 'High Knees',
    description: 'Corra no lugar elevando joelhos ao máximo',
    duration: 30,
    calories: 9,
    difficulty: 'Fácil',
    category: 'Cardio'
  },
  {
    id: '7',
    name: 'Flexões',
    description: 'Apoie mãos no chão e flexione braços',
    duration: 45,
    calories: 11,
    difficulty: 'Médio',
    category: 'Força'
  },
  {
    id: '8',
    name: 'Lunges',
    description: 'Passo à frente flexionando ambos joelhos',
    duration: 45,
    calories: 10,
    difficulty: 'Médio',
    category: 'Força'
  }
]

export default function FitnessApp() {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [currentWorkout, setCurrentWorkout] = useState<Exercise[]>([])
  const [workoutIndex, setWorkoutIndex] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [showGoals, setShowGoals] = useState(false)
  
  // Novos estados para perfil e metas
  const [userProfile, setUserProfile] = useState<UserProfile>({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'feminino',
    activityLevel: 'leve',
    goal: 'perder',
    targetWeight: 65
  })
  
  const [dailyGoals, setDailyGoals] = useState<DailyGoals>({
    waterIntake: 2000,
    caloriesBurn: 300,
    steps: 8000,
    workoutTime: 30
  })
  
  const [todayProgress, setTodayProgress] = useState<DailyProgress>({
    date: new Date().toDateString(),
    waterConsumed: 0,
    caloriesBurned: 0,
    steps: 0,
    workoutTime: 0
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('workoutSessions')
    const savedProfile = localStorage.getItem('userProfile')
    const savedGoals = localStorage.getItem('dailyGoals')
    const savedProgress = localStorage.getItem('todayProgress')
    
    if (savedSessions) {
      setWorkoutSessions(JSON.parse(savedSessions))
    }
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
    if (savedGoals) {
      setDailyGoals(JSON.parse(savedGoals))
    }
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      // Reset progress if it's a new day
      if (progress.date !== new Date().toDateString()) {
        const newProgress = {
          date: new Date().toDateString(),
          waterConsumed: 0,
          caloriesBurned: 0,
          steps: 0,
          workoutTime: 0
        }
        setTodayProgress(newProgress)
        localStorage.setItem('todayProgress', JSON.stringify(newProgress))
      } else {
        setTodayProgress(progress)
      }
    }
  }, [])

  // Calcular metas baseadas no perfil
  useEffect(() => {
    const calculateGoals = () => {
      // Cálculo de água (35ml por kg de peso corporal)
      const waterIntake = Math.round(userProfile.weight * 35)
      
      // Cálculo de calorias para queimar (baseado no objetivo)
      let caloriesBurn = 200
      if (userProfile.goal === 'perder') {
        const weightDiff = userProfile.weight - userProfile.targetWeight
        caloriesBurn = Math.max(200, Math.min(500, weightDiff * 50))
      }
      
      // Ajustar metas baseado no nível de atividade
      const activityMultiplier = {
        sedentario: 0.8,
        leve: 1.0,
        moderado: 1.3,
        intenso: 1.6
      }
      
      const newGoals = {
        waterIntake,
        caloriesBurn: Math.round(caloriesBurn * activityMultiplier[userProfile.activityLevel]),
        steps: userProfile.activityLevel === 'sedentario' ? 6000 : 
               userProfile.activityLevel === 'leve' ? 8000 :
               userProfile.activityLevel === 'moderado' ? 10000 : 12000,
        workoutTime: userProfile.activityLevel === 'sedentario' ? 20 : 
                    userProfile.activityLevel === 'leve' ? 30 :
                    userProfile.activityLevel === 'moderado' ? 45 : 60
      }
      
      setDailyGoals(newGoals)
      localStorage.setItem('dailyGoals', JSON.stringify(newGoals))
    }
    
    calculateGoals()
  }, [userProfile])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      completeExercise()
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise)
    setTimeLeft(exercise.duration)
    setIsRunning(true)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    if (currentExercise) {
      setTimeLeft(currentExercise.duration)
    }
  }

  const completeExercise = () => {
    if (currentExercise) {
      setCompletedExercises(prev => [...prev, currentExercise.id])
      setIsRunning(false)
      
      // Atualizar progresso diário
      const newProgress = {
        ...todayProgress,
        caloriesBurned: todayProgress.caloriesBurned + currentExercise.calories,
        workoutTime: todayProgress.workoutTime + Math.round(currentExercise.duration / 60)
      }
      setTodayProgress(newProgress)
      localStorage.setItem('todayProgress', JSON.stringify(newProgress))
      
      // Se está em um treino, avança para próximo exercício
      if (currentWorkout.length > 0 && workoutIndex < currentWorkout.length - 1) {
        setTimeout(() => {
          const nextIndex = workoutIndex + 1
          setWorkoutIndex(nextIndex)
          startExercise(currentWorkout[nextIndex])
        }, 2000)
      } else if (currentWorkout.length > 0 && workoutIndex === currentWorkout.length - 1) {
        // Treino completo
        completeWorkout()
      }
    }
  }

  const startQuickWorkout = () => {
    const workout = exercises.slice(0, 4) // 4 exercícios rápidos
    setCurrentWorkout(workout)
    setWorkoutIndex(0)
    startExercise(workout[0])
  }

  const completeWorkout = () => {
    const session: WorkoutSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      exercises: currentWorkout.map(e => e.id),
      totalTime: currentWorkout.reduce((acc, e) => acc + e.duration, 0),
      totalCalories: currentWorkout.reduce((acc, e) => acc + e.calories, 0)
    }
    
    const updatedSessions = [...workoutSessions, session]
    setWorkoutSessions(updatedSessions)
    localStorage.setItem('workoutSessions', JSON.stringify(updatedSessions))
    
    setCurrentWorkout([])
    setWorkoutIndex(0)
    setCurrentExercise(null)
  }

  const addWater = (amount: number) => {
    const newProgress = {
      ...todayProgress,
      waterConsumed: Math.min(todayProgress.waterConsumed + amount, dailyGoals.waterIntake + 1000)
    }
    setTodayProgress(newProgress)
    localStorage.setItem('todayProgress', JSON.stringify(newProgress))
  }

  const updateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile)
    localStorage.setItem('userProfile', JSON.stringify(newProfile))
    setShowProfile(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-600 bg-green-100'
      case 'Médio': return 'text-yellow-600 bg-yellow-100'
      case 'Difícil': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cardio': return 'text-blue-600 bg-blue-100'
      case 'Força': return 'text-purple-600 bg-purple-100'
      case 'Flexibilidade': return 'text-green-600 bg-green-100'
      case 'HIIT': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  const filteredExercises = selectedCategory === 'Todos' 
    ? exercises 
    : exercises.filter(e => e.category === selectedCategory)

  const totalCaloriesToday = workoutSessions
    .filter(session => new Date(session.date).toDateString() === new Date().toDateString())
    .reduce((acc, session) => acc + session.totalCalories, 0)

  const totalWorkoutsThisWeek = workoutSessions
    .filter(session => {
      const sessionDate = new Date(session.date)
      const today = new Date()
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return sessionDate >= weekAgo
    }).length

  const calculateBMI = () => {
    const heightInM = userProfile.height / 100
    return (userProfile.weight / (heightInM * heightInM)).toFixed(1)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Abaixo do peso', color: 'text-blue-600' }
    if (bmi < 25) return { text: 'Peso normal', color: 'text-green-600' }
    if (bmi < 30) return { text: 'Sobrepeso', color: 'text-yellow-600' }
    return { text: 'Obesidade', color: 'text-red-600' }
  }

  const bmi = parseFloat(calculateBMI())
  const bmiCategory = getBMICategory(bmi)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  FitHome
                </h1>
                <p className="text-sm text-gray-600">Exercícios em Casa</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowProfile(true)}
                className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowGoals(true)}
                className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                <Target className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Metas Diárias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Água */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Água</span>
              </div>
              <button
                onClick={() => addWater(250)}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-200 transition-colors"
              >
                +250ml
              </button>
            </div>
            <div className="mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-blue-600">
                  {(todayProgress.waterConsumed / 1000).toFixed(1)}L
                </span>
                <span className="text-sm text-gray-500">
                  / {(dailyGoals.waterIntake / 1000).toFixed(1)}L
                </span>
              </div>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(todayProgress.waterConsumed, dailyGoals.waterIntake)}%` }}
              />
            </div>
          </div>

          {/* Calorias */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-orange-200/50">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Calorias</span>
            </div>
            <div className="mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-orange-600">
                  {todayProgress.caloriesBurned}
                </span>
                <span className="text-sm text-gray-500">
                  / {dailyGoals.caloriesBurn} cal
                </span>
              </div>
            </div>
            <div className="w-full bg-orange-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(todayProgress.caloriesBurned, dailyGoals.caloriesBurn)}%` }}
              />
            </div>
          </div>

          {/* Tempo de Treino */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-200/50">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Treino</span>
            </div>
            <div className="mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-purple-600">
                  {todayProgress.workoutTime}min
                </span>
                <span className="text-sm text-gray-500">
                  / {dailyGoals.workoutTime}min
                </span>
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(todayProgress.workoutTime, dailyGoals.workoutTime)}%` }}
              />
            </div>
          </div>

          {/* IMC */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-200/50">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">IMC</span>
            </div>
            <div className="mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-green-600">
                  {bmi}
                </span>
              </div>
              <div className={`text-xs ${bmiCategory.color}`}>
                {bmiCategory.text}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Meta: {userProfile.targetWeight}kg
            </div>
          </div>
        </div>

        {/* Timer Ativo */}
        {currentExercise && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border border-orange-200/50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentExercise.name}</h2>
              <p className="text-gray-600 mb-4">{currentExercise.description}</p>
              
              <div className="text-6xl font-bold text-orange-600 mb-6">
                {formatTime(timeLeft)}
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={toggleTimer}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isRunning ? 'Pausar' : 'Iniciar'}
                </button>
                
                <button
                  onClick={resetTimer}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
              
              {currentWorkout.length > 0 && (
                <div className="text-sm text-gray-600">
                  Exercício {workoutIndex + 1} de {currentWorkout.length}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Treino Rápido */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Treino Rápido</h3>
              <p className="text-orange-100 mb-4">4 exercícios • 5 minutos • 40 calorias</p>
            </div>
            <Zap className="w-12 h-12 text-orange-200" />
          </div>
          
          <button
            onClick={startQuickWorkout}
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Começar Agora
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Todos', 'Cardio', 'Força', 'Flexibilidade', 'HIIT'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lista de Exercícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredExercises.map(exercise => (
            <div
              key={exercise.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {completedExercises.includes(exercise.id) && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{exercise.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(exercise.category)}`}>
                  {exercise.category}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(exercise.duration)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {exercise.calories} cal
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => startExercise(exercise)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Iniciar
              </button>
            </div>
          ))}
        </div>

        {/* Histórico */}
        {workoutSessions.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">Histórico de Treinos</h3>
            </div>
            
            <div className="space-y-4">
              {workoutSessions.slice(-5).reverse().map(session => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {new Date(session.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-sm text-gray-600">
                        {session.exercises.length} exercícios
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-orange-600">
                      {session.totalCalories} cal
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatTime(session.totalTime)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Perfil */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Meu Perfil</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  value={userProfile.weight}
                  onChange={(e) => setUserProfile({...userProfile, weight: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={userProfile.height}
                  onChange={(e) => setUserProfile({...userProfile, height: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                <select
                  value={userProfile.gender}
                  onChange={(e) => setUserProfile({...userProfile, gender: e.target.value as 'masculino' | 'feminino'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Atividade</label>
                <select
                  value={userProfile.activityLevel}
                  onChange={(e) => setUserProfile({...userProfile, activityLevel: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="sedentario">Sedentário</option>
                  <option value="leve">Leve</option>
                  <option value="moderado">Moderado</option>
                  <option value="intenso">Intenso</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
                <select
                  value={userProfile.goal}
                  onChange={(e) => setUserProfile({...userProfile, goal: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="perder">Perder peso</option>
                  <option value="manter">Manter peso</option>
                  <option value="ganhar">Ganhar peso</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peso Meta (kg)</label>
                <input
                  type="number"
                  value={userProfile.targetWeight}
                  onChange={(e) => setUserProfile({...userProfile, targetWeight: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowProfile(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => updateProfile(userProfile)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Metas */}
      {showGoals && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Metas Diárias</h2>
              <button
                onClick={() => setShowGoals(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl">
                <Calculator className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-2">Metas Calculadas</h3>
                <p className="text-sm text-gray-600">
                  Baseadas no seu perfil e objetivos
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <div className="font-bold text-blue-600">{(dailyGoals.waterIntake / 1000).toFixed(1)}L</div>
                  <div className="text-xs text-gray-600">Água</div>
                </div>
                
                <div className="text-center p-3 bg-orange-50 rounded-xl">
                  <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                  <div className="font-bold text-orange-600">{dailyGoals.caloriesBurn}</div>
                  <div className="text-xs text-gray-600">Calorias</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div className="font-bold text-purple-600">{dailyGoals.workoutTime}min</div>
                  <div className="text-xs text-gray-600">Treino</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <div className="font-bold text-green-600">{userProfile.weight - userProfile.targetWeight}kg</div>
                  <div className="text-xs text-gray-600">A perder</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                💡 As metas são calculadas automaticamente baseadas no seu peso ({userProfile.weight}kg), 
                altura ({userProfile.height}cm), nível de atividade ({userProfile.activityLevel}) e objetivo ({userProfile.goal} peso).
              </div>
            </div>
            
            <button
              onClick={() => setShowGoals(false)}
              className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
