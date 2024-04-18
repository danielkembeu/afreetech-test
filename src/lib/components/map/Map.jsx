import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import Nav from '../navbar/Nav';
import markers from '../../utils/markers';


export default function Map() {

  const [location, setLocation] = React.useState();


  const [input, setInput] = React.useState(markers[0]);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    setLocation(markers[0]);
    console.log(markers[0]);

  }, []);


  const handleSearch = () => {
    setSearchResults(() => {
      markers.filter(item => item.city.toLowerCase().includes(input.toLowerCase()));

      console.log;
    });
  };


  const selectLocation = id => {
    setLocation(markers.find(m => m.id === id));
  }

  return (
    <main className='h-screen w-screen'>
      <Nav value={input} onValueChange={setInput} onFormSubmit={handleSearch} onButtonClick={selectLocation} />
      <div className='my-10 z-100 bg-gray-100 rounded-lg'>
        {
          searchResults !== '' && searchResults.map(item => {
            <button onClick={() => onButtonClicked(item.id)} key={item.id}>{item.city}</button>
          })
        }
      </div>



      {
        location ? (
          <MapContainer center={location.coords} zoom={13} className='h-full' >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location.coords}>
              <Popup>
                <p className='font-bold text-gray-600'>Heyyy there friend ! 🖐🏾😅</p>
              </Popup>
            </Marker>
          </MapContainer >
        ) : (
          <div className='h-screen w-screen items-center justify-center'>
            <h3 className='text-4xl font-bold text-gray-600'>Waiting for the authorization...</h3>
          </div>
        )
      }
    </main >
  );
}
