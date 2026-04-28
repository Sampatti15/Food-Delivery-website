import React, { useMemo, useState } from 'react'
import Drawer from './Drawer.jsx'
import { useCart } from '../state/cart.jsx'

function formatLine(line) {
  const { item, qty } = line
  return `${item.name} × ${qty}`
}

export default function CartDrawer({ open, onClose, restaurantNameById }) {
  const cart = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [placed, setPlaced] = useState(false)

  const restaurantName = cart.state.restaurantId
    ? restaurantNameById?.(cart.state.restaurantId) ?? 'Your restaurant'
    : 'Your cart'

  const canPlace = cart.itemCount > 0 && name.trim() && phone.trim() && address.trim()

  const orderSummary = useMemo(() => {
    if (cart.itemCount === 0) return ''
    return cart.lines.map(formatLine).join(', ')
  }, [cart.itemCount, cart.lines])

  const placeOrder = () => {
    if (!canPlace) return
    setPlaced(true)
    window.setTimeout(() => {
      cart.clear()
      setPlaced(false)
      setName('')
      setPhone('')
      setAddress('')
      onClose?.()
    }, 900)
  }

  return (
    <Drawer open={open} title="Checkout" subtitle={restaurantName} onClose={onClose}>
      {cart.itemCount === 0 ? (
        <div style={{ color: 'var(--muted)' }}>Your cart is empty. Add something delicious.</div>
      ) : (
        <>
          <div className="menuList">
            {cart.lines.map((l) => (
              <div className="menuItem" key={`${l.restaurantId}::${l.item.id}`}>
                <div>
                  <div className="menuItem__name">{l.item.name}</div>
                  <div className="menuItem__desc">₹{l.item.price} each</div>
                </div>
                <div className="row" style={{ justifyContent: 'flex-end' }}>
                  <div className="qty" aria-label={`${l.item.name} quantity`}>
                    <button type="button" onClick={() => cart.dec(l.restaurantId, l.item.id)} aria-label="Decrease">
                      −
                    </button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => cart.add(l.restaurantId, l.item)} aria-label="Increase">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="summary" aria-label="Order summary">
            <div className="line">
              <span>Subtotal</span>
              <span>₹{cart.subtotal}</span>
            </div>
            <div className="line">
              <span>Delivery</span>
              <span>₹{cart.delivery}</span>
            </div>
            <div className="line">
              <span>Platform fee</span>
              <span>₹{cart.platformFee}</span>
            </div>
            <div className="line total">
              <span>Total</span>
              <span>₹{cart.total}</span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit phone" />
          </div>
          <div className="field">
            <label htmlFor="address">Delivery address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, street, landmark…"
            />
          </div>

          <div className="divider" />

          <div className="row">
            <button className="btn btn--danger" type="button" onClick={cart.clear}>
              Clear cart
            </button>
            <button className="btn btn--primary" type="button" onClick={placeOrder} disabled={!canPlace}>
              {placed ? 'Placing…' : 'Place order'}
            </button>
          </div>

          <div style={{ marginTop: 10, color: 'var(--muted)', fontSize: 12, lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--text)' }}>Demo order</strong>: {orderSummary}
          </div>
        </>
      )}
    </Drawer>
  )
}

