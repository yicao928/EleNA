
import "./searchform.css"
import React, { useState } from 'react';

export default function SearchForm() {

    //const [formData, setFormData] = useState({start: "",end: "",max_dis: ""});
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [max_dis, setMax_dis] = useState("");

    const handleSubmit = (event) => {
        //event.preventDefault();
        // alert(`Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`
        // );
    };

    const onValueChange = (changeEvent) => {
      //this.setState({
        //selectedOption: changeEvent.target.value
      //});
    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <br/><br/>
                <label className='title1'><h2>Plan my route:</h2></label>
                <div className='route'>
                    <input type="text" id="start" name="start" value={start} placeholder="Start from..." onChange={(e) => setStart(e.target.value)} />
                    <br/>
                    <input type="text" id="end" name="end" value={end} placeholder="To..." onChange={(e) => setEnd(e.target.value)}/>
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
