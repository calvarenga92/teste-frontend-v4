import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
`;

export const Finder = styled.div`
    text-align: center;
`;
export const ModalTable = styled.div`
    border: 1px solid #bd0;
    height: 280px;
    overflow: hidden;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    line-height: 25px;
`;


export const InfoMap = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MenuEquip = styled.div`
    display: flex;
    min-width: 300px;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 1px;
    align-items: center;
    flex-direction: row;
    padding: 5px 20px;
    background-color: rgba(0,0,0,0.1);

    button {
      font-size: 12px;
      background: #053184;
      color: #fff;
      border: 0;
      padding: 5px 10px;
      border-radius: 4px;
      margin: 4px 0;
      height: fit-content;
      
      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }
    }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  span {
    margin: 2px 0;
  }
`;
export const SubCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  justify-content: center;
`;

export const Title = styled.div`
  padding: 10px;
  text-align: center;
  font-weight: 600;
`;
export const StylePositionHistory = styled.div`
  border: 1px solid #bd0;
`;
export const WrapperMenu = styled.div`
  height: auto;
  height: 315px;
  overflow-y: scroll;
`;


export const Search = styled.input`
  width: 230px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  text-align: center;
`;

export const ModalPosition = styled.div`
  font-size: 14px;
  span {
    margin-right: 8px;
  }

  button:hover {
    cursor: pointer;
  }
`;

export const Select = styled.select`
  margin: 10px 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.4);
  width: 250px;
`;