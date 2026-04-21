function Home() {
  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#1f5c4d]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
        <header>
          <header className="border-b border-[#dbe7de] bg-white">
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded bg-[#dcebe0]" />
      <span className="text-2xl font-medium text-[#1f5c4d]">PlanEat</span>
    </div>

    <nav className="hidden items-center gap-10 text-xl font-medium text-[#7c9488] md:flex">
      <a className="rounded-xl bg-[#dcebe0] px-5 py-2 text-[#1f5c4d]">Home</a>
      <a>Meal Plan</a>
      <a>Inventory</a>
      <a>Add</a>
      <a>Shopping List</a>
    </nav>
  </div>
</header>

        </header>

        <main className="flex-1 px-6 py-10">
  <div className="mx-auto max-w-6xl">
    <section className="mb-10">
  <h1 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
    Choose Your Cooking Mode
  </h1>
  <p className="mt-3 text-xl text-[#8ba095]">
    Select how you want to plan your meals
  </p>
</section>
<section className="grid gap-6 lg:grid-cols-2">
  <article className="rounded-3xl bg-white p-8 shadow-sm">
    <h2 className="text-3xl font-semibold text-[#1f5c4d]">Smart Mode</h2>
    <p className="mt-4 text-lg leading-8 text-[#7f958a]">
      Batch cooking that reuses the same cooked ingredients across several
      days. Save time and money by cooking once and eating multiple times.
    </p>

    <ul className="mt-6 space-y-3 text-lg text-[#2e6d5b]">
      <li>✓ Save time cooking</li>
      <li>✓ Reduce food waste</li>
      <li>✓ Lower grocery costs</li>
      <li>✓ Batch cooking efficiency</li>
    </ul>
  </article>

  <article className="rounded-3xl bg-white p-8 shadow-sm">
    <h2 className="text-3xl font-semibold text-[#1f5c4d]">Fresh Mode</h2>
    <p className="mt-4 text-lg leading-8 text-[#7f958a]">
      Generate variety in your meals with fresh, diverse recipes every day.
      Perfect for those who love trying new dishes.
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
  <button className="rounded-2xl bg-[#9db3a8] px-8 py-4 text-lg font-semibold text-white">
    Continue to Add Ingredients
  </button>
</div>
<section className="mt-16">
  <h2 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
    Add Ingredients
  </h2>
  <p className="mt-3 text-xl text-[#8ba095]">
    Build your inventory to generate meal plans
  </p>
</section>
<section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
  <article className="rounded-3xl bg-white p-8 shadow-sm">
    Left card
  </article>

  <article className="rounded-3xl bg-white p-8 shadow-sm">
    Right card
  </article>
</section>

  </div>
</main>


        <footer>
          Footer goes here
        </footer>
      </div>
    </div>
  )
}

export default Home
