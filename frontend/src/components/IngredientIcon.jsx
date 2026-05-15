import { 
  Egg, 
  Beef, 
  Carrot, 
  Milk, 
  Rice, 
  Wheat, 
  Apple, 
  Fish, 
  ChefHat,
  Utensils
} from 'lucide-react'

// Map ingredient names to icons and colors
const ingredientIconMap = {
  // Protein
  chicken: { icon: Beef, color: '#e8a87c', label: 'Chicken' },
  'ground beef': { icon: Beef, color: '#c78b6b', label: 'Ground Beef' },
  beef: { icon: Beef, color: '#c78b6b', label: 'Beef' },
  pork: { icon: Beef, color: '#e8a87c', label: 'Pork' },
  meat: { icon: Beef, color: '#c78b6b', label: 'Meat' },
  eggs: { icon: Egg, color: '#f5d742', label: 'Eggs' },
  fish: { icon: Fish, color: '#7eb09e', label: 'Fish' },
  
  // Vegetables
  tomato: { icon: Carrot, color: '#e85d4a', label: 'Tomato' },
  onion: { icon: Carrot, color: '#c9a87c', label: 'Onion' },
  carrot: { icon: Carrot, color: '#e8a87c', label: 'Carrot' },
  lettuce: { icon: Carrot, color: '#7eb09e', label: 'Lettuce' },
  potato: { icon: Carrot, color: '#d4a373', label: 'Potato' },
  garlic: { icon: Carrot, color: '#f0d8b0', label: 'Garlic' },
  vegetables: { icon: Carrot, color: '#7eb09e', label: 'Vegetables' },
  
  // Dairy
  cheese: { icon: Milk, color: '#f5e6c8', label: 'Cheese' },
  milk: { icon: Milk, color: '#f0e6d0', label: 'Milk' },
  cream: { icon: Milk, color: '#f5e6c8', label: 'Cream' },
  butter: { icon: Milk, color: '#f5e6c8', label: 'Butter' },
  
  // Grains
  rice: { icon: Rice, color: '#e8d8b0', label: 'Rice' },
  pasta: { icon: Wheat, color: '#f0d8a0', label: 'Pasta' },
  bread: { icon: Wheat, color: '#d4a373', label: 'Bread' },
  
  // Default
  default: { icon: Utensils, color: '#8ba095', label: 'Ingredient' }
}

function getIconForIngredient(ingredientName) {
  const lowerName = ingredientName?.toLowerCase() || ''
  
  // Try to match the ingredient name
  for (const [key, value] of Object.entries(ingredientIconMap)) {
    if (lowerName.includes(key)) {
      return value
    }
  }
  
  return ingredientIconMap.default
}

function IngredientIcon({ name, size = 20, className = '' }) {
  const { icon: Icon, color, label } = getIconForIngredient(name)
  
  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full p-1 ${className}`}
      style={{ backgroundColor: `${color}30` }}
      title={label}
    >
      <Icon size={size} color={color} />
    </div>
  )
}

export default IngredientIcon