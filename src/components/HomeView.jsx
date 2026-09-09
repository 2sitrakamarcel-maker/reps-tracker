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
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 w-full max-w-4xl mx-auto my-4 text-center">
        <p className="font-bold text-gray-500">Aucun exercice planifié pour {selectedDay.toLowerCase()}.</p>
        <p className="text-sm text-gray-400 mt-1">Va dans Plan pour ajouter tes exos — ils apparaîtront ici.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full max-w-4xl mx-auto my-4">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-[#9747FF] text-xl">★</span>
          <h2 className="text-xl font-black text-gray-800 lowercase">{selectedDay}</h2>
        </div>
        <div className="flex gap-12 text-xs font-bold text-gray-400 tracking-wider">
          <span>TODAY&apos;S REPS</span>
          <span className="hidden sm:inline">LAST WEEK</span>
        </div>
      </div>

      <div className="space-y-3">
        {dayPlans
          .filter((p) => p.exercise.trim())
          .map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 px-4 bg-gray-50/50 rounded-xl border border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <span className="font-bold text-gray-800 block truncate">{item.exercise}</span>
                {item.instruction && <span className="text-xs text-gray-400">{item.instruction}</span>}
              </div>
              <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="-"
                  value={getRep(item.id)}
                  onChange={(e) => setRep(item.id, e.target.value)}
                  className="w-20 text-center py-2 bg-white border border-gray-300 rounded-lg font-bold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9747FF]"
                />
                <span className="w-24 text-center text-sm font-semibold text-purple-600 bg-purple-100/60 py-1.5 px-3 rounded-lg">
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
