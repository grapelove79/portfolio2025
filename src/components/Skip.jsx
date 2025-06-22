import React from "react";

const Skip = () => {
  return (
    <div id="skip">
      <a href="#header">헤더 영역 바로가기</a>

      {/* tabIndex="-1" 적용 → 
      모바일 보이스오버나 키보드 포커스 이동이 자동 스크롤을 유발하는 경우 방지: */}
      <a href="#intro" tabIndex="-1">소개 영역 바로가기</a>
      <a href="#skill">스킬 영역 바로가기</a>
      <a href="#career">경력 영역 바로가기</a>
      <a href="#port">포트폴리오 영역 바로가기</a>
      <a href="#contact">연락처 영역 바로가기</a>
      <a href="#footer">푸터 영역 바로가기</a>
    </div>
  )
}

export default Skip;