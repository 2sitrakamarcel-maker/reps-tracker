import React, { useMemo } from 'react'

const StatsView = ({ plans, todayReps, history, selectedDay, onReset }) => {
  const stats = useMemo(() => {
    let totalExos = 0
    let totalReps = 0
    let filled = 0
    let totalPlanned = 0

    Object.values(plans).forEach((dayList) => {
      dayList.forEach((item) => {
        if (item.exercise.trim()) {
          totalPlanned += 1
          totalExos += 1
        }
      })
    })

    Object.entries(todayReps).forEach(([, dayMap]) => {
      Object.values(dayMap).forEach((v) => {
        if (v !== '' && v !== undefined) {
          const n = Number(v)
          if (!Number.isNaN(n)) {
            totalReps += n
            filled += 1
          }
        }
      })
    })

    const lastHistoryReps = Object.values(history).reduce((acc, dayMap) => {
      Object.values(dayMap).forEach((dm) => {
        Object.values(dm).forEach((v) => {
          const n = Number(v)
          if (!Number.isNaN(n)) acc += n
        })
      })
      return acc
    }, 0)

    const surcharge = lastHistoryReps > 0 ? ((totalReps - lastHistoryReps) / lastHistoryReps) * 100 : 0

    return { totalExos, totalPlanned, totalReps, filled, lastHistoryReps, surcharge }
  }, [plans, todayReps, history])

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-6 w-full max-w-4xl mx-auto my-1 sm:my-4 min-h-[40vh] flex flex-col justify-between gap-4">
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
            <span className="text-[11px] sm:text-xs text-gray-500 font-semibold block">VOLUME (REPS)</span>
            <span className="text-xl sm:text-2xl font-black text-[#9747FF] mt-1 block">{stats.totalReps}</span>
            <span className="text-[11px] text-gray-400">total reps saisis</span>
          </div>
          <div className="bg-purple-50/60 p-3 sm:p-4 rounded-xl border border-purple-100 text-center">
            <span className="text-[11px] sm:text-xs text-gray-500 font-semibold block">SEANCES</span>
            <span className="text-xl sm:text-2xl font-black text-[#9747FF] mt-1 block">
              {stats.filled} / {stats.totalPlanned}
            </span>
            <span className="text-[11px] text-gray-400">exos remplis</span>
          </div>
          <div className="bg-purple-50/60 p-3 sm:p-4 rounded-xl border border-purple-100 text-center">
            <span className="text-[11px] sm:text-xs text-gray-500 font-semibold block">SURCHARGE</span>
            <span className={`text-xl sm:text-2xl font-black mt-1 block ${stats.surcharge >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.surcharge > 0 ? '+' : ''}
              {stats.surcharge.toFixed(1)}%
            </span>
            <span className="text-[11px] text-gray-400">vs historique</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl bg-white border-2 border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 active:scale-[0.99] transition-all min-h-[44px]"
        >
          Reset semaine (archive → last week)
        </button>
        <div className="text-center py-3 sm:py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-3">
          <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">
            &quot;OBJECTIF : SURCHARGE PROGRESSIVE&quot;
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-1">Consistez, progressez, répétez.</p>
        </div>
      </div>
    </div>
  )
}

export default StatsView
