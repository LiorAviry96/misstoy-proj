/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { ToyPreview } from "./ToyPreview";
import { userService } from "../services/user.serivce";

export function ToyList({ toys, onRemoveToy }) {
    const loggedInUser = userService.getLoggedinUser(); // Get the logged-in user
    console.log('loggedInUser',loggedInUser)
    return (
        <ul className="toy-list">
            {toys?.map(toy => (
                <li key={toy.id}>
                    <ToyPreview toy={toy} />
                    {loggedInUser?.isAdmin && ( 
                    <section className="toy-actions">
                        <button onClick={() => onRemoveToy(toy.id)}>X</button>
                            <Link style={{ color: 'black' }} to={`/toy/edit/${toy.id}`}>
                                Edit
                            </Link>
                       
                    </section>
                     )}
                </li>
            ))}
        </ul>
    );
}

