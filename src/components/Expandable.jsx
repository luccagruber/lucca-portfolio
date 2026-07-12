import { useId, useState } from 'react'

// Layered expand/collapse used by the project cards.
// Collapsed height is 0 via the grid-rows trick, so no measuring needed
// and the transition stays smooth at any content size.
export function Expandable({ openLabel, closeLabel = 'Show less', children }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div>
      <div
        id={id}
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
        aria-hidden={!open}
        {...(!open && { inert: '' })}
      >
        <div className="overflow-hidden">{children}</div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group/toggle mt-5 inline-flex items-center gap-2 text-sm text-moss-bright hover:text-bone transition-colors"
      >
        <span
          aria-hidden
          className={`inline-block transition-transform duration-300 motion-reduce:transition-none ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
        {open ? closeLabel : openLabel}
      </button>
    </div>
  )
}
