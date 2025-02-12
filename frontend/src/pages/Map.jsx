import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScriptNext, Marker, Circle } from '@react-google-maps/api';

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
  strokeColor: '#00FF00',
  strokeOpacity: 0.5,
  strokeWeight: 2,
  fillColor: '#00FF00',
  fillOpacity: 0.2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const Map = () => {
  const { eventId } = useParams();
  const [prompts, setPrompts] = useState([]);
  const [imageSrc, setImageSrc] = useState(null); // 画像URLを保存
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態
  const url = `http://127.0.0.1:8000/api/prompt?id=${eventId}`;
  const location = useLocation();
  const navigate = useNavigate();
  console.log('Location state:', location.state);

  const { lat, lng } = location.state || defaultLocation;

  //urlからデータ取得
  const fetchPrompts = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrompts(data);
      console.log(data);
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  };

  //レンダリング時にデータ取得
  useEffect(() => {
    fetchPrompts();
  }, [url]);

  // API送信ハンドラ
  const handleSubmit = async () => {
    const postUrl = 'http://10.42.112.8:32766/sdapi/v1/txt2img';
    
    console.log("送信するデータ:", prompts);
    
    // `prompts.post` が配列かどうかチェック
    if (!prompts || !Array.isArray(prompts.post)) {
      console.error("Error: prompts.post is not an array", prompts);
      alert("データの形式が正しくありません。");
      return;
    }
  
    // 正しい形でデータをマッピング
    const payload = prompts.post.map((post) => ({
      prompt: post.prompt,
      negative_prompt: post.negative_prompt,
    }));
  
    console.log("送信するペイロード:", payload);
  
    try {
      const response = await fetch(postUrl, {
        method: 'POST', // HTTPメソッド
        headers: {
          'Content-Type': 'application/json', // JSON形式のデータを送信
        },
        body: JSON.stringify(payload[(0)]), // データを文字列に変換
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('APIレスポンス:', data);

      // 画像が返ってきた場合、Base64データをデコードして表示
      if (data.images && data.images.length > 0) {
        const base64Image = data.images[0];
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setImageSrc(imageUrl); // 画像URLを保存
        setIsModalOpen(true); // モーダルを開く
      }

      alert('データが送信されました！');
    } catch (error) {
      console.error('API送信エラー:', error);
      alert('データ送信中にエラーが発生しました。');
    }
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setIsModalOpen(false);
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
          {/* ピン */}
          <Marker position={{ lat, lng }} />

          {/* 円を描画 */}
          <Circle
            center={{ lat, lng }}
            radius={300} // 半径（メートル単位）
            options={circleOptions}
          />
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

      {/* ポップアップ モーダル */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '90%',
              maxHeight: '80%',
              overflowY: 'auto',
            }}
          >
            <h3>生成された画像</h3>
            <img
              src={imageSrc}
              alt="生成された画像"
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
            />
            <button
              onClick={closeModal}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#FF5733',
                color: '#FFF',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
