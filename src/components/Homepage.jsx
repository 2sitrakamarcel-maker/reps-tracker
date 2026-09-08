import React from 'react'
import Navbar from './navbar'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl border-4 border-[#9747FF] rounded-[36px] overflow-hidden bg-white shadow-2xl flex flex-col min-h-[85vh]">
        <header className="w-full pt-2">
          <Navbar />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-purple-50/50 border border-purple-100 rounded-3xl p-12 shadow-inner w-full max-w-2xl mx-auto backdrop-blur-sm">
            <h1 className="text-6xl sm:text-8xl font-black text-[#9747FF] tracking-tight drop-shadow-sm uppercase">
              fuck yes
            </h1>
            <p className="mt-4 text-gray-500 font-medium text-lg">
              Indie hacker mode activated.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Homepage
