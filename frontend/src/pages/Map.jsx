import React, { useEffect, useState } from 'react';
import { data, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScriptNext, Marker, Circle, MarkerF, CircleF } from '@react-google-maps/api';
import axios from 'axios';


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

const circleOptions = {
  strokeColor: '#00FF00', // 枠線の色
  strokeOpacity: 0.5,     // 枠線の透明度
  strokeWeight: 2,        // 枠線の太さ
  fillColor: '#00FF00',   // 塗りつぶしの色
  fillOpacity: 0.2,      // 塗りつぶしの透明度
  clickable: false,       // 円をクリック不可にする
  draggable: false,       // 円をドラッグ不可にする
  editable: false,        // 円のサイズを編集不可にする
  visible: true,          // 円を表示する
};

const Map = () => {
  const { eventId } = useParams();
  const [ prompts, setPrompts ] = useState([]);
  const [ images, setImages ] = useState([]);
  const [ispopupOpen, setIsPopupOpen] = useState(false);
  const url = `http://127.0.0.1:8000/api/prompt?prompt_id=${eventId}`;
  const location = useLocation();
  const navigate = useNavigate();
  console.log('Location state:', location.state);

  const { lat, lng } = location.state || defaultLocation;

    //レンダリング時にデータ取得
    useEffect(() => {
      fetchPrompts();
    }, [eventId]);

  //urlからデータ取得
  const fetchPrompts = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrompts(data.post); // 必要に応じて適切なプロパティを確認
      console.log('プロンプト:', data);
    } catch (error) {
      console.error('データ取得エラー:', error);
      setPrompts([]); // エラー時に初期化
    }
  };
  
  const handleSubmit = async () => {
    if (!Array.isArray(prompts)) {
      console.error('prompts is not an array:', prompts);
      return;
    }
  
    const postUrl = 'http://www.jz.jec.ac.jp/createimg/sdapi/v1/txt2img';
  
    // prompts配列の最初の要素を使用してpayloadを構築
    const payload = {
      prompt: prompts[0]?.prompt || "Default prompt", // デフォルト値を設定
      steps: prompts[0]?.steps || 5, // デフォルトのステップ数
    };
  
    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // 単一オブジェクトを送信
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('APIレスポンス:', data);
      setImages(data.images || []);
      setIsPopupOpen(true);
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
        <MarkerF position={{ lat, lng }} />

        <CircleF
          center={{ lat, lng }}
          radius={300}                                                                                                                                                                                                                              
          options={circleOptions}
        />
        </GoogleMap>
      </LoadScriptNext>
{/* ポップアップ */}
{ispopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
          }}
        >
          <h3>生成された画像</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {/* imagesをマップして画像を表示 */}
            {images.map((image, index) => (
              <img
                key={index}
                src={`data:image/png;base64,${image}`} // Base64エンコードされた画像
                alt={`Generated ${index}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            ))}
          </div>
          <button
            onClick={() => setIsPopupOpen(false)}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#dc3545',
              color: '#FFF',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            閉じる
          </button>
        </div>
      )}

      {/* 背景オーバーレイ */}
      {ispopupOpen && (
        <div
          onClick={() => setIsPopupOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        ></div>
      )}

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