import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Nav from '../navbar/Nav';
import markers from '../../utils/markers';


export default function Map() {

  const [location, setLocation] = React.useState(markers[0]);

  const [input, setInput] = React.useState();
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearch = (event) => {
    setInput(event.target.value);
    const mappings = markers.filter(item => item.city.toLowerCase().includes(event.target.value));
    setSearchResults(mappings);

    console.log(mappings);
  };


  const selectLocation = id => {
    const newPos = markers.find(m => m.id === id);
    setLocation(newPos);
  }

  return (
    <main className='h-screen w-screen'>
      <Nav value={input} onValueChange={handleSearch} onButtonClick={selectLocation} />
      <div className='mt-10 absolute z-100 bg-white w-[200px] h-[200px] rounded-lg'>
        {
          searchResults && searchResults.map(item => {
            <button onClick={() => onButtonClicked(item.id)} key={item.id}>{item.city}</button>
          })
        }
      </div>



      {
        location ? (
          <MapContainer center={location.coords} zoom={8} className='h-full' >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
              searchResults.length > 0 ? (
                searchResults.map(item => (
                  <Marker key={item.id} position={item.coords}>
                    <Popup>
                      <p className='font-bold text-gray-600'>{item.content}</p>
                    </Popup>
                  </Marker>
                ))
              ) : (
                <Marker position={location.coords}>
                  <Popup>
                    <p className='font-bold text-gray-600'>{location.content}</p>
                  </Popup>
                </Marker>
              )
            }
          </MapContainer >
        ) : (
          <div className='h-screen w-screen flex items-center justify-center'>
            <h3 className='text-4xl font-bold text-gray-600 animate-pulse'>Loading...</h3>
          </div>
        )
      }
    </main >
  );
}
