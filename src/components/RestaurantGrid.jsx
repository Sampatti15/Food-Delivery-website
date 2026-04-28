import React from 'react'
import RestaurantCard from './RestaurantCard.jsx'

export default function RestaurantGrid({ restaurants, onOpenRestaurant }) {
  return (
    <div className="grid" role="list">
      {restaurants.map((r) => (
        <div role="listitem" key={r.id}>
          <RestaurantCard restaurant={r} onOpen={onOpenRestaurant} />
        </div>
      ))}
    </div>
  )
}

