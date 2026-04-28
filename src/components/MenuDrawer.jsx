import React from 'react'
import Drawer from './Drawer.jsx'
import { useCart } from '../state/cart.jsx'

export default function MenuDrawer({ open, restaurant, onClose, onGoToCart }) {
  const cart = useCart()

  if (!restaurant) return null

  const add = (item) => cart.add(restaurant.id, item)
  const dec = (itemId) => cart.dec(restaurant.id, itemId)
  const qtyFor = (itemId) => {
    const key = `${restaurant.id}::${itemId}`
    const line = cart.state.items[key]
    return line?.qty ?? 0
  }

  return (
    <Drawer
      open={open}
      title={restaurant.name}
      subtitle={`${restaurant.etaMin} min • ${restaurant.rating.toFixed(1)}★`}
      onClose={onClose}
    >
      {restaurant.image ? (
        <div className="menuHero" aria-hidden="true">
          <img className="menuHero__img" src={restaurant.image} alt="" loading="lazy" />
        </div>
      ) : null}

      <div className="menuList">
        {restaurant.menu.map((it) => {
          const qty = qtyFor(it.id)
          return (
            <div className="menuItem" key={it.id}>
              <div>
                <div className="menuItem__name">{it.name}</div>
                <div className="menuItem__desc">{it.desc}</div>
                <div className="row" style={{ marginTop: 10 }}>
                  <div className="price">₹{it.price}</div>
                  {qty > 0 ? (
                    <div className="qty" aria-label={`${it.name} quantity`}>
                      <button type="button" onClick={() => dec(it.id)} aria-label="Decrease">
                        −
                      </button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => add(it)} aria-label="Increase">
                        +
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn--primary" type="button" onClick={() => add(it)}>
                      Add
                    </button>
                  )}
                </div>
              </div>
              <div className="tag">Popular</div>
            </div>
          )
        })}
      </div>

      <div className="divider" />

      <div className="row">
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          Items in cart: <strong style={{ color: 'var(--text)' }}>{cart.itemCount}</strong>
        </div>
        <button className="btn" type="button" onClick={onGoToCart}>
          View cart
        </button>
      </div>
    </Drawer>
  )
}

