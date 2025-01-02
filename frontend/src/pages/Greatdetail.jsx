import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GreatDetail = () => {
  const { personId } = useParams();
  const [persons, setPersons] = useState([]);

  const url = `http://127.0.0.1:8000/api/event?great_id=${personId}`;

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

  return (
    <main>
      <section className="ijin-syousai">
        <div className="page-title">
          <div className="return">
            <Link to={`/greatdata/${personId}`}>
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
                    <div className="lat">{person.lat}</div>
                    <div className="lon">{person.lon}</div>
                    <div className="nenpyou-yajirusi">
                      {/* Linkのstateプロパティで緯度経度を渡す */}
                      <Link
                        to={{
                          pathname: '/map',
                          state: {
                            lat: parseFloat(person.lat),
                            lng: parseFloat(person.lon),
                          }, // 緯度経度を渡す
                        }}
                      >
                        <p>&gt;</p>
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
