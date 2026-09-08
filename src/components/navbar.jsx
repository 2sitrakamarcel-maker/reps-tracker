import React, { useState } from 'react'

const Navbar = () => {
  const [active, setActive] = useState('Home')
  const tabs = ['Home', 'Stats', 'Plan']

  return (
    <nav className="w-full py-4 px-6 flex justify-center">
      <div className="bg-[#9747FF] w-full max-w-3xl rounded-full py-3 px-6 flex items-center justify-around shadow-lg shadow-purple-500/25">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`bg-white text-[#9747FF] font-bold px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${
              active === tab ? 'ring-4 ring-white/60 shadow-xl' : 'opacity-90 hover:opacity-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
