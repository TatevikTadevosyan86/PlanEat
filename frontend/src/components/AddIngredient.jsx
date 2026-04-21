function AddIngredient({ ingredientName, setIngredientName, onAddIngredient }) {
  return (
    <article className="rounded-3xl bg-white p-8 shadow-sm">
      <h3 className="text-2xl font-semibold text-[#1f5c4d]">
        Ingredient Name
      </h3>

      <form className="mt-4" onSubmit={onAddIngredient}>
        <input
          type="text"
          value={ingredientName}
          onChange={(event) => setIngredientName(event.target.value)}
          placeholder="Enter ingredient name"
          className="w-full rounded-2xl border border-[#d9e7dd] px-5 py-4 text-lg text-[#1f5c4d] outline-none placeholder:text-[#a0ada6]"
        />

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
