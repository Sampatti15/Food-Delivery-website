import React, { useEffect } from 'react'
import { IconClose } from './icons.jsx'

export default function Drawer({ open, title, subtitle, children, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="drawerBackdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer__head">
          <div className="drawer__title">
            <strong>{title}</strong>
            {subtitle ? <span>{subtitle}</span> : null}
          </div>
          <button className="btn" type="button" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="drawer__content">{children}</div>
      </aside>
    </div>
  )
}

