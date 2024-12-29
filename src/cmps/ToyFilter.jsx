/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"


export function ToyFilter({ filterBy, onSetFilterBy }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log('field:', field)


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


        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { price, name } = filterByToEdit
    return (
        <form className="robot-filter">
            <section>
                <label htmlFor="name">Name</label>
                <input value={name} name="name" id="name" onChange={handleChange} />
            </section>
            <section>
                <label htmlFor="price">Price</label>
                <input value={price} onChange={handleChange} name="price" id="price" />
            </section>
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}   