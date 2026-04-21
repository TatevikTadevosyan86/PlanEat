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
