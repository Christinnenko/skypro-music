import { styled } from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const Heading = styled.p`
  font-size: 160px;
  line-height: 168px;
  margin-top: 100px;
  margin-bottom: 3px;
`;

export const Text = styled.p`
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 19px;
`;

export const Image = styled.div`
  width: 52px;
  height: 52px;
  background-size: cover;
  background-image: url("/img/smile_crying.png");
`;

export const ImageSmile = styled.div`
  width: 120px;
  height: 120px;
  background-size: cover;
  background-image: url("/img/smile_sad.png");
`;

export const Content = styled.p`
  width: 280px;
  color: #4e4e4e;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.054px;
  margin-bottom: 36px;
`;
