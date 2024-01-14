import { useState, useEffect } from "react";
import classes from "../styles/pages/MakePost.module.css";
import MakeMap from "../components/Map/MakeMap";
import SearchMap from "../components/Map/SearchMap";
import { MdSearch } from "react-icons/md";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import KakaoMap from "../components/Map/KakaoMap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
const EditPost = () => {
  const { meetingId } = useParams();
  // 도로명 주소
  const [address, setAddress] = useState({});
  // 검색용 키워드
  const [searchkeyword, setSearchkeyword] = useState("");
  // 오늘 날짜에서 년/월/일 도출
  // const today = new Date().toISOString().split("T")[0];
  const today = new Date();

  // 현재 날짜에 1일(24시간)을 더하여 하루 뒤의 일시를 얻음
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().slice(0, 16);

  const [latlng, setLatLng] = useState({ lat: 33.450701, lng: 126.570667 });
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [meetingInfo, setMeetingInfo] = useState({
    postedtitle: "",
    meetingname: "",
    numofpeople: "",
    meetingdate: today,
    closingDate: today,
    contact: "",
    content: "",
  });
  const navigate = useNavigate();
  // console.log(meetingInfo.closingDate);
  const handleCancel = () => {
    navigate(-1);
  };

  // useParams로 받은 meetingId로 meeting 조회
  useEffect(() => {
    console.log(meetingId);
    axios
      .get(`/v1/parties/${meetingId}`)
      .then((response) => {
        console.log(response);
        setMeetingInfo(response.data.data);
        console.log(meetingInfo);
        setLatLng({
          lat: response.data.data.latitude,
          lng: response.data.data.longitude,
        });
        setAddress({ address_name: response.data.data.address });
      })
      .catch((error) => {
        console.error("Error getting meeting data: ", error);
      });
  }, [meetingId]);

  // map 에서 추출한 주소 뒤에 상세 주소 붙이는 function
  // const addressHandler = (e) => {
  //   setAddress({ ...e.target.value });
  // };
  const addressHandler = (e) => {
    console.log(address);
    console.log(address.address_name);
    setAddress((prevAddress) => ({
      ...prevAddress,
      address_name: e.target.value,
    }));
    console.log(address.address_name);
    // setPostedInfo((prevInfo) => ({
    //   ...prevInfo,
    //   place: ,
    // }));
  };
  // 입력된 검색 키워드를 state로 저장하는 function
  const onKeywordHandler = (e) => {
    setSearchkeyword(e.target.value);
    console.log(searchkeyword);
  };
  // 돋보기 이모지의 handler...아마 필요 없을 예정...
  const onSearchHandler = () => {
    console.log("입력 완료");
  };

  const titleHandler = (e) => {
    console.log("제목이 변경되었습니다.");

    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      title: e.target.value,
    }));
    // console.log(postedInfo);
  };
  const nameHandler = (e) => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      meetingname: e.target.value,
    }));
  };
  // const placeHandler = (e) => {
  //   setMeetingInfo((prevInfo) => ({
  //     ...prevInfo,
  //     place: e.target.value,
  //   }));
  // };
  const numberHandler = (e) => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      maxCapacity: e.target.value,
    }));
  };
  const dateHandler = (e) => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      meetingDate: e.target.value,
    }));
  };
  const dueHandler = (e) => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      closingDate: e.target.value,
    }));
  };
  const contactHandler = (e) => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      phoneNumber: e.target.value,
    }));
  };
  const contentHandler = (e) => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      content: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(postedInfo);
    // console.log(position);
    const data = new FormData(e.target);
    const meetingdate = data.get("meetingdate");
    const postedtitle = data.get("postedtitle");
    const content = data.get("content");
    const numofpeople = data.get("numofpeople");
    const meetingname = data.get("meetingname");
    const duedate = data.get("duedate");
    const contact = data.get("contact");

    // let updatedDTO = {
    //   id: Math.random() * 1000,
    //   // memberId 하나로 가져오기!
    //   // owneruserId: 1,
    //   // owneremail: "user1@example.com",
    //   memberId: loggedInUser.id, //
    //   meeting_date: meetingdate,
    //   location: address.address_name,
    //   lat: latlng.lat,
    //   lng: latlng.lng,
    //   title: postedtitle,

    //   content: content,
    //   max_capacity: numofpeople,
    //   current_capacity: meetingInfo.current_capacity, //
    //   // 참여 기능 완성되면 수정 필요 // 글 등록할 때는 기본적으로 0 아님??
    //   hits: 0, //

    //   created_at: new Date(), //
    //   last_modified_at: new Date(), //

    //   // 아래는 테이블에서 생략됨 이야기 필요
    //   meetingname: meetingname,
    //   duedate: duedate,
    //   contact: contact,

    //   // hits 필요
    //   party_status: meetingInfo.party_status, //
    // };
    let postDTO = {
      title: meetingInfo.title,
      memberId: loggedInUser.id,
      meetingDate: meetingInfo.meetingDate,
      closingDate: meetingInfo.closingDate,
      latitude: latlng.lat,
      longitude: latlng.lng,
      address: address.address_name,
      content: meetingInfo.content,
      maxCapacity: meetingInfo.maxCapacity,
      partyStatus: meetingInfo.partyStatus,
      phoneNumber: meetingInfo.phoneNumber,
    };
    // console.log(updatedDTO);
    // setMeetingInfo({
    //   postedtitle: "",
    //   meetingname: "",
    //   numofpeople: "",
    //   meetingdate: today,
    //   duedate: today,
    //   contact: "",
    //   content: "",
    // });
    // setAddress({ address_name: "" });
    // setLatLng({ lat: meetingInfo.lat, lng: meetingInfo.lng });
    console.log(meetingInfo);
    setSearchkeyword("");
    // setLatLng({ lat: 33.450701, lng: 126.570667 });
    // console.log(postedInfo);
    console.log(postDTO);
    axios
      .patch(`/v1/parties/${meetingInfo.partyId}`, postDTO)
      .then((response) => {
        console.log(response.data);
        // console.log("submit 완료");
        alert("모집글이 수정되었습니다!");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating meeting data: ", error);
        // error.message 판단하여 alert 메세지 던져주기
        alert("오류가 발생했습니다!");
      });
  };
  const toggleOnHandler = () => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      partyStatus: "PARTY_CLOSED",
    }));
  };
  const toggleOffHandler = () => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      partyStatus: "PARTY_OPENED",
    }));
  };
  return (
    <div className={classes.wrapper}>
      <Header />
      <form onSubmit={submitHandler}>
        <div className={classes.container}>
          {/* <h1>모임 글 등록</h1> */}
          <div className={classes.title}>
            <h2>제목</h2>
            <input
              type="text"
              placeholder="글 제목을 입력하세요..."
              value={meetingInfo.title}
              name="postedtitle"
              onChange={titleHandler}
            />
          </div>
          <div className={classes.info}>
            <div className={classes.inputs}>
              <h2>상세 정보</h2>
              {/* <div className={classes.field}>
                <h4>모임 이름</h4>
                <input
                  type="text"
                  value={meetingInfo.meetingname}
                  name="meetingname"
                  onChange={nameHandler}
                />
              </div> */}
              <div className={classes.field}>
                <h4>모임 장소</h4>
                <input
                  type="text"
                  value={address.address_name}
                  onChange={addressHandler}
                  name="address"
                />
              </div>
              <div className={classes.field}>
                <h4>모임 인원</h4>
                <input
                  type="number"
                  placeholder="2명 이상~50명 이하"
                  min={2}
                  max={50}
                  value={meetingInfo.maxCapacity}
                  name="numofpeople"
                  onChange={numberHandler}
                />
              </div>
              <div className={classes.field}>
                <h4>모임 일시</h4>
                <input
                  type="datetime-local"
                  min={formattedTomorrow}
                  value={meetingInfo.meetingDate}
                  name="meetingdate"
                  onChange={dateHandler}
                />
              </div>
              <div className={classes.field}>
                <h4>모집 마감일</h4>
                <input
                  type="datetime-local"
                  min={formattedTomorrow}
                  value={meetingInfo.closingDate}
                  name="duedate"
                  onChange={dueHandler}
                />
              </div>
              <div className={classes.field}>
                <h4>연락 방법</h4>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  value={meetingInfo.phoneNumber}
                  name="contact"
                  onChange={contactHandler}
                />
              </div>
            </div>
            <div className={classes.map}>
              <div className={classes.search}>
                <MdSearch className={classes.icon} onClick={onSearchHandler} />
                <input
                  type="text"
                  placeholder="검색할 장소를 입력하세요..."
                  value={searchkeyword}
                  onChange={onKeywordHandler}
                />
              </div>

              {/* <KakaoMap /> */}
              {/* <MakeMap setAddress={setAddress} searchkeyword={searchkeyword} /> */}
              <SearchMap
                setAddress={setAddress}
                searchkeyword={searchkeyword}
                lat={latlng.lat}
                lng={latlng.lng}
                setLatLng={setLatLng}
              />
            </div>
          </div>
          <div className={classes.comment}>
            <h2>내용</h2>
            <textarea
              placeholder="내용을 작성해 주세요..."
              value={meetingInfo.content}
              name="content"
              onChange={contentHandler}
            />
            <div className={classes.btnCon}>
              {meetingInfo.partyStatus === "PARTY_OPENED" && (
                <button className={classes.onBtn} onClick={toggleOnHandler}>
                  현재 모집중
                </button>
              )}
              {meetingInfo.partyStatus === "PARTY_CLOSED" && (
                <button className={classes.offBtn} onClick={toggleOffHandler}>
                  현재 모집완료
                </button>
              )}
              <button className={classes.cancelBtn} onClick={handleCancel}>
                취소
              </button>
              <button type="submit" className={classes.postBtn}>
                글 수정
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default EditPost;
