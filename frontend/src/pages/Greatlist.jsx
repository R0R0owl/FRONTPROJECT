import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { Link } from 'react-router-dom';
import rightIcon from '../assets/img/right.png';
import Return from '/src/assets/img/return.png';

function Period() {
    const [value, setValue] = useState([]);

    const url = "http://127.0.0.1:8000/api/periods";

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(url);
                setValue(res.data.post);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <>
            <header>
                <div className="above-line"></div>
                <div className="above-doubleline"></div>
            </header>

            <main>
                <section className="ijin-list">
                    <div className="page-title">
                        <div className="return">
                            <Link to="/main">
                                <img src={Return} alt="newtopに戻る" />
                            </Link>
                        </div>
                        <h2 id="page-title">いじん検索</h2>
                    </div>
                    {value.map((article) => (
                        <div key={article.id} className={`era-item era-${article.id}`}>
                            <div className='era-name'>
                                <p>{article.name}</p>
                            </div>
                            <div className='era-arrow'>
                                <Link to={`/greatdata/${article.id}`} className='next-link'>
                                    <img src={rightIcon} className="down" alt="偉人一覧表示" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <footer>
                <div className="bottom-doubleline"></div>
                <div className="bottom-line"></div>
            </footer>
        </>
    );
}

export default Period;