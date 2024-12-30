import { ToyList } from '../cmps/ToyList';
import { ToyFilter } from '../cmps/ToyFilter.jsx';

import { useSelector } from "react-redux";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { removeToy,loadToys,  setFilterBy } from '../store/toy/toy.actions.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useRef, useEffect } from 'react';
import { debounce, getExistingProperties } from '../services/util.service.js';
import { toyService } from '../services/toy.service.js';
import { useEffectUpdate } from '../CustomeHooks/useEffectUpdate.js';
export default function ToyIndex() {
    
    const [searchParams, setSearchParams] = useSearchParams()
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current
   
    useEffect(() => {
        setFilterBy(toyService.getFilterFromSearchParams(searchParams))
    }, [])

    
    useEffectUpdate(() => {
        loadToys()
        setSearchParams(getExistingProperties(filterBy))
    }, [filterBy])
    
    

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId);
            showSuccessMsg('Toy removed successfully!');
        } catch (err) {
            showErrorMsg(`Having issues removing toy (${toyId}): ${err.message}`);
        }
    }
    
    
    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }
    //console.log('index', toys)
    return (
        <section className="toy-index">
            <h1>Welcome! this is our toys</h1>
            <ToyFilter onSetFilterBy={onSetFilterByDebounce} filterBy={{}} />

            <Link className='add-toy' to='/toy/edit'>Add Toy</Link>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            <Outlet />
        </section>
    )
}