import React, { useState } from 'react';
import classes from '../../styles/components/ListCard.module.css';
import footerLogo from '../../images/footerLogo.png';
import SignUpModal from '../../pages/SignUpModal';
/*
    새로운 모임을 위한 게시글 컴포넌트
    더미 데이터를 이용하여 확인 입니다.
*/

const ListCard = ({ party }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handlePostClick = () => {
    // 게시글 클릭 시 모달 열기
    setModalIsOpen(true);
  };

  return (
    <div className={classes.ListCard} onClick={handlePostClick}>
      <img src={footerLogo} alt="게시판 이미지" />

      <div className={classes.ListCardTitle}>
        <span>{party?.title}</span>
      </div>
      <div className={classes.ListCardContent}>
        <span>{party?.content}</span>
      </div>
      <div className={classes.ListCardMeetingDate}>
        <span>{party?.meetingDate}</span>
      </div>

      <SignUpModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </div>
  );
};

export default ListCard;
