import React, { useState, useMemo, useEffect } from 'react'
import Navbar from './navbar'
import HomeView from './HomeView'
import StatsView from './StatsView'
import PlanView from './PlanView'

const STORAGE_PLANS = 'reps-tracker:plans-v1'
const STORAGE_REPS = 'reps-tracker:reps-v1'

const getTodayName = () => {
  const daysMap = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI']
  return daysMap[new Date().getDay()]
}

const initialPlans = {
  LUNDI: [
    { id: 1, exercise: '', instruction: '' },
    { id: 2, exercise: '', instruction: '' },
  ],
  MARDI: [{ id: 1, exercise: '', instruction: '' }],
  MERCREDI: [{ id: 1, exercise: '', instruction: '' }],
  JEUDI: [{ id: 1, exercise: '', instruction: '' }],
  VENDREDI: [{ id: 1, exercise: '', instruction: '' }],
  SAMEDI: [{ id: 1, exercise: '', instruction: '' }],
  DIMANCHE: [{ id: 1, exercise: '', instruction: '' }],
}

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('Home')
  const today = useMemo(() => getTodayName(), [])

  const [plans, setPlans] = useState(() => load(STORAGE_PLANS, initialPlans))
  const [todayReps, setTodayReps] = useState(() => load(STORAGE_REPS, {}))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PLANS, JSON.stringify(plans))
    } catch {}
  }, [plans])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REPS, JSON.stringify(todayReps))
    } catch {}
  }, [todayReps])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl border-4 border-[#9747FF] rounded-[36px] overflow-hidden bg-white shadow-2xl flex flex-col min-h-[85vh]">
        <header className="w-full bg-[#9747FF]">
          <Navbar activeTab={activeTab} onSelectTab={setActiveTab} selectedDay={today} />
        </header>

        <main className="flex-1 p-6 flex flex-col overflow-hidden">
          {activeTab === 'Home' && (
            <HomeView selectedDay={today} plans={plans} todayReps={todayReps} setTodayReps={setTodayReps} />
          )}
          {activeTab === 'Stats' && <StatsView selectedDay={today} />}
          {activeTab === 'Plan' && <PlanView today={today} plans={plans} setPlans={setPlans} />}
        </main>
      </div>

      <footer className="mt-6 text-center">
        <h2 className="text-xl sm:text-2xl font-black text-gray-800 tracking-wider uppercase">
          &quot;OBJECTIF : SURCHARGE PROGRESSIVE&quot;
        </h2>
      </footer>
    </div>
  )
}

export default Homepage
