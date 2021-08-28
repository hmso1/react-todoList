import styled from "styled-components";
import useButton from "../../hooks/useButton";
import { memo } from "react";

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;

  @media (max-width: 574px) {
    flex-direction: column;
  }
`;

const TodoLeft = styled.span`
  margin: auto 0;
`;

const FilterButtonContainer = styled.div`
  @media (max-width: 574px) {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
  }
`;

export const TodoFilter = memo(() => {
  console.log("render TodoFilter");
  const { incomplete, AllButton, ActiveButton, CompleteButton, ClearButton } =
    useButton();

  return (
    <FilterContainer>
      <TodoLeft>{incomplete} items left</TodoLeft>
      <FilterButtonContainer>
        <AllButton />
        <ActiveButton />
        <CompleteButton />
      </FilterButtonContainer>
      <ClearButton />
    </FilterContainer>
  );
});
