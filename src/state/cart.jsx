import React, { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

function cartKey(restaurantId, itemId) {
  return `${restaurantId}::${itemId}`
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { restaurantId, item } = action
      const key = cartKey(restaurantId, item.id)
      const existing = state.items[key]
      const nextQty = (existing?.qty ?? 0) + 1
      return {
        ...state,
        restaurantId,
        items: {
          ...state.items,
          [key]: { restaurantId, item, qty: nextQty },
        },
      }
    }
    case 'DEC': {
      const { restaurantId, itemId } = action
      const key = cartKey(restaurantId, itemId)
      const existing = state.items[key]
      if (!existing) return state
      const nextQty = existing.qty - 1
      const nextItems = { ...state.items }
      if (nextQty <= 0) delete nextItems[key]
      else nextItems[key] = { ...existing, qty: nextQty }
      const stillHasAnything = Object.keys(nextItems).length > 0
      return {
        ...state,
        restaurantId: stillHasAnything ? state.restaurantId : null,
        items: nextItems,
      }
    }
    case 'CLEAR':
      return { restaurantId: null, items: {} }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { restaurantId: null, items: {} })

  const api = useMemo(() => {
    const lines = Object.values(state.items)
    const itemCount = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.qty * l.item.price, 0)
    const delivery = subtotal > 0 ? 39 : 0
    const platformFee = subtotal > 0 ? 9 : 0
    const total = subtotal + delivery + platformFee
    return {
      state,
      lines,
      itemCount,
      subtotal,
      delivery,
      platformFee,
      total,
      add: (restaurantId, item) => dispatch({ type: 'ADD', restaurantId, item }),
      dec: (restaurantId, itemId) => dispatch({ type: 'DEC', restaurantId, itemId }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

