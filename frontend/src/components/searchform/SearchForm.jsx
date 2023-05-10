
import "./searchform.css"
import React, { useState } from 'react';

// For all position variable, they are in type of latLng, which is in form of {lat:float, lng:float}
export default function SearchForm({startPos, setStartPos, endPos, setEndPos, setCurPosSet, setWayPoints}) {

    //const [formData, setFormData] = useState({start: "",end: "",max_dis: ""});
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [max_dis, setMax_dis] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(`The name you entered was: ${name}`)
        // );
    }
    const handleSearch = (event) => {
        event.preventDefault();
        // alert(`The name you entered was: ${name}`)
        // );
    }

    const onValueChange = (changeEvent) => {
      //this.setState({
        //selectedOption: changeEvent.target.value
      //});
    }

    const focusHandler = (event, id) => {
      event.preventDefault();
      if(id == 'start'){
        console.log("start input is focused");
        setCurPosSet(()=>setStartPos);
      } else if(id == "end"){
        console.log("end input is focused");
        setCurPosSet(()=>setEndPos);
      }
    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <br/><br/>
                <label className='title1'><h2>Plan my route:</h2></label>
                <div className='route'>
                    <form onSubmit={handleSearch}>
                        <input 
                          type="text" 
                          id="start" 
                          name="start" 
                          value={start} 
                          placeholder={"start: "+startPos.lat+","+startPos.lng}
                          onChange={(e) => setStart(e.target.value)} 
                          onFocus={(e)=>focusHandler(e, 'start')}
                        />
                        &nbsp;
                        <button className="s_button" type="submit">Search</button>
                    </form>
                    <br/>
                    <form onSubmit={handleSearch}>
                        <input 
                          type="text" 
                          id="end" 
                          name="end" 
                          value={end} 
                          placeholder={"end: "+endPos.lat+","+endPos.lng}
                          onChange={(e) => setEnd(e.target.value)}
                          onFocus={(e) => focusHandler(e, 'end')}
                        />
                        &nbsp;
                        <button className="s_button" type="submit">Search</button>
                    </form>
                </div>
                <br/><br/><br/>
                <label className='title1'><h2>Route Options:</h2></label>
                <label className='title2'><h3>•Elevation gain</h3></label>
                <br/>
                <div className="radio">
                      <input type="radio" name="radio" value="max" onChange={onValueChange} />  Maximum
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="radio" value="min" onChange={onValueChange} />  Minimum
                  </label>
                </div>
                <br/><br/>
                <label className='title2'><h3>•Route maximum distance:</h3></label>
                <input type="text" id="max_dis" name="max_dis" value={max_dis} placeholder="150%" onChange={(e) => setMax_dis(e.target.value)}/>
                <br/><br/><br/><br/>
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    )
}
