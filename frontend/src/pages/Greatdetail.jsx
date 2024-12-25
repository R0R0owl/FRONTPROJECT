import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { use } from 'react';

// 偉人詳細データ
const greatdetail = () => {
    const { eraId } = useParams();  // URLからeraIdとpersonIdを取得
    const [persons, setPersons] = useState([]);

    const url = `http://127.0.0.1:8000/api/events?great_id=${eraId}`;

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(url);
                setPersons(response.data.post);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        })();
    }), [eraId];


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

                {persons.length === 0 ? (
                    <p>この偉人情報はありません</p>
                ) : (
                    persons.map((person) => (
                        <div className="syousai-jouhou">
                            <div className="ijin-image">
                                <img src={person.imageUrl} alt={`${person.name}の画像`} />
                            </div>
                            <div className="ijin-description">
                                <p>{person.description}</p>
                            </div>
                        </div>
                    ))
                )}


                {persons.length === 0 ? (
                    <p>イベント情報はありません</p>
                ) : (
                    persons.map((person) => (
                        <div className="nenpyou-itiran">
                            <div className={`nenpyou${index + 1}`}>
                                <div className="clear-mark">{person.year === '1534年' ? '★' : ''}</div>
                                <div className="event">{person.year} {person.event}</div>
                                <div className="nenpyou-yajirusi">
                                    <Link to="/map" >
                                        <p>&gt;</p>
                                    </Link>
                                </div>
                            </div>
                     </div>
                    ))
                )}

            </section>
        </main>   
    );
};

export default greatdetail;