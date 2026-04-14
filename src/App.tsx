import { useEffect, useState } from 'react'
import axios from 'axios'

type Recipe = {
    id: string
    dishName: string
    cuisineType: string
    servings: number
    rating: number
    featured: boolean
    available: boolean
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
            <h1>Recipes</h1>
            <table border={1}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>dishname</th>
                    <th>Cuisinetype</th>
                    <th>servings</th>
                    <th>rating</th>
                    <th>featured</th>
                    <th>available</th>
                </tr>
                </thead>
                <tbody>
                {recipes.map(recipe => (
                    <tr key={recipe.id}>
                        <td>{recipe.id}</td>
                        <td>{recipe.dishName}</td>
                        <td>{recipe.cuisineType}</td>
                        <td>{recipe.servings}</td>
                        <td>{recipe.rating}</td>
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