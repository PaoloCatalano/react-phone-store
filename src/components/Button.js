import styled from "styled-components";
//styled Components
//TERMINAL: npm install --save styled-components
export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.1rem solid var(--lightBlue);
  color: var(--lightBlue);
  /*se si passa il props, cambia colore */
  border-color: ${(props) =>
    props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
  color: ${(props) => (props.cart ? "var(--mainYellow)" : "var(--lightBlue)")};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out !important;
  &:hover {
    background: ${(props) =>
      props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: var(--mainBlue);
  }
  &:focus {
    outline: none;
  }
`;
/* 1 rem = 16 px (pixel)

SASS 
 &:hover {} = cambio del colore se mouse rilevato 
&:focus {outline: none}; = toglie la selezione
 
 CSS
 border-radius: (da 0 a 1)rem; = bordi arrotondati
 
   transitions: all 0.5s ease-in-out; = ??????????????
*/
