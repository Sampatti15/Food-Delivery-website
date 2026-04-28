import React from 'react'
import { IconBag, IconSearch } from './icons.jsx'

export default function Navbar({ query, onQueryChange, cartCount, onOpenCart }) {
  return (
    <header className="topbar">
      <div className="container">
        <div className="topbar__inner">
          <a className="brand" href="#" onClick={(e) => e.preventDefault()}>
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">
              <span className="brand__name">QuickBite</span>
              <span className="brand__tag">Fast food delivery</span>
            </span>
          </a>

          <div className="actions">
            <div className="pill" role="search">
              <IconSearch />
              <label className="srOnly" htmlFor="search">
                Search restaurants
              </label>
              <input
                id="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search restaurants, dishes…"
                autoComplete="off"
              />
            </div>

            <button className="btn" onClick={onOpenCart} type="button">
              <IconBag />
              Cart <span className="badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

