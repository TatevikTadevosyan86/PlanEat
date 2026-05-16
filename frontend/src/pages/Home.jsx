import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import freshImage from '../assets/fresh.png'
import smartImage from '../assets/smart.png'

function Home({ planningMode, setPlanningMode }) {
  return (
    <>
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

   

              <div className="mt-8">
                <Link
                  to="/inventory"
                  className="inline-block rounded-2xl bg-[#1f5c4d] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#17473b]"
                >
                  Continue to Inventory
                </Link>
              
            </div>


        </>
  )
}

export default Home