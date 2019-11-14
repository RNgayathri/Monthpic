import styled, { css } from 'styled-components';


const Month = styled.div`
  ${props => !props.focussed && css`
      cursor: pointer;

      &:hover {
        background-color: ${props => props.brand.brand.primaryColor};
        color: white;
      }
    `
  }

  &:focus {
    outline: none;
  }

  ${props => props.focussed && css`
    border: 1px solid #000;
    background-color: ${props => props.brand.brand.primaryColor};
    color: ${props => props.brand.brand.secondaryColor};
  `}

  padding: 12px 0;
  transition: background-color .1s, color .1s;
  font-size: 14px;
  background-color: white;
  color: black;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 33.33%;

  ${props => props.focussed && !props.selected && css`
    &:nth-child(3n) {
      border-right: 1px solid #000;
    }

    &:nth-child(3n+1) {
      border-left: 1px solid #000;
    }

    &:nth-last-child(-n+3) {
      border-bottom: 1px solid #000;
    }
  `}

  border-bottom-right-radius: ${props => props.index === 11 && '4px'};
  border-bottom-left-radius: ${props => props.index === 9 && '4px'};
`;

export default Month;
