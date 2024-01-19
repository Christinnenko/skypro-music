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
  align-items: flex-start;
  justify-content: center;
  overflow-y: scroll;
`;

export const Text = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  letter-spacing: 2px;
  color: #fff;
  text-transform: uppercase;
`;

export const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  max-width: 100%;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const ContainerSidebar = styled.div`
  display: flex;
  flex-direction: column;
`;
