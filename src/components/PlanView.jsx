import React from 'react'

const PlanView = ({ selectedDay }) => {
  const plans = {
    LUNDI: [
      { id: 1, title: 'lundi - Upper Body A', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' },
      { id: 2, title: 'lundi - Isolation', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' }
    ],
    MARDI: [
      { id: 1, title: 'mardi - Pull Session', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' }
    ],
    MERCREDI: [
      { id: 1, title: 'mercredi - Jambes', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' }
    ],
    JEUDI: [
      { id: 1, title: 'jeudi - Épaules / Bras', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' }
    ],
    VENDREDI: [
      { id: 1, title: 'vendredi - Upper Body B', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' }
    ],
    SAMEDI: [
      { id: 1, title: 'samedi - Cardio', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' }
    ],
    DIMANCHE: [
      { id: 1, title: 'dimanche - Repos', exercise: '{-input(exercice)}', inst: '{-input(instructions)}' }
    ]
  }

  const dayPlans = plans[selectedDay] || plans.LUNDI

  return (
    <div className="w-full max-w-4xl mx-auto my-4 space-y-4">
      {dayPlans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-red-500 text-xl">★</span>
              <h3 className="font-bold text-gray-800 lowercase text-sm">{plan.title}</h3>
            </div>
            <span className="text-xs font-semibold text-gray-400">instructions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 font-mono text-sm">
              {plan.exercise}
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 font-mono text-sm">
              {plan.inst}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlanView
