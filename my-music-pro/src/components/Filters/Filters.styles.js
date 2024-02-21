import { styled } from "styled-components";

export const CenterblockFilter = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
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

export const FilterBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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

  border-color: ${(props) => (props.$isActive ? "#ad61ff" : "")};
  color: ${(props) => (props.$isActive ? "#ad61ff" : "")};

  &:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;
  }

  &:active {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
  }
`;

export const FilterPopup = styled.div`
  margin-top: 10px;
  border-radius: 12px;
  background: #313131;
  display: flex;
  flex-direction: column;
  padding: 34px;
  font-size: 20px;
  line-height: 24px;
  position: absolute;
  max-height: 237px;
  max-width: 242px;
  overflow-y: auto;
`;

export const FilterPopupScrollable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  list-style: none;
  padding: 0;
  cursor: pointer;
  font-size: 19px;
  line-height: 24px;
  width: 100%;

  div:hover {
    color: #b672ff;
    text-decoration-line: underline;
  }

  div:active {
    color: #b672ff;
    font-weight: bold;
  }

  div.selected {
    color: #b672ff;
    font-weight: bold;
  }

  scrollbar-color: #ffffff #4b4949; /* Для Firefox */
  scrollbar-width: 4px; /* Для Firefox */

  &::-webkit-scrollbar {
    width: 4px;
  }
  div {
    padding-right: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-track {
    background-color: #4b4949;
  }
`;

export const SelectedCount = styled.span`
  width: 26px;
  height: 25.5px;
  background-color: #ad61ff;
  color: white;
  border-radius: 50%;
  padding: 6px 9px 6px 9px;
  font-size: 13px;
  line-height: 13px;
  position: absolute;
  top: -9px;
  right: -9px;
`;
