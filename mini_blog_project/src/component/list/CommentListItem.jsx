import React from "react";
import styled from "styled-components";

//CommentListItem이란 이름의 함수컴포넌트 생성 CommentListItem컴포넌트는 props에서 comment 객체 하나만 사용
//comment 객체엔 사용자가 작성한 댓글 내용이 들어있음.
//이를 ContentText라는 컴포넌트를 이용해서 화면에 표시함.
//댓글은 별도로 클락하는 기능이 없기때문에 따로 onClick 이벤트 처리하지 않아도 됨.
const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const ContentText = styled.p`
    font-size: 14px;
`;

function CommentListItem(props) {
    const { comment } = props;

    return (
        <Wrapper>
            <ContentText>{comment.content}</ContentText>
        </Wrapper>
    );
}

export default CommentListItem;