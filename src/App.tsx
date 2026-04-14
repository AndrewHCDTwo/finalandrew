import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

// Andrew final practical 2026-04-14

// changed from recipes to dishes becuase orignally i thought it was a recipes api but i realzied it looked more ike a menu as it has ratings and availbility
type dishes = {
    id: string
    dishName: string
    cuisineType: string
    servings: number
    rating: number
    featured: boolean
    available: boolean
}

// get rating fucntion to chang the colour of the rating text colour stored in app.css, bases it between value above 70 as high, 70-50 mid, and below is low
// high = green
//mid = yelwo
// low = red
function getRating(rating: number): string {
    if (rating >= 70) return 'rating-high'
    if (rating >= 50) return 'rating-mid'
    return 'rating-low'
}

function App() {
    const [dishes, setdishess] = useState<dishes[]>([])

    useEffect(() => {
        axios.get<dishes[]>('https://api.npoint.io/6c48278e70bb1329ec40')
            .then(res => {
                setdishess(res.data)
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
                {dishes.map(dishes => (
                    <tr key={dishes.id}>
                        <td>{dishes.id}</td>
                        <td>{dishes.dishName}</td>
                        <td>{dishes.cuisineType}</td>
                        <td>{dishes.servings}</td>
                        <td className={getRating(dishes.rating)}>{dishes.rating}</td>
                        <td>{dishes.featured ? 'Yes' : 'No'}</td>
                        <td>{dishes.available ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default App