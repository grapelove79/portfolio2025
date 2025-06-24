import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import HomeView from './views/HomeView'; // 실제 메인 페이지 컴포넌트
import smooth from "./utils/smooth";
// import link from "./utils/link";
import Cursor from "./components/Cursor";

const App = () => {
  // loadingDone: false이면 로딩화면, true이면 메인 콘텐츠 표시
  const [loadingDone, setLoadingDone] = useState(false);

  // loadingDone이 App에서 직접 관리되므로 smooth()와 link()도 정확히 로딩 후 한 번만 실행됩니다.
  useEffect(() => {
    if (loadingDone) {
      smooth();
      // link();
    }
  }, [loadingDone]);

  return (
    <>
      {/* 로딩이 끝나지 않았으면 로딩 화면만 보여줌 */}
      {!loadingDone ? (  // loadingDone 이 true 가 아닌 경우 true
        <LoadingScreen onFinish={() => {
          setLoadingDone(true);
        }} />
      ) : (
      <BrowserRouter>
        <Cursor />
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </BrowserRouter>
      )}
    </>
  );
};

export default App;