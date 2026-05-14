import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import freshImage from '../assets/fresh.png'
import smartImage from '../assets/smart.png'

function Home({ planningMode, setPlanningMode }) {
  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#1f5c4d]">
      <div className="flex min-h-screen flex-col">
        <header className="h-24 border-b border-[#dbe7de] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
  <img
    src={logo}
    alt="PlanEat logo"
    className="h-22 w-22 object-contain"
  />

  <span className="text-4xl font-semibold tracking-tight text-[#1f5c4d]">
    PlanEat
  </span>
</div>

            <nav className="hidden items-center gap-10 text-xl font-medium text-[#7c9488] md:flex">
              <Link
                to="/"
                className="rounded-xl bg-[#dcebe0] px-5 py-2 text-[#1f5c4d]"
              >
                Home
              </Link>

              <Link to="/inventory">Inventory</Link>

              <Link to="/meal-plan">Meal Plan</Link>

              <Link to="/shopping-list">Shopping List</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <section className="mb-10 text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
                Choose Your Cooking Mode
              </h1>

              <p className="mx-auto mt-4 max-w-3xl text-xl leading-8 text-[#8ba095]">
                Start by choosing how you want to cook this week, then continue
                to your inventory and build a meal plan around that style.
              </p>
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
              {/* SMART MODE */}
              <article
  onClick={() => setPlanningMode('smart')}
  className={`cursor-pointer rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
    planningMode === 'smart'
      ? 'border-2 border-[#2b6a58] bg-[#e3f0e7]'
      : 'bg-white'
  }`}
>
  <div className="flex items-center gap-4">
    <img
      src={smartImage}
      alt="Smart cooking"
      className="h-44 w-44 object-contain"
    />

    <div>
      <h2 className="text-3xl font-semibold text-[#1f5c4d]">
        Smart Mode
      </h2>

      <p className="mt-2 text-lg text-[#7f958a]">
        Cook once. Reuse ingredients for several days.
      </p>
    </div>
  </div>

  <p className="mt-6 text-lg leading-8 text-[#7f958a]">
    Batch cooking that reuses cooked ingredients across several meals.
    Save time, reduce food waste, and simplify your weekly cooking.
  </p>

  <ul className="mt-6 space-y-3 text-lg text-[#2e6d5b]">
    <li>✓ Save time cooking</li>
    <li>✓ Reduce food waste</li>
    <li>✓ Lower grocery costs</li>
    <li>✓ Batch cooking efficiency</li>
  </ul>
</article>
              {/* FRESH MODE */}
              <article
  onClick={() => setPlanningMode('fresh')}
  className={`cursor-pointer rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
    planningMode === 'fresh'
      ? 'border-2 border-[#2b6a58] bg-[#e3f0e7]'
      : 'bg-white'
  }`}
>
  <div className="flex items-center gap-4">
    <img
      src={freshImage}
      alt="Fresh meals"
      className="h-44 w-44 object-contain"
    />

    <div>
      <h2 className="text-3xl font-semibold text-[#1f5c4d]">
        Fresh Mode
      </h2>

      <p className="mt-2 text-lg text-[#7f958a]">
        New meals and more variety every day.
      </p>
    </div>
  </div>

  <p className="mt-6 text-lg leading-8 text-[#7f958a]">
    Generate diverse meals with fresh recipes every day.
    Perfect if you enjoy variety and discovering new dishes.
  </p>

  <ul className="mt-6 space-y-3 text-lg text-[#2e6d5b]">
    <li>✓ Daily variety</li>
    <li>✓ New flavors</li>
    <li>✓ Creative cooking</li>
    <li>✓ Fresh ingredients daily</li>
  </ul>
</article>
            </section>

            {/* CURRENT MODE CARD */}
            <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-xl text-[#1f5c4d]">
                Current mode:{' '}
                <span className="font-semibold">
                  {planningMode === 'smart'
                    ? 'Smart Mode'
                    : 'Fresh Mode'}
                </span>
              </p>

              <p className="mt-4 text-lg leading-8 text-[#7f958a]">
                Continue to your inventory to start adding ingredients. Your
                selected mode will guide the meal planning flow in the next
                steps.
              </p>

              <div className="mt-8">
                <Link
                  to="/inventory"
                  className="inline-block rounded-2xl bg-[#1f5c4d] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#17473b]"
                >
                  Continue to Inventory
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-16 border-t border-[#dbe7de] bg-white px-6 py-8">
          <div className="mx-auto grid max-w-6xl gap-6 text-center text-xl font-medium text-[#1f5c4d] md:grid-cols-3">
            <p>PlanEat</p>
            <p>Quick Links</p>
            <p>Support</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home