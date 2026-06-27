import React, { createContext, useContext, useEffect, useState } from 'react'
import { Howl, Howler } from 'howler'

const AudioContext = createContext()

export function AudioProvider({ children }) {
  const [bgMusic, setBgMusic] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Browsers require interaction before playing audio

  useEffect(() => {
    // Soft piano background music placeholder
    const music = new Howl({
      src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'], // Placeholder
      loop: true,
      volume: 0.3,
    })
    
    setBgMusic(music)

    return () => {
      music.unload()
    }
  }, [])

  const toggleMute = () => {
    if (bgMusic) {
      if (isMuted) {
        if (!isPlaying) {
          bgMusic.play()
          setIsPlaying(true)
        }
        Howler.mute(false)
        setIsMuted(false)
      } else {
        Howler.mute(true)
        setIsMuted(true)
      }
    }
  }

  // Trigger sound effect for fireworks
  const playFireworksSound = () => {
    const fx = new Howl({
      src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'], // Placeholder
      volume: 0.5,
    })
    if (!isMuted) fx.play()
  }

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playFireworksSound }}>
      {children}
      {/* Global Mute/Unmute Button */}
      <button 
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 bg-transparent/50 hover:bg-transparent/80 text-rose-950 p-3 rounded-full backdrop-blur-md border border-white/20 transition-colors"
      >
        {isMuted ? '🔇' : '🎵'}
      </button>
    </AudioContext.Provider>
  )
}

export const useAudio = () => useContext(AudioContext)
