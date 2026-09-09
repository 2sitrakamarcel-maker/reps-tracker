import React, { useState } from 'react'

const HomeView = ({ selectedDay }) => {
  const [exercises, setExercises] = useState({
    LUNDI: [
      { id: 1, name: 'Développé couché', reps: '10', lastWeek: '8 reps' },
      { id: 2, name: 'Incliné haltères', reps: '12', lastWeek: '10 reps' },
      { id: 3, name: 'Écartés poulie', reps: '15', lastWeek: '15 reps' },
      { id: 4, name: 'Dips', reps: '8', lastWeek: '8 reps' },
    ],
    MARDI: [
      { id: 1, name: 'Tractions pronation', reps: '8', lastWeek: '7 reps' },
      { id: 2, name: 'Rowing barre', reps: '10', lastWeek: '10 reps' },
      { id: 3, name: 'Tirage vertical', reps: '12', lastWeek: '12 reps' },
    ],
    MERCREDI: [
      { id: 1, name: 'Squat barre', reps: '8', lastWeek: '8 reps' },
      { id: 2, name: 'Presse à cuisses', reps: '12', lastWeek: '10 reps' },
      { id: 3, name: 'Leg extension', reps: '15', lastWeek: '15 reps' },
    ],
    JEUDI: [
      { id: 1, name: 'Développé militaire', reps: '10', lastWeek: '9 reps' },
      { id: 2, name: 'Élévations latérales', reps: '15', lastWeek: '15 reps' },
    ],
    VENDREDI: [
      { id: 1, name: 'Curl biceps barre', reps: '10', lastWeek: '10 reps' },
      { id: 2, name: 'Extension triceps poulie', reps: '12', lastWeek: '12 reps' },
    ],
    SAMEDI: [
      { id: 1, name: 'Cardio / HIIT', reps: '30 min', lastWeek: '25 min' },
    ],
    DIMANCHE: [
      { id: 1, name: 'Repos total', reps: '-', lastWeek: '-' },
    ]
  })

  const dayExercises = exercises[selectedDay] || []

  const handleRepChange = (id, newReps) => {
    setExercises(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map(ex => ex.id === id ? { ...ex, reps: newReps } : ex)
    }))
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full max-w-4xl mx-auto my-4">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-xl">★</span>
          <h2 className="text-xl font-bold text-gray-800 lowercase">{selectedDay}</h2>
        </div>
        <div className="flex space-x-12 text-xs font-bold text-gray-400 tracking-wider">
          <span>TODAY'S REPS</span>
          <span>LAST WEEK</span>
        </div>
      </div>

      <div className="space-y-4">
        {dayExercises.map((ex) => (
          <div key={ex.id} className="flex items-center justify-between py-3 px-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
            <span className="font-semibold text-gray-700">{ex.name}</span>
            <div className="flex items-center space-x-16">
              <input
                type="text"
                value={ex.reps}
                onChange={(e) => handleRepChange(ex.id, e.target.value)}
                className="w-20 text-center py-2 bg-white border border-gray-300 rounded-lg font-bold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9747FF]"
              />
              <span className="w-28 text-center text-sm font-semibold text-purple-600 bg-purple-100/60 py-1.5 px-3 rounded-lg">
                {ex.lastWeek}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeView
