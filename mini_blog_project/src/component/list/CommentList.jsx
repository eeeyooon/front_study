import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

//CommentList 컴포넌트의 Props로는 comments 배열이 들어옴.
//이 배열에는 comment 객체들이 들어있으며, 이 배열에 map함수를 사용해서 각 댓글객체를
//CommentListItem컴포넌트로 넘겨 화면에 댓글을 표시함.

function CommentList(props) {
    const { comments } = props;

    return (
        <Wrapper>
            {comments.map((comment, index) => {
                return <CommentListItem key={comment.id} comment={comment}/>;
            })}
        </Wrapper>
    );
}

export default CommentList;