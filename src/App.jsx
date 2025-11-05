import { useState } from 'react'
import './App.css'

function App() {
  const [journeyName, setJourneyName] = useState('Customer Journey')
  const [persona, setPersona] = useState('')

  // Journey stages with touchpoints
  const [stages, setStages] = useState([
    {
      id: 1,
      name: 'Awareness',
      icon: '👁️',
      color: 'bg-blue-500',
      touchpoints: [
        { id: 1, name: 'Social Media Ad', channel: 'Social', emotion: 'curious', description: 'First brand exposure' }
      ]
    },
    {
      id: 2,
      name: 'Consideration',
      icon: '🤔',
      color: 'bg-purple-500',
      touchpoints: [
        { id: 1, name: 'Website Visit', channel: 'Web', emotion: 'interested', description: 'Exploring products' }
      ]
    },
    {
      id: 3,
      name: 'Purchase',
      icon: '🛒',
      color: 'bg-green-500',
      touchpoints: [
        { id: 1, name: 'Checkout', channel: 'Web', emotion: 'confident', description: 'Complete purchase' }
      ]
    },
    {
      id: 4,
      name: 'Retention',
      icon: '🔁',
      color: 'bg-orange-500',
      touchpoints: [
        { id: 1, name: 'Welcome Email', channel: 'Email', emotion: 'satisfied', description: 'Onboarding experience' }
      ]
    },
    {
      id: 5,
      name: 'Advocacy',
      icon: '⭐',
      color: 'bg-pink-500',
      touchpoints: [
        { id: 1, name: 'Review Request', channel: 'Email', emotion: 'delighted', description: 'Share experience' }
      ]
    }
  ])

  const [selectedStage, setSelectedStage] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTouchpoint, setNewTouchpoint] = useState({
    name: '',
    channel: 'Email',
    emotion: 'neutral',
    description: ''
  })

  const channels = ['Email', 'SMS', 'Push', 'Web', 'Social', 'Phone', 'In-Store', 'Chat']
  const emotions = [
    { value: 'frustrated', label: '😤 Frustrated', color: 'text-red-500' },
    { value: 'confused', label: '😕 Confused', color: 'text-orange-500' },
    { value: 'neutral', label: '😐 Neutral', color: 'text-gray-500' },
    { value: 'curious', label: '🤨 Curious', color: 'text-blue-500' },
    { value: 'interested', label: '😊 Interested', color: 'text-purple-500' },
    { value: 'satisfied', label: '😌 Satisfied', color: 'text-green-500' },
    { value: 'confident', label: '😎 Confident', color: 'text-cyan-500' },
    { value: 'delighted', label: '🤩 Delighted', color: 'text-pink-500' }
  ]

  const getEmotionLabel = (value) => {
    return emotions.find(e => e.value === value)?.label || '😐 Neutral'
  }

  const getEmotionColor = (value) => {
    return emotions.find(e => e.value === value)?.color || 'text-gray-500'
  }

  const addTouchpoint = (stageId) => {
    setSelectedStage(stageId)
    setShowAddModal(true)
  }

  const saveTouchpoint = () => {
    if (!newTouchpoint.name.trim()) return

    setStages(stages.map(stage => {
      if (stage.id === selectedStage) {
        const newId = stage.touchpoints.length > 0
          ? Math.max(...stage.touchpoints.map(t => t.id)) + 1
          : 1
        return {
          ...stage,
          touchpoints: [...stage.touchpoints, { ...newTouchpoint, id: newId }]
        }
      }
      return stage
    }))

    setNewTouchpoint({ name: '', channel: 'Email', emotion: 'neutral', description: '' })
    setShowAddModal(false)
  }

  const deleteTouchpoint = (stageId, touchpointId) => {
    setStages(stages.map(stage => {
      if (stage.id === stageId) {
        return {
          ...stage,
          touchpoints: stage.touchpoints.filter(t => t.id !== touchpointId)
        }
      }
      return stage
    }))
  }

  const addCustomStage = () => {
    const newId = Math.max(...stages.map(s => s.id)) + 1
    const newStage = {
      id: newId,
      name: 'Custom Stage',
      icon: '📍',
      color: 'bg-indigo-500',
      touchpoints: []
    }
    setStages([...stages, newStage])
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Customer Journey Map Builder
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Visualize and optimize your customer journey across all touchpoints.
            Built for CRM and lifecycle marketing professionals.
          </p>

          {/* Journey Settings */}
          <div className="flex justify-center gap-4 mb-6">
            <input
              type="text"
              value={journeyName}
              onChange={(e) => setJourneyName(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="Journey Name"
            />
            <input
              type="text"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="Customer Persona"
            />
          </div>
        </div>

        {/* Journey Stages Timeline */}
        <div className="mb-8">
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center flex-shrink-0">
                {/* Stage Card */}
                <div className="relative">
                  <div className={`${stage.color} rounded-xl p-6 min-w-[280px] border-2 border-white/20 hover:border-white/40 transition-all`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{stage.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{stage.name}</h3>
                          <p className="text-sm text-white/80">{stage.touchpoints.length} touchpoints</p>
                        </div>
                      </div>
                    </div>

                    {/* Touchpoints */}
                    <div className="space-y-2 mb-4">
                      {stage.touchpoints.map(touchpoint => (
                        <div key={touchpoint.id} className="bg-black/20 rounded-lg p-3 group">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-white">{touchpoint.name}</span>
                                <span className={`text-lg ${getEmotionColor(touchpoint.emotion)}`}>
                                  {getEmotionLabel(touchpoint.emotion).split(' ')[0]}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-white/70">
                                <span className="px-2 py-0.5 bg-white/20 rounded">{touchpoint.channel}</span>
                                {touchpoint.description && (
                                  <span>{touchpoint.description}</span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteTouchpoint(stage.id, touchpoint.id)}
                              className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-red-400 transition-all ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Touchpoint Button */}
                    <button
                      onClick={() => addTouchpoint(stage.id)}
                      className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-all"
                    >
                      + Add Touchpoint
                    </button>
                  </div>
                </div>

                {/* Arrow */}
                {index < stages.length - 1 && (
                  <div className="flex items-center px-4 flex-shrink-0">
                    <div className="text-gray-400 text-2xl">→</div>
                  </div>
                )}
              </div>
            ))}

            {/* Add Custom Stage Button */}
            <div className="flex-shrink-0 ml-4">
              <button
                onClick={addCustomStage}
                className="px-6 py-8 bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-white/40 rounded-xl text-white transition-all"
              >
                <span className="text-3xl block mb-2">+</span>
                <span className="text-sm">Add Stage</span>
              </button>
            </div>
          </div>
        </div>

        {/* Journey Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Total Touchpoints</h3>
            <p className="text-4xl font-bold text-purple-400">
              {stages.reduce((sum, stage) => sum + stage.touchpoints.length, 0)}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Journey Stages</h3>
            <p className="text-4xl font-bold text-blue-400">{stages.length}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Channels Used</h3>
            <p className="text-4xl font-bold text-green-400">
              {new Set(stages.flatMap(s => s.touchpoints.map(t => t.channel))).size}
            </p>
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Channel Distribution</h3>
          <div className="flex flex-wrap gap-3">
            {channels.map(channel => {
              const count = stages.flatMap(s => s.touchpoints).filter(t => t.channel === channel).length
              if (count === 0) return null
              return (
                <div key={channel} className="px-4 py-2 bg-white/10 rounded-lg">
                  <span className="text-white font-medium">{channel}</span>
                  <span className="ml-2 text-purple-400">({count})</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Built by <a href="https://github.com/TheDuGuy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">Edou Mota</a>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            RevOps & Marketing Automation Specialist
          </p>
        </div>
      </div>

      {/* Add Touchpoint Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Add Touchpoint</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Touchpoint Name</label>
                <input
                  type="text"
                  value={newTouchpoint.name}
                  onChange={(e) => setNewTouchpoint({ ...newTouchpoint, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Welcome Email"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Channel</label>
                <select
                  value={newTouchpoint.channel}
                  onChange={(e) => setNewTouchpoint({ ...newTouchpoint, channel: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {channels.map(channel => (
                    <option key={channel} value={channel}>{channel}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Customer Emotion</label>
                <select
                  value={newTouchpoint.emotion}
                  onChange={(e) => setNewTouchpoint({ ...newTouchpoint, emotion: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {emotions.map(emotion => (
                    <option key={emotion.value} value={emotion.value}>{emotion.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Description (Optional)</label>
                <textarea
                  value={newTouchpoint.description}
                  onChange={(e) => setNewTouchpoint({ ...newTouchpoint, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                  rows="3"
                  placeholder="Brief description of this touchpoint"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setNewTouchpoint({ name: '', channel: 'Email', emotion: 'neutral', description: '' })
                }}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveTouchpoint}
                className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all"
              >
                Add Touchpoint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
