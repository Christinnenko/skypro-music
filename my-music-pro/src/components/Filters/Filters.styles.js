import { styled } from "styled-components";

export const CenterblockFilter = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 51px;
  gap: 10px;
`;

export const FilterTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
`;

export const FilterButton = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  text-align: center;
  position: relative;

  border-color: ${(props) => (props.isopen ? "#ad61ff" : "")};
  color: ${(props) => (props.isopen ? "#ad61ff" : "")};

  &:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;
  }

  &:active {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
`;

export const FilterPopup = styled.div`
  margin-top: 10px;
  width: 248px;
  height: 305px;
  border-radius: 12px;
  background: #313131;
  display: flex;
  flex-direction: column;
  padding: 34px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  overflow-y: auto;
  position: absolute;

  .filter-popup div:hover {
    color: #b672ff;
    text-decoration-line: underline;
  }
`;

export const FilterPopupScrollable = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 28px;
  list-style: none;
  padding: 0;
  max-height: 237px;

  scrollbar-color: #ffffff #4b4949; /* Для Firefox */
  scrollbar-width: thin; /* Для Firefox */

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-track {
    background-color: #4b4949;
  }
`;
