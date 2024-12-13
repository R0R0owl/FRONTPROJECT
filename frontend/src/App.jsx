import React, { useState } from 'react';
import axios from "axios";
import { useRoutes } from "react-router-dom";

//各ページのコンポーネントをインポート
import Login from "./pages/Login";
import Sample from "./pages/Sample";
import Main from "./pages/Main";


const App = () => {
  
  //useRouteでルート設定
  const routes = [
    { path: "/", element: <Sample /> },
    { path: "/login", element: <Login /> },
    { path: "/main", element: <Main /> },


    //エラーぺージ
    { path: "*", elemnt: <div>ページが見つかりません</div> }
  ];

  const routing = useRoutes(routes); //useRoutesを使ってルーティング設定

  return <>{routing}</>;
};

export default App;