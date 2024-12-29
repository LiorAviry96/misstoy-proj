/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { ToyPreview } from "./ToyPreview";


export function ToyList({ toys, onRemoveToy }) {
  //  console.log('toys',toys)
    return (
        <ul className="toy-list">
            {toys?.map(toy => (
                <li key={toy.id}>
                    <ToyPreview toy={toy} />
                    <section className="toy-actions">
                        <button onClick={() => onRemoveToy(toy.id)}>X</button>
                        <Link style={{ color: 'black' }} to={`/toy/edit/${toy.id}`}>Edit</Link>
                    </section>
                </li>
            ))}
        </ul>
    );
}

