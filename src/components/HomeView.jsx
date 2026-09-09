import React from 'react'

const HomeView = ({ selectedDay, plans, todayReps, setTodayReps }) => {
  const dayPlans = plans[selectedDay] || []

  const getRep = (id) => String(todayReps?.[selectedDay]?.[id] ?? '')
  const setRep = (id, value) => {
    setTodayReps((prev) => ({
      ...prev,
      [selectedDay]: { ...(prev[selectedDay] || {}), [id]: value },
    }))
  }

  if (dayPlans.length === 0 || dayPlans.every((p) => !p.exercise.trim())) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 p-6 sm:p-8 w-full max-w-4xl mx-auto my-2 sm:my-4 text-center">
        <p className="font-bold text-gray-500 text-sm sm:text-base">Aucun exercice planifié pour {selectedDay.toLowerCase()}.</p>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Va dans Plan pour ajouter tes exos — ils apparaîtront ici.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-6 w-full max-w-4xl mx-auto my-1 sm:my-4">
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-[#9747FF] text-base sm:text-xl shrink-0">★</span>
          <h2 className="text-base sm:text-xl font-black text-gray-800 lowercase truncate">{selectedDay}</h2>
        </div>
        <div className="flex gap-4 sm:gap-12 text-[11px] sm:text-xs font-bold text-gray-400 tracking-wider shrink-0">
          <span>TODAY&apos;S REPS</span>
          <span className="hidden sm:inline">LAST WEEK</span>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {dayPlans
          .filter((p) => p.exercise.trim())
          .map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 sm:gap-3 py-3 px-3 sm:px-4 bg-gray-50/50 rounded-xl border border-gray-100"
            >
              <div className="min-w-0">
                <span className="font-bold text-gray-800 text-sm sm:text-base block truncate">{item.exercise}</span>
                {item.instruction && <span className="text-xs text-gray-400 block truncate">{item.instruction}</span>}
              </div>
              <div className="flex items-center justify-between gap-2 sm:gap-8">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="-"
                  value={getRep(item.id)}
                  onChange={(e) => setRep(item.id, e.target.value)}
                  className="flex-1 sm:flex-none sm:w-20 text-center py-2.5 bg-white border border-gray-300 rounded-lg font-bold text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9747FF] min-h-[44px]"
                />
                <span className="w-20 sm:w-24 text-center text-xs sm:text-sm font-semibold text-purple-600 bg-purple-100/60 py-2 sm:py-1.5 px-2 sm:px-3 rounded-lg shrink-0">
                  -
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HomeView
