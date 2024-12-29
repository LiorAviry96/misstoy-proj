/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview">
            <Link to={`/toy/${toy.id}`}>
                <h2>{toy.name}</h2>
                <h4>Price: {toy.price}</h4>
                <h4>In Stock: {toy.inStock}</h4>
                <h4>Labels:</h4>
                <ul>
                    {toy.labels.map((lab, index) => (
                        <li key={index}>{lab}</li>
                    ))}
                </ul>
            </Link>
        </article>
    )
}


