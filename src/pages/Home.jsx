import React, { useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RestaurantGrid from '../components/RestaurantGrid.jsx'
import MenuDrawer from '../components/MenuDrawer.jsx'
import CartDrawer from '../components/CartDrawer.jsx'
import { CartProvider, useCart } from '../state/cart.jsx'
import { cuisineChips, restaurants as allRestaurants } from '../data/restaurants.js'

function HomeInner() {
  const cart = useCart()
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('all')
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const restaurants = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allRestaurants
      .filter((r) => (cuisine === 'all' ? true : r.cuisine === cuisine))
      .filter((r) => {
        if (!q) return true
        const inName = r.name.toLowerCase().includes(q)
        const inMenu = r.menu.some((m) => m.name.toLowerCase().includes(q))
        return inName || inMenu
      })
  }, [query, cuisine])

  const openRestaurant = (r) => {
    setSelected(r)
    setMenuOpen(true)
  }

  const restaurantNameById = (id) => allRestaurants.find((r) => r.id === id)?.name

  return (
    <>
      <Navbar
        query={query}
        onQueryChange={setQuery}
        cartCount={cart.itemCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero__grid">
              <div className="heroCard">
                <div className="heroCard__inner">
                  <div className="kicker">
                    <span className="tag">New</span>
                    <span>Hot meals, clean UI, fast checkout</span>
                  </div>
                  <h1 className="headline">Order your favourites in minutes.</h1>
                  <p className="sub">
                    Search restaurants, browse menus, add items to cart and place a demo order.
                  </p>

                  <div className="hero__row">
                    <button className="btn btn--primary" type="button" onClick={() => document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' })}>
                      Explore restaurants
                    </button>
                    <button className="btn" type="button" onClick={() => setCartOpen(true)}>
                      Open checkout
                    </button>
                  </div>

                  <div className="chips" aria-label="Cuisine filters">
                    {cuisineChips.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className="chip"
                        aria-pressed={cuisine === c.id}
                        onClick={() => setCuisine(c.id)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="heroCard">
                <div className="stats">
                  <div className="stat stat--lavender">
                    <div className="stat__n">25–35 min</div>
                    <div className="stat__l">Typical delivery window</div>
                  </div>
                  <div className="stat stat--peach">
                    <div className="stat__n">₹39</div>
                    <div className="stat__l">Flat demo delivery fee</div>
                  </div>
                  <div className="stat stat--mint">
                    <div className="stat__n">4.3–4.7★</div>
                    <div className="stat__l">Ratings on popular stores</div>
                  </div>
                  <div className="stat stat--sky">
                    <div className="stat__n">{cart.itemCount}</div>
                    <div className="stat__l">Items in your cart</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="popular">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Popular near you</h2>
                <p>
                  Showing <strong style={{ color: 'var(--text)' }}>{restaurants.length}</strong> results
                </p>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                Tip: search “paneer”, “fries”, “lava”…
              </div>
            </div>

            <RestaurantGrid restaurants={restaurants} onOpenRestaurant={openRestaurant} />
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="footer__row">
            </div>
          </div>
        </footer>
      </main>

      <MenuDrawer
        open={menuOpen}
        restaurant={selected}
        onClose={() => setMenuOpen(false)}
        onGoToCart={() => {
          setMenuOpen(false)
          setCartOpen(true)
        }}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        restaurantNameById={restaurantNameById}
      />
    </>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <HomeInner />
    </CartProvider>
  )
}
