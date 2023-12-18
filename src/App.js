import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map , {Marker,Popup} from 'react-map-gl';
import { useEffect,useState } from 'react';
import {logEnteries} from './API'
import LogForm from './LogForm'
import './index.css';
function App() {

  const [logEntries, setLogEntries]= useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation , setAddEntryLocation] = useState(null);


  function IconGoogleMaps(paint) {
    return (
      
        <svg
      className='marker'
        viewBox="0 0 24 24"
        fill="currentColor"
        height="3em"
        width="3em"
        color={paint}
      >
        <path d="M18.27 6c1.01 2.17.78 4.73-.33 6.81-.94 1.69-2.29 3.12-3.44 4.69-.5.7-1 1.45-1.37 2.26-.13.27-.22.55-.32.83-.1.28-.19.56-.28.84-.09.26-.2.57-.53.57-.39 0-.5-.44-.58-.74-.24-.73-.48-1.43-.85-2.1-.42-.79-.95-1.52-1.49-2.23L18.27 6M9.12 8.42l-3.3 3.92c.61 1.29 1.52 2.39 2.39 3.49.21.25.42.51.62.78L13 11.67l-.04.01c-1.46.5-3.08-.24-3.66-1.68-.08-.17-.14-.37-.18-.57a3.05 3.05 0 010-1v-.01m-2.54-3.8l-.01.01c-1.62 2.05-1.9 4.9-.93 7.31L9.63 7.2l-.05-.05-3-2.53m7.64-2.26L11 6.17l.04-.01c1.34-.46 2.84.12 3.52 1.34.15.28.27.58.31.88.06.38.08.65.01 1.02v.01l3.2-3.8a6.988 6.988 0 00-3.85-3.24l-.01-.01M9.89 6.89l3.91-4.65-.04-.01C13.18 2.08 12.59 2 12 2c-1.97 0-3.83.85-5.15 2.31l-.02.01 3.06 2.57z" />
      </svg>
    );
  }

  const getEntry = async() =>{
    const logEntry = await logEnteries();
    //console.log(logEntry);
    setLogEntries(logEntry);
  }

  useEffect(()=>{
    getEntry();
  },[]);

  const showAddMarkerPopup = (event)=>{
     
    const cordinate = event.lngLat;
    const latitude= cordinate.lat;
    const longitude = cordinate.lng
    
    setAddEntryLocation({
      latitude,
      longitude,
    })
  }

  return (
    <Map
      initialViewState={{
        longitude:  77.2673901,
        latitude: 30.1290485,
        zoom:12
      }}
      mapboxAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/luckky129/clq6axak6000v01qt82n88g3r"
      onDblClick={showAddMarkerPopup}
    >
    {
      logEntries.map( (entry)=>{  
        return <>
          <Marker 
            key={entry._id}
            longitude={entry.longitude} 
            latitude={entry.latitude} 
            anchor="bottom"
          >
            <div
              onClick={() =>{
                let tmp = entry._id;
                setShowPopup({
                  [tmp]:true,
                })
              }

            }
            >
              {IconGoogleMaps('#66FF00')}
            </div>
            
          </Marker>
          
          {
            
            showPopup[entry._id]===true ? (
            <div className="popup" >
            <Popup longitude={entry.longitude} latitude={entry.latitude}
            anchor="top" closeButton={true} closeOnClick={false}
            onClose={() => setShowPopup({})}
            dynamicPosition={true}
            >

            

              <h3 style={{ text: '12', value: '12pt' }}>{entry.title}</h3>
              <p>{entry.comments}</p>
              <small>Visited On : {new Date(entry.visitedDate).toLocaleDateString()}</small>
              {entry.image ? <img style={{width:'230px'}}src = {entry.image} alt={entry.title}/> : null}
            

            </Popup>
            </div>

          ) : null
          }
          
        </>          
          
        
      })
    }
    {

      addEntryLocation ? (
        <>
        <Marker 
            //key={addEntryLocation._id}
            longitude={addEntryLocation.longitude} 
            latitude={addEntryLocation.latitude} 
            anchor="bottom"
          >
            <div>
              {IconGoogleMaps('#FF033E')}
            </div>
            
          </Marker>
        <Popup longitude={addEntryLocation.longitude} latitude={addEntryLocation.latitude}
            anchor="top" closeButton={true} closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            dynamicPosition={true}
            >

            <div className="popup">
              <LogForm onClose={ ()=>{
                setAddEntryLocation(null);
                getEntry();
              }} location={addEntryLocation}/>
            </div>

            </Popup>
        </>
      ):null

    }
    
    </Map>
  )
}

export default App