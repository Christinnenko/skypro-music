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
  background: #313131;
  border-radius: 12px;
  box-sizing: border-box;
  left: 0;
  min-width: 269px;
  /* min-height: 305px; */
  padding: 32px;
  position: absolute;
  top: 50px;
`;

export const FilterPopupScrollable = styled.ul`
  max-height: 236px;
  max-width: 242px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;

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

export const FilterPopupItem = styled.li`
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  &:hover {
    color: #b672ff;
    text-decoration-line: underline;
  }

  &:active {
    color: #b672ff;
    font-weight: bold;
    cursor: pointer;
  }

  &.selected {
    color: #b672ff;
    font-weight: bold;
  }
`;

export const SelectedCount = styled.span`
  width: 26px;
  height: 25.5px;
  background-color: #ad61ff;
  color: white;
  border-radius: 50%;
  padding: ${({ count }) =>
    count > 9 ? "6px 12px 6px 6px" : "6px 9px 6px 9px"};

  font-size: 13px;
  line-height: 13px;
  position: absolute;
  top: -9px;
  right: -9px;
`;
