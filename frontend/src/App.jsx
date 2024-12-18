import React, { useState } from 'react';
import axios from "axios";
import { useRoutes } from "react-router-dom";

//各ページのコンポーネントをインポート
import Login from "./pages/Login";
import Sample from "./pages/Sample";
import Main from "./pages/Main";
import Register from "./pages/Register";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


const App = () => {
  
  //useRouteでルート設定
  const routes = [
    { path: "/", element: <Sample /> },
    { path: "/login", element: <Login /> },
    { path: "/main", element: <Main /> },
    { path: "/register", element: <Register /> },


    //エラーぺージ
    { path: "*", elemnt: <div>ページが見つかりません</div> }
  ];

  const routing = useRoutes(routes); //useRoutesを使ってルーティング設定

  return <>{routing}</>;
};

export default App;