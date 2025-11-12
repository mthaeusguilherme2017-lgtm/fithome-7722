'use client'

import { ArrowRight, CheckCircle2, Flame, Target, Trophy, Zap, Clock, Heart, Star, Users, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  FitHome
                </h1>
                <p className="text-xs text-gray-600">Transforme seu corpo em casa</p>
              </div>
            </div>
            
            <Link
              href="/quiz"
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Mais de 10.000 pessoas transformadas
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Emagreça em casa com{' '}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                exercícios personalizados
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Treinos de 15-45 minutos adaptados ao seu nível. Sem equipamentos, sem academia, apenas você e seus objetivos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/quiz"
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Fazer Quiz Gratuito
                <ArrowRight className="w-6 h-6" />
              </Link>
              
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                }}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 border-2 border-gray-200"
              >
                Ver Demonstração
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Sem equipamentos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Resultados em 30 dias
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                100% online
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-200/50">
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl">
                    <Flame className="w-8 h-8 text-orange-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-800">350+</div>
                    <div className="text-sm text-gray-600">Calorias/dia</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-2xl">
                    <Target className="w-8 h-8 text-pink-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-800">5-10kg</div>
                    <div className="text-sm text-gray-600">Em 2 meses</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
                    <Clock className="w-8 h-8 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-800">15-45min</div>
                    <div className="text-sm text-gray-600">Por treino</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
                    <Trophy className="w-8 h-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-800">50+</div>
                    <div className="text-sm text-gray-600">Exercícios</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 rounded-2xl text-white">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg font-semibold mb-1">4.9/5.0 de avaliação</p>
                  <p className="text-orange-100 text-sm">Baseado em 2.847 avaliações</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-orange-200/50">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-500" />
                <div>
                  <div className="text-sm font-bold text-gray-800">10.234</div>
                  <div className="text-xs text-gray-600">Usuários ativos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Por que escolher o FitHome?
            </h3>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para transformar seu corpo em casa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-3xl">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Plano Personalizado</h4>
              <p className="text-gray-600 mb-4">
                Treinos adaptados ao seu nível, objetivo e tempo disponível. Cada pessoa é única!
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Quiz inteligente
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Metas calculadas automaticamente
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Ajuste conforme progresso
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-3xl">
              <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Resultados Rápidos</h4>
              <p className="text-gray-600 mb-4">
                Veja mudanças reais em 30 dias com treinos eficientes e cientificamente comprovados.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  HIIT e cardio intenso
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Queima até 500 cal/treino
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Acompanhamento diário
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Saúde Completa</h4>
              <p className="text-gray-600 mb-4">
                Não é só sobre peso. Monitore água, calorias, IMC e bem-estar geral.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Controle de hidratação
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Cálculo de IMC
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Histórico completo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Histórias de sucesso
          </h3>
          <p className="text-xl text-gray-600">
            Veja o que nossos usuários estão dizendo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-orange-500" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              "Perdi 8kg em 2 meses! Os treinos são rápidos e eficientes. Consigo fazer em casa mesmo com rotina corrida."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                MC
              </div>
              <div>
                <div className="font-semibold text-gray-800">Maria Clara</div>
                <div className="text-sm text-gray-600">Perdeu 8kg</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-orange-500" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              "Melhor app de exercícios que já usei! O quiz personalizado fez toda diferença. Treinos perfeitos para mim."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                RS
              </div>
              <div>
                <div className="font-semibold text-gray-800">Rafael Santos</div>
                <div className="text-sm text-gray-600">Perdeu 12kg</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-orange-500" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              "Incrível! Não precisei de academia. Economizei dinheiro e tempo. Resultados visíveis em 1 mês."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                JO
              </div>
              <div>
                <div className="font-semibold text-gray-800">Juliana Oliveira</div>
                <div className="text-sm text-gray-600">Perdeu 6kg</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Comece sua transformação hoje
          </h3>
          <p className="text-xl mb-8 text-orange-100">
            Faça o quiz gratuito e descubra o plano perfeito para você
          </p>

          <div className="bg-white rounded-3xl p-8 md:p-12 text-gray-800 mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <span className="text-3xl md:text-4xl font-bold">Acesso Completo</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-left space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>50+ exercícios personalizados</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Plano adaptado ao seu nível</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Acompanhamento de progresso</span>
                </div>
              </div>
              <div className="text-left space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Cálculo automático de metas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Sem equipamentos necessários</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Suporte contínuo</span>
                </div>
              </div>
            </div>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all duration-300"
            >
              Fazer Quiz Gratuito
              <ArrowRight className="w-6 h-6" />
            </Link>

            <p className="text-sm text-gray-600 mt-4">
              ✨ Sem cartão de crédito • Comece em 2 minutos
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-orange-100">Usuários ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-100">Exercícios</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-orange-100">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" id="demo">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FitHome</h1>
                <p className="text-sm text-gray-400">Transforme seu corpo em casa</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 FitHome. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Feito com ❤️ para sua saúde
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
