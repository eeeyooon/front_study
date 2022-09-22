import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // posts 폴더 안에 있는 파일명들을 가져온다.
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 파일명에서 ".md"확장자를 제거한다.
    const id = fileName.replace(/\.md$/, '');

    // 마크다운 파일을 읽는다.
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 메타데이터를 파싱하기 위해 gray-matter를 사용한다.
    const matterResult = matter(fileContents);

    // id와 데이터를 한 객체로 묶는다.
    return {
      id,
      ...matterResult.data,
    };
  });
  // date 순으로 포스트를 정렬한다.
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // 아래와 같은 형태로 파일명 리스트를 리턴한다. 리스트는 문자열 형태가 아니라 객체형태여야 한다.:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 포스트의 메타데이터 섹션을 파싱하기 위해 gray-matter를 사용
  const matterResult = matter(fileContents)

  // 마크다운을 HTML 문자열로 변환하기 위해 remarK를 사용
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // id와 contentHtml 합치기
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}