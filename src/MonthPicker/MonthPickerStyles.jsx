import styled, { keyframes } from "styled-components";

export const MonthContainer = styled.div`
  background-color: white;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
`;

export const Divider = styled.div`
  height: 8px;
  background-color:  white;
  width: 100%;
`;

const fadeIn = keyframes`
  from {
    transform: scaleY(0.95);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
`;

export const TooltipContainer = styled.div`
  margin-top: 8px;
  transform-origin: top center;
  animation: ${fadeIn} .2s;
  position: absolute;
  box-shadow: 0 1px 3px #d3d3d380, 0 1px 3px #d3d3d380;
  border: 1px solid ${props => props.brand.primaryColor};
  border-radius: 4px;
  z-index: 10;
`;

export const Header =  styled.div`
  padding: 16px 8px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.brand.primaryColor};
  color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;


export const SVG = styled.svg`
  cursor: pointer;
  fill: white;
  fill: #000;
`;
