import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import titleImg from '../assets/img/title.png';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const ERROR_MESSAGES = {
        invalidEmail: '有効なメールアドレスを入力してください',
        invalidCredentials: 'メールアドレスかパスワードが違います',
    };

    const navigate = useNavigate();  // react-router-domのuseNavigateフックを使用

    // ログインフォームの送信処理
    const handleSubmit = async (e) => {
        e.preventDefault();  // ページのリロードを防止
        
        // メールアドレスの簡易バリデーション
        if (!email.includes('@')) {
            setErrorMessage(ERROR_MESSAGES.invalidEmail);
            return;
        }

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', { email, password });

            // レスポンスからトークンを取得し、ローカルストレージに保存
            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token);  // トークンをローカルストレージに保存
            }

            setErrorMessage('');  // エラーをリセット
            navigate('/main');  // ログイン成功で '/main' に遷移
        } catch (error) {
            setErrorMessage(ERROR_MESSAGES.invalidCredentials);  // 認証失敗エラー
        }
    };

    return (
        <main>
            <div className="new-title-section">
                <div className="title-background">
                    <div className="title-box">
                        <div className="title">
                            <img src={titleImg} id="title" alt="title" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="mail-address">メールアドレス</label><br />
                        <input
                            type="email"
                            id="mail-address"
                            name="mail-address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">パスワード</label><br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    )}

                    <div className="login">
                        <button id="login" type="submit">ログイン</button>
                    </div>
                </form>
            </div>

            <div className="sinki-container">
                <button
                    id="sinki"
                    type="button"
                    onClick={() => navigate('/register')}  // 新規登録ページへ遷移
                >
                    新規登録
                </button>
            </div>
        </main>
    );
}

export default Login;
