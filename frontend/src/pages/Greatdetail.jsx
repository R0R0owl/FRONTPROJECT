import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GreatDetail = () => {
  const { personId } = useParams();
  const { eraId } = useParams();
  const [persons, setPersons] = useState([]);
  const [eventData, setEventData] = useState({}); // person.id ごとのデータを格納

  const url = `http://127.0.0.1:8000/api/event?great_id=${personId}`;

  // personIdに基づいてデータを取得
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(url);
        if (Array.isArray(response.data.post)) {
          setPersons(response.data.post);
        } else {
          setPersons([]);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
        setPersons([]);
      }
    })();
  }, [personId]);

  // persons のデータが変更されたときに、prompturl を呼び出す
  useEffect(() => {
    const fetchPromptData = async () => {
      const newEventData = {};
      for (const person of persons) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/prompt?prompt_id=${person.id}`);
          newEventData[person.id] = response.data; // person.id に基づいたデータを保存
        } catch (error) {
          console.log(`Error fetching data for person ${person.id}:`, error);
        }
      }
      setEventData(newEventData);
    };

    if (persons.length > 0) {
      fetchPromptData();
    }
  }, [persons]);

  return (
    <main>
      <section className="ijin-syousai">
        <div className="page-title">
          <div className="return">
            <Link to={`/greatdata/${eraId}`}>
              <img src="/src/assets/img/return.png" alt="偉人一覧画面に戻る" />
            </Link>
          </div>
          <h2 id="page-title">イベント一覧</h2>
        </div>

        {persons.length > 0 ? (
          <>
            {persons.map((person) => (
              <div key={person.id}>
                <div className="syousai-jouhou">
                  <div className="ijin-image">
                    <img src={person.imageUrl} alt={`${person.name}の画像`} />
                  </div>
                  <div className="ijin-description">
                    <p>{person.description}</p>
                  </div>
                </div>

                <div className="nenpyou-itiran">
                  <div className="nenpyou">
                    <div className="clear-mark">
                      {person.year === '1534年' ? '★' : ''}
                    </div>
                    <div className="event">
                      {person.year} {person.event}
                    </div>
                    <div className="nenpyou-yajirusi">
                      {/* Linkのstateプロパティで緯度経度を渡す */}
                      <Link
                        to={`/map/${person.id}/${person.id}`} // person.id を利用
                        state={{
                          lat: parseFloat(person.lat),
                          lng: parseFloat(person.lon),
                          promptData: eventData[person.id], // promptデータを渡す
                        }}
                      >
                        <p>マップ</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>データが存在しません。</p>
        )}
      </section>
    </main>
  );
};

export default GreatDetail;
