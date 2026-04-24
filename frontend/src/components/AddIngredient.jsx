function AddIngredient({
  ingredientName,
  setIngredientName,
  ingredientType,
  setIngredientType,
  onAddIngredient,
}) {
  return (
    <article className="rounded-3xl bg-white p-8 shadow-sm">
      <h3 className="text-2xl font-semibold text-[#1f5c4d]">Ingredient Name</h3>

      <form className="mt-4" onSubmit={onAddIngredient}>
        <input
          type="text"
          value={ingredientName}
          onChange={(event) => setIngredientName(event.target.value)}
          placeholder="Enter ingredient name"
          className="w-full rounded-2xl border border-[#d9e7dd] px-5 py-4 text-lg text-[#1f5c4d] outline-none placeholder:text-[#a0ada6]"
        />

        <div className="mt-6">
          <p className="mb-3 text-xl font-semibold text-[#1f5c4d]">Type</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIngredientType('fresh')}
              className={`rounded-2xl px-4 py-3 text-lg ${
                ingredientType === 'fresh'
                  ? 'border-2 border-[#2b6a58] bg-[#e3f0e7] font-medium text-[#1f5c4d]'
                  : 'border border-[#d9e7dd] text-[#1f5c4d]'
              }`}
            >
              Fresh
            </button>
            <button
              type="button"
              onClick={() => setIngredientType('leftover')}
              className={`rounded-2xl px-4 py-3 text-lg ${
                ingredientType === 'leftover'
                  ? 'border-2 border-[#2b6a58] bg-[#e3f0e7] font-medium text-[#1f5c4d]'
                  : 'border border-[#d9e7dd] text-[#1f5c4d]'
              }`}
            >
              Leftover
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-2xl bg-[#1f5c4d] px-6 py-4 text-xl font-semibold text-white"
        >
          Add Ingredient
        </button>
      </form>
    </article>
  )
}

export default AddIngredient
