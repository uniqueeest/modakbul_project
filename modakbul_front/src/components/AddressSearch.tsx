import DaumPostcode from 'react-daum-postcode';
import React, {useState} from 'react';
import "./AddressSearch.css";
import styled from 'styled-components';

const AddressSearch = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const complete = (data: any) => {
    // 주소 검색 완료 시 실행할 함수
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    props.setcompany({
      ...props.company,
      zipCode: data.zonecode, 
      address: fullAddress,
      detailAddress: "",
    });
    setIsModalOpen(false); // 검색 완료 후 모달 닫기
  };

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <AddressContainer>
      <AddressButton onClick={openModal}>주소 검색</AddressButton>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>주소 검색</h2>
            </div>
            <div className="modal-body">
              <DaumPostcode autoClose onComplete={complete} />
            </div>
          </div>
        </div>
      )}
    </AddressContainer>
  );
};

export default AddressSearch;

const AddressContainer = styled.div`
  display: flex;
`

const AddressButton = styled.button`
  margin-top: 1rem;
  padding: 0.3rem;
  align-self: center;

  text-decoration: none;
  background-color: black;
  font-size: 0.9rem;
  color: white;
  border-radius: 7px;
  border: 1px solid black;

  width: 7rem;
  height: 2rem;

  text-align: center;
  cursor: pointer;

  &:hover{  
    background-color : #20262E;
    transition: ease-in 0.2s;
  }
`