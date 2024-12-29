import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { toyService } from "../services/toy.service"

export default function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadToy()
    }, [params.toyId])

    async function loadToy() {
        const toy = await toyService.getById(params.toyId)
        setToy(toy)
    }

    console.log('render')
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h3>Name : {toy.name}</h3>
            <h3>Price : {toy.price}</h3>
            <h3>In stock : {toy.inStock}</h3>
            <Link to="/toy">Back</Link>
            <Link to="/toy/r4">Next Toy</Link>
        </section>
    )
}