import React from "react";

const Skip = () => {
  return (
    <div id="skip">
      {/* tabIndex="-1" 적용 → 
      모바일 보이스오버나 키보드 포커스 이동이 자동 스크롤을 유발하는 경우 방지: */}
      <a href="#main" tabIndex="-1">소개 영역 바로가기</a>
    </div>
  )
}

export default Skip;