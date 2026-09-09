import React from 'react'

const Navbar = ({ activeTab, onSelectTab, selectedDay }) => {
  const tabs = ['Home', 'Stats', 'Plan']

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between flex-wrap gap-4">
      {/* Day Badge - read only, auto day */}
      <div className="bg-white text-[#9747FF] rounded-full px-5 py-2 flex items-center gap-2 font-black text-sm shadow-md">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        DAY : {selectedDay}
      </div>

      {/* Nav Tabs */}
      <div className="bg-[#9747FF] rounded-full py-2 px-4 flex items-center gap-2 shadow-lg shadow-purple-500/25">
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
