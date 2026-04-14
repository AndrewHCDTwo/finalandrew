import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

type Recipe = {
    id: string
    dishName: string
    cuisineType: string
    servings: number
    rating: number
    featured: boolean
    available: boolean
}

function getRating(rating: number): string {
    if (rating >= 70) return 'rating-high'
    if (rating >= 50) return 'rating-mid'
    return 'rating-low'
}

function App() {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        axios.get<Recipe[]>('https://api.npoint.io/6c48278e70bb1329ec40')
            .then(res => {
                setRecipes(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <div>
            <h1>Food Options</h1>
            <table border={1}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Dish Name</th>
                    <th>Cuisine Type</th>
                    <th>Servings</th>
                    <th>Rating</th>
                    <th>Featured</th>
                    <th>Available?</th>
                </tr>
                </thead>
                <tbody>
                {recipes.map(recipe => (
                    <tr key={recipe.id}>
                        <td>{recipe.id}</td>
                        <td>{recipe.dishName}</td>
                        <td>{recipe.cuisineType}</td>
                        <td>{recipe.servings}</td>
                        <td className={getRating(recipe.rating)}>{recipe.rating}</td>
                        <td>{recipe.featured ? 'Yes' : 'No'}</td>
                        <td>{recipe.available ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default App