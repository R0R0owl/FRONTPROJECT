import React from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultLocation = {
  lat: 35.6895,
  lng: 139.6917,
};

const Map = () => {
    const location = useLocation();
    console.log("Location state:", location.state);  // stateを確認

    const { lat, lng } = location.state || defaultLocation; // 渡された緯度経度を取得

    return (
      <LoadScriptNext googleMapsApiKey="AIzaSyBuABm0tODhmt0flJwg8bi3_UAMSxmirWo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }} // 渡された緯度経度を使用
          zoom={15}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </LoadScriptNext>
    );
};



export default Map;