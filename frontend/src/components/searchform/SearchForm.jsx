import "./searchform.css"
import React, {useState} from 'react';
import SearchBar from '../searchbar/SearchBar.jsx'

// For all position variable, they are in type of latLng, which is in form of {lat:float, lng:float}
export default function SearchForm({startPos, setStartPos, endPos, setEndPos, setCurPosSet, setWayPoints}) {

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [max_dis, setMax_dis] = useState("");
    const [searchPath, setSearchPath] = useState([])
    const [max_min, setMax_min] = useState("");

    const result = {
        "path": [[42.3955212, -72.5325507], [42.3955582, -72.5323146], [42.395561, -72.5321806], [42.3955807, -72.5320746], [42.3955244, -72.5320576], [42.3954375, -72.5320335], [42.3952166, -72.5318956], [42.3947512, -72.5316178], [42.3948266, -72.531406], [42.3948165, -72.5313236], [42.3947927, -72.5312155], [42.3947642, -72.5311249], [42.3946944, -72.5310308], [42.3946075, -72.530959], [42.3945392, -72.5309306], [42.3944584, -72.5308926], [42.3944004, -72.5307954], [42.3943336, -72.5306859], [42.394118, -72.5305522], [42.3940882, -72.5305353], [42.3940428, -72.5303584], [42.3940167, -72.5302906], [42.3939955, -72.5302355], [42.3939385, -72.5301175], [42.3939079, -72.5300348], [42.3938701, -72.5297992], [42.3936949, -72.5296885], [42.3933087, -72.5294606], [42.3931644, -72.5293747], [42.3930888, -72.5293391], [42.3929623, -72.5292612], [42.3931137, -72.528797], [42.3930558, -72.5287661], [42.3929516, -72.5284315], [42.3929008, -72.528268], [42.3929289, -72.528175], [42.3927311, -72.5280512], [42.3927301, -72.5279832], [42.3927283, -72.527898], [42.392715, -72.5278032], [42.3927035, -72.5277372], [42.3926813, -72.5276472], [42.3926509, -72.5275383], [42.3926275, -72.5273571], [42.3926113, -72.5272416], [42.3925936, -72.5271456], [42.392559, -72.5270328], [42.392506, -72.5269087], [42.3924766, -72.5268953], [42.3924244, -72.5268203], [42.392333, -72.526743], [42.392129, -72.5265402], [42.3920249, -72.5264781], [42.3919378, -72.5264516], [42.3918881, -72.5264308], [42.3918309, -72.5264069], [42.391648, -72.52635], [42.3914827, -72.5262922], [42.3914378, -72.5262765], [42.3913459, -72.5265601], [42.3912175, -72.5264753], [42.3909841, -72.5263436], [42.3908966, -72.5263013], [42.3906973, -72.526222], [42.3906364, -72.526213], [42.390658, -72.526003], [42.390529, -72.5259609], [42.3897206, -72.5250242], [42.3891857, -72.5248068], [42.389172, -72.5248], [42.3890202, -72.5247324], [42.3889829, -72.5246558], [42.388649, -72.5244774], [42.3885049, -72.5244032], [42.388411, -72.524343], [42.3883334, -72.5242911], [42.3883299, -72.5242887], [42.388274, -72.524243], [42.388207, -72.524189], [42.38813, -72.524123], [42.3880804, -72.5240781], [42.388055, -72.524055], [42.387981, -72.523984], [42.38795, -72.523954], [42.387947, -72.52395], [42.387926, -72.52393], [42.387872, -72.523874], [42.38782, -72.523817], [42.387753, -72.523734], [42.387688, -72.523647], [42.387624, -72.523558], [42.387569, -72.523482], [42.387515, -72.523405], [42.38746, -72.523328], [42.387411, -72.523257], [42.387361, -72.523186], [42.387311, -72.523116], [42.38725, -72.523032], [42.387186, -72.522949], [42.387121, -72.522869], [42.387068, -72.522808], [42.3870409, -72.522779], [42.387013, -72.522749], [42.386957, -72.522691], [42.386922, -72.522654], [42.386886, -72.522616], [42.386849, -72.52258], [42.386827, -72.52256], [42.386805, -72.52254], [42.386783, -72.52252], [42.386759, -72.522484], [42.386734, -72.522447], [42.386708, -72.522416], [42.386667, -72.522387], [42.386621, -72.522366], [42.386575, -72.522351], [42.386537, -72.52234], [42.386498, -72.522333], [42.386459, -72.522329], [42.38641, -72.522327], [42.386361, -72.522329], [42.386313, -72.522334], [42.386261, -72.522342], [42.386211, -72.522354], [42.3860485, -72.5223951], [42.3859414, -72.5224402], [42.3859071, -72.5223492], [42.385878, -72.522286], [42.385843, -72.522221], [42.385805, -72.522159], [42.385773, -72.522109], [42.385738, -72.522062], [42.385701, -72.522019], [42.385654, -72.521979], [42.385603, -72.521945], [42.385552, -72.521913], [42.3854455, -72.5218793], [42.385282, -72.521778], [42.385145, -72.521717], [42.3850786, -72.5216833], [42.385, -72.521642], [42.384855, -72.521567], [42.38482, -72.5215486], [42.384711, -72.521491], [42.384507, -72.521376], [42.3844825, -72.5213619], [42.384304, -72.521259], [42.384101, -72.521143], [42.383972, -72.521073], [42.383843, -72.521003], [42.383714, -72.520933], [42.3836525, -72.5208993], [42.3836269, -72.5209688], [42.3833688, -72.520841], [42.3833287, -72.5208439], [42.383283, -72.5208223], [42.3832262, -72.5207953], [42.3829845, -72.5206624], [42.3825833, -72.5204237], [42.3825587, -72.5204059], [42.3822698, -72.5201974], [42.3822252, -72.5202815], [42.3821607, -72.5203484], [42.3821272, -72.52036], [42.3817786, -72.5203344], [42.3809558, -72.5202739], [42.380945, -72.520273], [42.3808753, -72.5202675], [42.380702, -72.5202538], [42.3804455, -72.5202334], [42.3802296, -72.5202163], [42.3801775, -72.5202122], [42.3801217, -72.5202069], [42.3798828, -72.5201863], [42.3795792, -72.5201696], [42.3793235, -72.520153], [42.3792692, -72.5201471], [42.3792053, -72.5201366], [42.3789183, -72.5200981], [42.3787475, -72.5200934], [42.3786583, -72.5200909], [42.3783947, -72.5200844], [42.3783612, -72.5200834], [42.3780754, -72.5200798], [42.378038, -72.520079], [42.3779978, -72.5200781], [42.3778346, -72.5200766], [42.3776127, -72.5200699], [42.3774914, -72.5200673], [42.3773703, -72.5200647], [42.3770541, -72.5200574]],
        "distance": 2606.7389999999978
    }
    const waypoints = []

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/api/find_customized_path?start_lat=' + startPos.lat + '&start_lon=' + startPos.lng + '&end_lat=' + endPos.lat + '&end_lon=' + endPos.lng + '&min_or_max=' + max_min + '&length_limit=' + max_dis)
            .then(response => response.json())
            .then(data => {
                setSearchPath(data["path"])
                data["path"].forEach(element => {
                    waypoints.push({lat: element[0], lng: element[1]})
                })
                setWayPoints(waypoints)
            })
            .then(setWayPoints(waypoints))
        .catch((err) => {
            console.log(err.message);
        })


        // setSearchPath(result["path"])
        // //console.log(searchPath)
        // searchPath.forEach(element => {
        //     waypoints.push({lat:element[0], lng:element[1]})
        // })
        // //console.log(waypoints)
        // setWayPoints(waypoints)
    }

    const onChangeValue = (event) => {
        console.log(event.target.value);
        setMax_min(event.target.value);
    }

    const focusHandler = (event, id) => {
        event.preventDefault();
        if (id === 'start') {
            console.log("start input is focused");
            setCurPosSet(() => setStartPos);
        } else if (id === "end") {
            console.log("end input is focused");
            setCurPosSet(() => setEndPos);
        }
    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <div className="positionContainer">
                    <label className='title1'><h2>Plan your route</h2></label>
                    <div className='route'>
                        <div className="searchbar">
                            <SearchBar id={"Start"} position={startPos} setCurPosSet={setCurPosSet} posSetFunc={setStartPos}/>
                        </div>
                        <div className="searchbar">
                            <SearchBar id={"End"} position={endPos} setCurPosSet={setCurPosSet} posSetFunc={setEndPos}/>
                        </div>
                    </div>
                </div>
                
                <div className="optionContainer">
                    <label className='title1'><h2>Route Options:</h2></label>
                    <div className="option">
                        <label className='title2'><h3>•Elevation gain</h3></label>
                        <div className="optionVariable">
                            <div className="radio">
                                <input type="radio" name="radio" value="max" onChange={onChangeValue}/> Maximum
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" name="radio" value="min" onChange={onChangeValue}/> Minimum
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="option">
                        <label className='title2'><h3>•Route maximum distance(%):</h3></label>
                        <div className="optionVariable">
                            <input type="text" id="max_dis" name="max_dis" value={max_dis} placeholder="150%"
                                onChange={(e) => setMax_dis(e.target.value)}/>
                        </div>
                    </div>
                </div>
                
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    )
}
