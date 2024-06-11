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
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

  useEffect(() => {
    try {
      const fetchCoords = async () => {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
        );
        const { lat, lng } = res.results[0].geometry.location;
        console.log('Address Coordinates (lat, long):', lat, lng);
      };

      fetchCoords();
    } catch (error) {
      console.error('Failed to fetch coordinates from Geocode API: ', error);
    }
  }, []);

  return <h1>wuhh</h1>;
};
export default PropertyMap;
