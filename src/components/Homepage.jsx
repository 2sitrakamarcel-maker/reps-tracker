import React, { useState, useMemo } from 'react'
import Navbar from './navbar'
import HomeView from './HomeView'
import StatsView from './StatsView'
import PlanView from './PlanView'

const getTodayName = () => {
  const daysMap = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI']
  return daysMap[new Date().getDay()]
}

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('Home')
  const today = useMemo(() => getTodayName(), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl border-4 border-[#9747FF] rounded-[36px] overflow-hidden bg-white shadow-2xl flex flex-col min-h-[85vh]">
        <header className="w-full bg-[#9747FF]">
          <Navbar activeTab={activeTab} onSelectTab={setActiveTab} selectedDay={today} />
        </header>

        <main className="flex-1 p-6 flex flex-col overflow-hidden">
          {activeTab === 'Home' && <HomeView selectedDay={today} />}
          {activeTab === 'Stats' && <StatsView selectedDay={today} />}
          {activeTab === 'Plan' && <PlanView today={today} />}
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
