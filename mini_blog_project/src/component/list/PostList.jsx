import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";
//PostListItem컴포넌트를 사용하기위해 import.

//map 함수를 사용하여 글의 개수만큼 PostListItem 컴포넌트를 생성한다는 점이 특이점.

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

//PostList컴포넌트의 props로 받은 posts라는 배열에는 post 객체들이 들어있음.
//이 posts 배열에 맵함수를 이용하여 각 post 객체에 대해 PostListItem 컴포넌트를 만들어 렌더링하게 됨.

function PostList(props) {
    const { posts, onClickItem } = props;

    return (
        <Wrapper>
            {posts.map((post, index) => {
                return (
                    <PostListItem
                        key={post.id}
                        post={post}
                        onClick={() => {
                            onClickItem(post);
                        }}
                    />
                );
            })}
        </Wrapper>
    );
}

export default PostList;