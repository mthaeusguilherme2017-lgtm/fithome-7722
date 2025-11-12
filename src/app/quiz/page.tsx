'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, ArrowLeft, Flame, Target, Trophy, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Qual é o seu principal objetivo?',
    options: ['Perder peso', 'Ganhar massa muscular', 'Melhorar condicionamento', 'Manter saúde']
  },
  {
    id: 2,
    question: 'Quanto tempo você pode dedicar por dia?',
    options: ['15-20 minutos', '20-30 minutos', '30-45 minutos', 'Mais de 45 minutos']
  },
  {
    id: 3,
    question: 'Qual seu nível de experiência com exercícios?',
    options: ['Iniciante', 'Intermediário', 'Avançado', 'Atleta']
  },
  {
    id: 4,
    question: 'Você tem alguma restrição física?',
    options: ['Não', 'Problemas nas articulações', 'Problemas nas costas', 'Outras limitações']
  },
  {
    id: 5,
    question: 'Qual tipo de exercício você prefere?',
    options: ['Cardio intenso', 'Força e resistência', 'Flexibilidade', 'Mix de tudo']
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowResult(true)
      }, 300)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getRecommendation = () => {
    // Lógica simples de recomendação baseada nas respostas
    const goal = answers[0]
    const time = answers[1]
    const level = answers[2]

    return {
      title: 'Plano Personalizado Pronto!',
      description: `Baseado nas suas respostas, criamos um plano ideal para você alcançar seu objetivo de ${goal?.toLowerCase()}.`,
      plan: level === 'Iniciante' ? 'Plano Starter' : level === 'Intermediário' ? 'Plano Pro' : 'Plano Elite',
      duration: time,
      features: [
        'Treinos personalizados para seu nível',
        'Acompanhamento de progresso em tempo real',
        'Cálculo automático de metas diárias',
        'Mais de 50 exercícios diferentes',
        'Suporte e orientação contínua'
      ]
    }
  }

  const recommendation = showResult ? getRecommendation() : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FitHome
              </h1>
              <p className="text-sm text-gray-600">Quiz Personalizado</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm font-medium text-orange-600">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-medium transition-all duration-300 ${
                    answers[currentQuestion] === option
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {answers[currentQuestion] === option && (
                      <CheckCircle2 className="w-6 h-6 text-orange-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>

              <div className="flex gap-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuestion
                        ? 'bg-orange-500 w-8'
                        : index < currentQuestion
                        ? 'bg-orange-300'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Result */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {recommendation?.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {recommendation?.description}
              </p>
            </div>

            {/* Plan Details */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{recommendation?.plan}</h3>
                  <p className="text-gray-600">{recommendation?.duration} por dia</p>
                </div>
                <Sparkles className="w-12 h-12 text-orange-500" />
              </div>

              <div className="space-y-3">
                {recommendation?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Link
                href="/app"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Começar Agora
                <ArrowRight className="w-6 h-6" />
              </Link>

              <button
                onClick={() => {
                  setCurrentQuestion(0)
                  setAnswers([])
                  setShowResult(false)
                }}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Refazer Quiz
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Exercícios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">10k+</div>
                <div className="text-sm text-gray-600">Usuários</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">4.9★</div>
                <div className="text-sm text-gray-600">Avaliação</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
