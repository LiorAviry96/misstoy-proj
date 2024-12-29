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
       // console.log('field:', field)


        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break


            case 'checkbox':
                value = target.checked
                break

            case 'select-one':
                    if (field === 'inStock') {
                   value = value === "true"; // Convert string to boolean
              }
            break;
            case "select-multiple":
                  value = Array.from(target.selectedOptions).map(option => option.value);
                  break;
            default: break
        }


        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { price, name, inStock, labels = [] } = filterByToEdit
    return (
        <form className="toy-filter">
            <section>
                <label htmlFor="name">Name</label>
                <input value={name} name="name" id="name" onChange={handleChange} />
            </section>
            <section>
                <label htmlFor="price">Price</label>
                <input value={price} onChange={handleChange} name="price" id="price" />
            </section>

            <section>
            <label htmlFor="inStock">In Stock</label>
                <select onChange={handleChange} value={inStock} id="inStock" name="inStock">
                    <option disabled value="">Choose</option>
                    <option value={true}>TRUE</option>
                    <option value={false}>FALSE</option>
                </select>
            </section>

            <section>
                <label htmlFor="labels">Labels</label>
                <select
                    id="labels"
                    name="labels"
                    multiple
                    value={labels}
                    onChange={handleChange}
                >
                    <option value="Doll">Doll</option>
                    <option value="Battery Powered">Battery Powered</option>
                    <option value="Baby">Baby</option>
                    <option value="Art">Art</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Box game">Box game</option>
                </select>
            </section>
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}   