import React from 'react'

const StatsView = ({ selectedDay }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-6 w-full max-w-4xl mx-auto my-1 sm:my-4 min-h-[40vh] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="text-purple-600 text-base sm:text-xl shrink-0">📊</span>
            <h2 className="text-sm sm:text-xl font-bold text-gray-800 uppercase truncate">Statistiques</h2>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-purple-600 bg-purple-100 py-1 px-2 sm:px-3 rounded-full shrink-0">
            {selectedDay}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-purple-50/60 p-3 sm:p-4 rounded-xl border border-purple-100 text-center">
            <span className="text-[11px] sm:text-xs text-gray-500 font-semibold block">VOLUME TOTAL</span>
            <span className="text-xl sm:text-2xl font-black text-[#9747FF] mt-1 block">4,250 kg</span>
          </div>
          <div className="bg-purple-50/60 p-3 sm:p-4 rounded-xl border border-purple-100 text-center">
            <span className="text-[11px] sm:text-xs text-gray-500 font-semibold block">SEANCES VALIDEES</span>
            <span className="text-xl sm:text-2xl font-black text-[#9747FF] mt-1 block">12 / 16</span>
          </div>
          <div className="bg-purple-50/60 p-3 sm:p-4 rounded-xl border border-purple-100 text-center">
            <span className="text-[11px] sm:text-xs text-gray-500 font-semibold block">SURCHARGE ACTIVE</span>
            <span className="text-xl sm:text-2xl font-black text-green-600 mt-1 block">+5.4%</span>
          </div>
        </div>
      </div>
      <div className="text-center py-4 sm:py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-3">
        <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">
          &quot;OBJECTIF : SURCHARGE PROGRESSIVE&quot;
        </p>
        <p className="text-[11px] sm:text-xs text-gray-400 mt-1">Consistez, progressez, répétez.</p>
      </div>
    </div>
  )
}

export default StatsView
