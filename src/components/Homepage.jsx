import React, { useState } from 'react'
import Navbar from './navbar'
import HomeView from './HomeView'
import StatsView from './StatsView'
import PlanView from './PlanView'

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('Home')
  const [selectedDay, setSelectedDay] = useState('LUNDI')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-between">
      <div className="w-full max-w-5xl border-4 border-[#9747FF] rounded-[36px] overflow-hidden bg-white shadow-2xl flex flex-col min-h-[85vh]">
        {/* Header with Navbar */}
        <header className="w-full bg-[#9747FF]">
          <Navbar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </header>

        {/* Main Content View */}
        <main className="flex-1 p-6 flex flex-col justify-center">
          {activeTab === 'Home' && <HomeView selectedDay={selectedDay} />}
          {activeTab === 'Stats' && <StatsView selectedDay={selectedDay} />}
          {activeTab === 'Plan' && <PlanView selectedDay={selectedDay} />}
        </main>
      </div>

      {/* Footer Objective Quote */}
      <footer className="mt-6 text-center">
        <h2 className="text-xl sm:text-2xl font-black text-gray-800 tracking-wider uppercase">
          "OBJECTIF : SURCHARGE PROGRESSIVE"
        </h2>
      </footer>
    </div>
  )
}

export default Homepage
