import React from "react";
import styled from "styled-components";

//Button 태그에 스타일을 입힌 StyledButton 태그 생성
const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

function Button(props) {

    //Button 컴포넌트에서 props로 받은 title이 버튼 목록에 표시되도록 해주었고
    //props로 받은 onClick은 StyledButton onClick에 넣어줌으로써 클릭이벤트를 상위컴포넌트에서 받게 해줌.
    const { title, onClick } = props;

    return <StyledButton onClick={onClick}>{title || "Button"}</StyledButton>;
}

export default Button;