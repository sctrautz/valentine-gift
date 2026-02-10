import { type CSSProperties, useState } from 'react'
import './App.css'

const heartStyles: CSSProperties[] = Array.from({ length: 14 }, (_, index) => {
  const size = 18 + (index % 6) * 6
  const left = 4 + ((index * 7) % 92)
  const drift = (index % 2 === 0 ? -1 : 1) * (10 + (index % 4) * 8)

  return {
    '--size': `${size}px`,
    '--left': `${left}%`,
    '--delay': `${-index * 1.4}s`,
    '--duration': `${12 + (index % 5) * 2.2}s`,
    '--opacity': `${0.25 + (index % 4) * 0.15}`,
    '--drift': `${drift}px`,
  } as CSSProperties
})

function App() {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0, rotate: 0 })
  const [yesBurst, setYesBurst] = useState(0)
  const [yesAccepted, setYesAccepted] = useState(false)

  const dodgeNo = () => {
    const rangeX = Math.min(140, Math.max(70, window.innerWidth / 4))
    const rangeY = 60
    const nextX = Math.round((Math.random() * 2 - 1) * rangeX)
    const nextY = Math.round((Math.random() * 2 - 1) * rangeY)
    const nextRotate = Math.round((Math.random() * 2 - 1) * 12)

    setNoOffset({ x: nextX, y: nextY, rotate: nextRotate })
  }

  const celebrateYes = () => {
    setYesBurst((value) => value + 1)
    setYesAccepted(true)
  }

  return (
    <div className="page">
      <div className="background" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      <div className="floating-hearts" aria-hidden="true">
        {heartStyles.map((style, index) => (
          <span key={`heart-${index}`} className="heart heart-shape" style={style} />
        ))}
      </div>

      {yesBurst > 0 && <div key={`yes-glow-${yesBurst}`} className="yes-glow" aria-hidden="true" />}

      <main className="main">
        <div className="flower-stage" aria-hidden="true">
          <div className="flower-sway">
            <div className="stem" />
            <span className="leaf leaf-left" />
            <span className="leaf leaf-right" />
            <div className="bloom">
              <span className="petal" />
              <span className="petal" />
              <span className="petal" />
              <span className="petal" />
              <span className="petal" />
              <span className="petal" />
              <span className="flower-center" />
            </div>
          </div>
          <div className="pot" />
        </div>

        <h1 className="main-title">Will you be my Valentine, Ana?</h1>
        {yesAccepted && <p className="yes-message">It's a date!</p>}

        <div className="button-row">
          <div className="yes-wrap">
            {yesBurst > 0 && (
              <div key={`celebrate-${yesBurst}`} className="celebration" aria-hidden="true">
                {Array.from({ length: 12 }, (_, index) => {
                  const angle = (index / 12) * Math.PI * 2
                  const radius = 60 + (index % 4) * 12
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius
                  const size = 10 + (index % 4) * 3

                  return (
                    <span
                      key={`burst-${yesBurst}-${index}`}
                      className="burst-heart heart-shape"
                      style={
                        {
                          '--x': `${x}px`,
                          '--y': `${y}px`,
                          '--size': `${size}px`,
                          '--delay': `${index * 0.04}s`,
                        } as CSSProperties
                      }
                    />
                  )
                })}
                <span className="burst-ring" />
              </div>
            )}
            <button className="btn primary yes-button" type="button" onClick={celebrateYes}>
              Yes
            </button>
          </div>
          <button
            className="btn ghost no-button"
            type="button"
            onClick={dodgeNo}
            onPointerEnter={dodgeNo}
            style={{
              transform: `translate(${noOffset.x}px, ${noOffset.y}px) rotate(${noOffset.rotate}deg)`,
            }}
          >
            No
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
