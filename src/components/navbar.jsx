import React from 'react'

const Navbar = ({ activeTab, onSelectTab, selectedDay, onSelectDay }) => {
  const tabs = ['Home', 'Stats', 'Plan']
  const days = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE']

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between flex-wrap gap-4">
      {/* Day Selector Pill */}
      <div className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2 flex items-center space-x-2 text-white font-bold text-sm shadow-sm">
        <span className="opacity-80">DAY :</span>
        <select
          value={selectedDay}
          onChange={(e) => onSelectDay(e.target.value)}
          className="bg-transparent text-white font-bold outline-none cursor-pointer"
        >
          {days.map((day) => (
            <option key={day} value={day} className="text-gray-900 bg-white">
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Nav Tabs */}
      <div className="bg-[#9747FF] rounded-full py-2 px-4 flex items-center space-x-2 shadow-lg shadow-purple-500/25">
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                isActive
                  ? 'bg-white text-[#9747FF] shadow-md scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
