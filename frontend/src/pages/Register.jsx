import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import returnImg from '../assets/img/return.png';

function Register() {

    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        passwordconfirm: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const registerSubmit = (e) => {
        e.preventDefault();
    
        // 入力内容のバリデーション
        const errors = validateForm({
            username: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            confirmPassword: registerInput.passwordconfirm,
        });
    
        // エラーがある場合、エラーメッセージをセット
        if (Object.keys(errors).length > 0) {
            setRegister({ ...registerInput, error_list: errors });
            return; // エラーがあるため処理を中断
        }
    
        // バリデーションを通過した場合、APIリクエストを実行
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            passwordconfirm: registerInput.passwordconfirm,
        };
    
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("/api/register", data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate("/"); // ページ遷移
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });
    };
    


    // 個別フィールドのバリデーション
    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                return value ? '' : 'ユーザーネームは必須です。';
            case 'email':
                return /\S+@\S+\.\S+/.test(value) ? '' : '有効なメールアドレスを入力してください。';
            case 'password':
                return value.length >= 6 ? '' : 'パスワードは6文字以上で入力してください。';
            case 'confirmPassword':
                return value === formData.password ? '' : 'パスワードが一致しません。';
            default:
                return '';
        }
    };

    // // フォームの送信処理
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newErrors = validateForm(formData);
    //     setErrors(newErrors);

    //     // バリデーションエラーがなければ登録処理を実行
    //     if (Object.keys(newErrors).length === 0) {
    //         console.log('フォームが送信されました:', formData);

    //         // 登録処理後、ログインページにリダイレクト
    //         navigate('/login');

    //         // ここでAPI呼び出しなどを行う
    //     }
    // };

    // バリデーション関数
    const validateForm = (data) => {
        const errors = {};

        if (!data.username) {
            errors.username = 'ユーザーネームは必須です。';
        }

        if (!data.email) {
            errors.email = 'メールアドレスは必須です。';
        }
        else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = '有効なメールアドレスを入力してください。';
        }

        if (!data.password) {
            errors.password = 'パスワードは必須です。';
        }
        else if (data.password.length < 6) {
            errors.password = 'パスワードは6文字以上で入力してください。';
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'パスワードが一致しません。';
        }

        return errors;
    };

    return (
        <main>
            <section className="sinkitouroku">
                <div className="page-title">
                    <div className="return">
                        <Link to="/login">
                            <img src="src/assets/img/return.png" alt="return" />
                        </Link>
                    </div>
                    <h2 id="page-title">新規登録</h2>
                </div>

                <div id="tourokujouhou">
                    <form onSubmit={registerSubmit}>  {/* フォームタグを追加し、onSubmitで送信 */}
                        <div className="tourokujouhou">
                            <label>ユーザネーム</label><br />
                            <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" /><br />
                            <span>{registerInput.error_list.name}</span>
                        
                        </div>
                        <div className="tourokujouhou">
                            <label>メールアドレス</label><br />
                            <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" /><br />
                            <span>{registerInput.error_list.email}</span>
                        </div>
                        <div className="tourokujouhou">
                            <label>パスワード</label><br />
                            <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" /><br />
                            <span>{registerInput.error_list.password}</span>
                        </div>
                        <div className="tourokujouhou">
                            <label>パスワード(確認)</label><br />
                            <input type="password" name="passwordconfirm" onChange={handleInput} value={registerInput.passwordconfirm} className="form-control" /><br />
                            <span>{registerInput.error_list.password}</span>
                        </div>

                        <div className="touroku">
                            <button type="submit" id="touroku">新規作成</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Register;