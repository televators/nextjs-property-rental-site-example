'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import 'mapbox-gl/dist/mapbox-gl.css';
import Spinner from '@/components/Spinner';
import pin from '@/assets/images/pin.svg';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
        );

        // Did the API find coordinates for given address?
        if (res.results.length === 0) {
          setGeocodeError(true);
          setLoading(false);

          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        console.log(lat, lng);
        setLat(lat);
        setLong(lng);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching coordinates.', error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  // Did geocoding fail?
  if (geocodeError) {
    return <div className='text-xl'>No location data found.</div>;
  }
  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          latitude: lat,
          longitude: long,
          zoom: 15,
        }}
        style={{
          width: '100%',
          height: 500,
        }}
        mapStyle='mapbox://styles/mapbox/streets-v9'>
        <Marker latitude={lat} longitude={long} anchor='bottom'>
          <Image src={pin} alt='location' width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};
export default PropertyMap;
