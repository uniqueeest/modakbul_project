import React, {useState} from "react";
import styled, {createGlobalStyle} from 'styled-components';
import AddressSearch from "./AddressSearch";


const Post = () => {
  const [enroll_company, setEnroll_company] = useState({
    zipCode: "",
    address: "",
    detailAddress: "",
  });
  const [isAddressModal, setAddressModal] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PostContainer>
      <GlobalStyle />
      <InputContainer>
        <ZipContainer>
          <ZipInput
            placeholder="우편번호"
            type="text"
            required={true}
            name="zipCode"
            onChange={handleInput}
            value={enroll_company.zipCode}
          />
          <AddressSearch
          company={enroll_company}
          setcompany={setEnroll_company}
          setAddressModal={setAddressModal}
          isAddressModal={isAddressModal}
        ></AddressSearch>
        </ZipContainer>
        <PostInput
          placeholder="주소"
          type="text"
          required={true}
          name="address"
          onChange={handleInput}
          value={enroll_company.address}
        />
        <PostInput
          placeholder="상세주소"
          type="text"
          required={true}
          name="detailAddress"
          onChange={handleInput}
          value={enroll_company.detailAddress}
        />
      </InputContainer>
    </PostContainer>
  );
};

export default Post;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ZipContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const ZipInput = styled.input`
  margin: 1rem 0 0;

  width: 10rem;
  height: 2rem;
  font-size: 16px;
  color: black;
  border-radius: 7px;
  border: 1px solid #B7B7B7;
`

const PostInput = styled.input`
  margin: 1rem 0 0;

  width: 24.65rem;
  height: 2rem;
  font-size: 16px;
  color: black;
  border-radius: 7px;
  border: 1px solid #B7B7B7;
`