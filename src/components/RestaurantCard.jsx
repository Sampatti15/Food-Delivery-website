import React from 'react'

function priceLevel(n) {
  return '₹'.repeat(Math.max(1, Math.min(4, n)))
}

export default function RestaurantCard({ restaurant, onOpen }) {
  const ratingClass =
    restaurant.rating >= 4.6 ? 'ratingBadge ratingBadge--great' : restaurant.rating >= 4.3 ? 'ratingBadge' : 'ratingBadge ratingBadge--ok'

  return (
    <article className="card" onClick={() => onOpen(restaurant)} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(restaurant)}
      aria-label={`Open menu for ${restaurant.name}`}
    >
      <div className="card__img" aria-hidden="true">
        {restaurant.image ? <img className="card__imgEl" src={restaurant.image} alt="" loading="lazy" /> : null}
      </div>
      <div className="card__body">
        <div className="card__titleRow">
          <div className="card__title">{restaurant.name}</div>
          <div className={ratingClass}>{restaurant.rating.toFixed(1)}★</div>
        </div>
        <div className="card__meta">
          {restaurant.etaMin} min • {priceLevel(restaurant.priceLevel)}
        </div>
        <div className="tagRow">
          {restaurant.tags.slice(0, 3).map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

