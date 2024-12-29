import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { saveToy } from "../store/toy/toy.actions";

export default function ToyEdit() {

    const [toy, setToy] = useState(toyService.createToy())

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) {
            loadToys()
        }
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        //console.log('field:', field)


        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break


            case 'checkbox':
                value = target.checked
                break


            default: break
        }

        setToy((toy) => ({ ...toy, [field]: value }))
    }

    async function loadToys() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (error) {
            console.log('error:', error)
        }
    }


    async function onSubmitToy(ev) {
        ev.preventDefault()
        try {
            await saveToy(toy)
            navigate('/toy')
        } catch (err) {
            console.log('err:', err)
        }

    }

    const { name, inStock, price } = toy

    return (
        <section className="toy-edit">
            <Link to="/toy"><button className="close-btn">X</button></Link>
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSubmitToy}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={price} type="number" id="price" name="price" />

                <label htmlFor="inStock">In Stock</label>
                <select onChange={handleChange} value={inStock} id="inStock" name="inStock"  >
                    <option disabled value="">Choose</option>
                    <option value="inStock">TRUE</option>
                    <option value="outStock">FALSE</option>
                    
                </select>
              
                <section className="btns">
                    <button className="btn">Save</button>
                </section>
            </form>
        </section>
    )
}
