import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
`;

export const Container = styled.div`
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
  display: flex;
  flex-deirection: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #fff;
  text-transform: uppercase;
`;
