    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    const SortDropdown = ({ setBooks }) => {
    const [selectedOption, setSelectedOption] = useState('oldest');
    
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
            const res = await axios.get("http://localhost:8000/books")
            setBooks(res.data)
            
            } catch (error) {
                
            }
        }
        fetchAllBooks()
        console.log("fired")
        
    }, [])

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(selectedOption)
        if(value == "priceLowToHigh"){
            fetchAscending()

        }
        else if(value == "priceHighToLow"){
            fetchDescending()

        } else if( value == "oldest"){
            fetchAllBooks()
        }
    };

    const fetchAscending = async () => {
        try {
        const res = await axios.get("http://localhost:8000/booksascending")
        setBooks(res.data)
        console.log(res.data)
        
            } catch (error) {
            console.log(error)
            }
        }
        const fetchDescending = async () => {
            try {
            const res = await axios.get("http://localhost:8000/booksdescending")
            setBooks(res.data)
            
                } catch (error) {
                console.log(error)
                }
            }
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books")
                setBooks(res.data)
            
            } catch (error) {
                console.log(error)   
            }
        }

    return (
        <div>
        <select className='sortbox' id="sort" value={selectedOption} onChange={handleOptionChange}>
            <option value="oldest"> Oldest </option>
            <option value="priceLowToHigh">Price (Low to High)</option>
            <option value="priceHighToLow">Price (High to Low)</option>
        </select>
        </div>
    );
    };

    export default SortDropdown;
