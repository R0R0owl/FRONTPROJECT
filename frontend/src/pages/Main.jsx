import React from 'react';
import { Link } from 'react-router-dom';
import titleImg from '../assets/img/title_logo.png';

function MainMenu() {
  return (
    <div>
        <header>
            <div className="new-above-line">
                <img src="src/assets/img/title_logo.png" alt="title_logo" />
                <div className="user-menu">
                    <img src="src/assets/img/user.png" alt="user-icon" />
                    <div className="user-name">
                        <img src="src/assets/img/id-background.png" alt="id-background" />
                        <p>@oda_nobunaga</p>
                    </div>
                </div>
            </div>
            <div className="above-doubleline"></div>
        </header>

        <main>
            <div>
                <div className="main-menu-back">
                    <div className="balloon">
                        <Link to="/Greatlist" className='no-decoration'>
                            <div className="balloon-container">
                                <img src="src/assets/img/talkbox2.png" className='click-button' alt="偉人一覧" />
                                <p className='char'>いじん</p>
                            </div>
                        </Link>
                    </div>
                    <div className="balloon">
                        <Link to="/illustlist" className='no-decoration'>
                            <div className="balloon-container">
                                <img src="src/assets/img/talkbox1.png" className='click-button' alt="イラスト一覧" />
                                <p className='char'>いらすと</p>
                            </div>
                        </Link>
                    </div>
                    <div className='balloon'>
                        <Link to="/quiz" className='no-decoration'>
                            <div className="balloon-container">
                                <img src="src/assets/img/talkbox2.png" className='click-button' alt="クイズ" />
                                <p className='char'>くいず</p>
                            </div>
                        </Link>
                    </div>
                    <div className='balloon'>
                        <Link to="/ai" className='no-decoration'>
                            <div className="balloon-container">
                                <img src="src/assets/img/talkbox1.png" className='click-button' alt="AI変換" />
                                <p className='char'>AI</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>

        <footer id='old-footer'>
            <div className="bottom-doubleline"></div>
            <div className="bottom-line"></div>
        </footer>
    </div>
  );
}

// コンポーネント名を一致させる
export default MainMenu;
