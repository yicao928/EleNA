import React, { useState } from 'react'
import L from 'leaflet';
import './searchbar.css'

const results = [
    {
        name: "Hospital",
        latitude: 42.3742,
        longitude: -72.5181
    },
    {
        name: "Restaurant",
        latitude: 42.3761,
        longitude: -72.5183
    },
    {
        name: "Barbor",
        latitude: 42.3754,
        longitude: -72.5179
    },
]

export default function SearchBar({id, position, setCurPosSet, posSetFunc}) {

    const [keyword, setKeyword] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const onSearch = (keyword) => {
        
        //alert("search: "+ keyword);
        // api for search location
        setSearchResults(results)
    }
    
    const changeHandler = (event) => {
        setKeyword(event.target.value);
        console.log(keyword);
        // search the position with keyword
    }

    const focusHandler = () => {
        setCurPosSet(()=>posSetFunc)
    }

    const drowdownRowClickHandler = (item) => {
        posSetFunc({lat:item.latitude, lng:item.longitude})
        setKeyword(item.name)
        setSearchResults([])
    }

    return (
        <div className='searchbarContainer'>
            <div className="search-inner">
                <input 
                    type="text" 
                    id={id}
                    name={id}
                    value={keyword}
                    placeholder={id+":"+position.lat+","+position.lng}
                    onChange={changeHandler} 
                    onFocus={focusHandler}
                />
                &nbsp;
                <button className="s_button" type="submit" onClick={()=>onSearch(keyword)}>Search</button>
            </div>
            { searchResults.length > 0 &&
                <div className="dropdown">
                    {searchResults.map((item) => (
                        <div 
                            key={item.name}
                            onClick={() => drowdownRowClickHandler(item)} 
                            className="dropdown-row">{item.name}
                        </div>
                        ))}
                </div>
            }
            
        </div>
  )
}
