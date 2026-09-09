import React, { useState, useMemo, useEffect } from 'react'
import Navbar from './navbar'
import HomeView from './HomeView'
import StatsView from './StatsView'
import PlanView from './PlanView'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { supabase, isSupabaseConfigured, getDeviceId } from '../lib/supabase'

const STORAGE_PLANS = 'reps-tracker:plans-v1'
const STORAGE_REPS = 'reps-tracker:reps-v1'
const STORAGE_HISTORY = 'reps-tracker:history-v1'

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

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('Home')
  const today = useMemo(() => getTodayName(), [])

  const [plans, setPlans] = useLocalStorage(STORAGE_PLANS, initialPlans)
  const [todayReps, setTodayReps] = useLocalStorage(STORAGE_REPS, {})
  const [history, setHistory] = useLocalStorage(STORAGE_HISTORY, {})

  // Supabase sync without auth - device_id
  useEffect(() => {
    if (!isSupabaseConfigured) return
    const deviceId = getDeviceId()
    // load from supabase on mount
    supabase
      .from('reps_data')
      .select('data')
      .eq('device_id', deviceId)
      .single()
      .then(({ data }) => {
        if (data?.data) {
          if (data.data.plans) setPlans(data.data.plans)
          if (data.data.todayReps) setTodayReps(data.data.todayReps)
          if (data.data.history) setHistory(data.data.history)
        }
      })
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) return
    const deviceId = getDeviceId()
    const timeout = setTimeout(() => {
      supabase.from('reps_data').upsert({ device_id: deviceId, data: { plans, todayReps, history }, updated_at: new Date().toISOString() }).then(() => {})
    }, 800)
    return () => clearTimeout(timeout)
  }, [plans, todayReps, history])

  const resetWeek = () => {
    if (!confirm('Reset tous les TODAY\'S REPS de la semaine ?')) return
    const now = new Date().toISOString().slice(0, 10)
    setHistory((prev) => ({ ...prev, [now]: todayReps }))
    setTodayReps({})
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ plans, todayReps, history }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reps-tracker-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJson = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        if (parsed.plans) setPlans(parsed.plans)
        if (parsed.todayReps) setTodayReps(parsed.todayReps)
        if (parsed.history) setHistory(parsed.history)
      } catch {}
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-purple-50 via-white to-purple-100 p-0 sm:p-4 md:p-8 flex flex-col items-center">
      <div className="w-full sm:max-w-5xl border-0 sm:border-4 border-[#9747FF] rounded-none sm:rounded-[36px] overflow-hidden bg-white shadow-none sm:shadow-2xl flex flex-col min-h-[100dvh] sm:min-h-[85vh]">
        <header className="w-full bg-[#9747FF] sticky top-0 z-20">
          <Navbar activeTab={activeTab} onSelectTab={setActiveTab} selectedDay={today} />
        </header>

        <main className="flex-1 p-3 sm:p-6 flex flex-col overflow-auto">
          {activeTab === 'Home' && (
            <HomeView selectedDay={today} plans={plans} todayReps={todayReps} setTodayReps={setTodayReps} history={history} />
          )}
          {activeTab === 'Stats' && (
            <StatsView plans={plans} todayReps={todayReps} history={history} selectedDay={today} onReset={resetWeek} onExport={exportJson} onImport={importJson} isSupabase={isSupabaseConfigured} />
          )}
          {activeTab === 'Plan' && <PlanView today={today} plans={plans} setPlans={setPlans} />}
        </main>
      </div>

      <footer className="mt-3 sm:mt-6 text-center px-3 py-2">
        <h2 className="text-sm sm:text-2xl font-black text-gray-800 tracking-wider uppercase">
          &quot;OBJECTIF : SURCHARGE PROGRESSIVE&quot;
        </h2>
        {!isSupabaseConfigured && <p className="text-[11px] text-gray-400 mt-1">Local only — ajoute VITE_SUPABASE_URL pour sync</p>}
      </footer>
    </div>
  )
}

export default Homepage
