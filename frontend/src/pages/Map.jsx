import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultLocation = {
  lat: 35.6895,
  lng: 139.6917,
};

const mapOptions = {
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const Map = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log('Location state:', location.state);

  const { lat, lng } = location.state || defaultLocation;

  // API送信ハンドラ
  const handleSubmit = async () => {
    const apiUrl = 'https://example.com/api/submit'; // APIのエンドポイント
    const payload = { lat, lng }; // 送信するデータ

    try {
      const response = await fetch(apiUrl, {
        method: 'POST', // HTTPメソッド
        headers: {
          'Content-Type': 'application/json', // JSON形式のデータを送信
        },
        body: JSON.stringify(payload), // データを文字列に変換
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('APIレスポンス:', data);
      alert('データが送信されました！');
    } catch (error) {
      console.error('API送信エラー:', error);
      alert('データ送信中にエラーが発生しました。');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <LoadScriptNext googleMapsApiKey="AIzaSyBuABm0tODhmt0flJwg8bi3_UAMSxmirWo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={15}
          options={mapOptions}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </LoadScriptNext>

      {/* 戻るボタン */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1,
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        イベント一覧
      </button>

      {/* Submitボタン */}
      <button
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28A745',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        イラストを取得！
      </button>
    </div>
  );
};

export default Map;
