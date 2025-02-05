import React, { useEffect, useState } from 'react';
import classes from '../../styles/components/ListSlider.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NewListCard from '../MainPage/NewListCard';

/*
  새로운 모임을 위한 슬라이더 컴포넌트
  4개의 게시글이 보이며 자동으로 슬라이드 된다.
*/

const ListSlider = ({ latest }) => {
  const [maxWidth, setMaxWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setMaxWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: maxWidth >= 576 ? 4 : 1,
    slidesToScroll: maxWidth >= 576 ? 4 : 1,
    arrows: true,
    accessibility: true,
    autoplay: true,
  };

  return (
    <div className={classes.slider}>
      <h2 className={classes.sliderName}>새로운 모임</h2>
      {maxWidth >= 576 ? (
        <Slider
          {...settings}
          style={{ overflow: 'hidden' /* 기타 스타일 속성 */ }}
        >
          {latest.map((party) => (
            <div key={party.partyId}>
              <NewListCard party={party} />
            </div>
          ))}
        </Slider>
      ) : (
        <Slider
          {...settings}
          style={{ overflow: 'hidden' /* 기타 스타일 속성 */ }}
        >
          {latest.map((party) => (
            <div key={party.partyId}>
              <NewListCard party={party} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ListSlider;
