import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import down from '/src/assets/img/right.png';
import Return from '/src/assets/img/return.png';

const Greatdata = () => {
    const { eraId } = useParams(); // URLパラメータからeraIdを取得
    const [persons, setPersons] = useState([]);

    const url = `http://127.0.0.1:8000/api/greatmanaged?period_id=${eraId}`;

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(url);
                setPersons(response.data.post);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [eraId]); // eraIdが変更されたときに再実行
    console.log("Persons data:", persons);

    return (
        <body>
            <header>
                <div className="above-line"></div>
                <div className="above-doubleline"></div>
            </header>
        
            <main>
                <section className="person-data">
                    <div className="page-title">
                        <div className="return">
                            <Link to="/greatlist">
                                <img src={Return} alt="時代一覧画面に戻る" />
                            </Link>
                        </div>
                        <h2 id="page-title">いじん検索</h2>
                    </div>
                    {persons.length === 0 ? (
                        <p>この時代の偉人データはありません。</p>
                    ) : (
                        persons.map((person) => (
                            <div key={person.id} className="ijin-item">
                                <div className="ijin-name">
                                    <p>{person.name}</p>
                                </div>
                                <div className="ijin-arrow">
                                    <Link to={`/greatdetail/${eraId}/${person.id}`} className="next-link">
                                        <img src={down} className="down" alt="偉人詳細表示" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </main>

            <footer></footer>
        </body>
    );
};

export default Greatdata;
