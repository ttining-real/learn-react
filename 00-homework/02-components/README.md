# 아토믹 컴포넌트 만들기

### ✍️ 컴포넌트 구현 과정
1. Figma 컴포넌트 제작  → [피그마 링크](https://www.figma.com/design/dWyuH3nrqmy54pJF3t797T/Components?node-id=0-1&t=2F9bRvSdDjAyj1Kh-1)
2. Button 컴포넌트(상태, 크기)와 Card 컴포넌트 제작
3. JSX 문법 → 파이널 프로젝트 때, 많이 사용할 것 같아서 이번에는 사용하지 않는 것을 목표로 했습니다.
4. 카드 컴포넌트의 경우, 클릭 시 페이지 이동이 가능하도록 ```<a>```태그로 감싸주었습니다.
5. '버튼 컴포넌트'와 '카드 컴포넌트'를 각 ```<section>```으로 그룹핑 하였습니다.
6. 다크 모드를 적용해본 적이 없어서, 미약하게나마 ```prefers-color-scheme```을 적용해보았습니다.

<b>🌠 아쉬웠던 점</b>
- 다크모드와 반응형을 고려한 설계 능력
- Vite와 PocketBase 사용을 하지 않은 점 (아직까지 Vite 사용의 이점에 대해 자세히 모르겠습니다.. ㅎㅎ)
- 현재는 단순히 ButtonList라는 버튼을 모아둔 리스트로만 구성되어있는데, input, select 등의 요소를 추가한 패턴화 작업을 해보고 싶다.

<br>

### 📖 아토믹 디자인이란?
- 아토믹 디자인 멘탈 모델에 대해  학습하세요.

[Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/)
[Atomic Design Pattern의 Best Practice 여정기](https://yozm.wishket.com/magazine/detail/1531/)

<br>

### 🎨 아토믹 컴포넌트 구현
Figma 컴포넌트 → React 컴포넌트 구현이 과제입니다.

1. 바닐라 프로젝트 결과물에서 구현할 컴포넌트를 1개 선정합니다.
2. Figma를 사용해 선정한 컴포넌트 정의 및 변형을 설계합니다.
3. 디자인된 컴포넌트를 React 컴포넌트로 구현합니다.

<br>

### ✅ 수행 조건
1. 모두가 접근 가능
2. 의미있는 구조 설계
3. 체계적인 표현 설계

<br>

### ✅ 제출 방법
- Github 저장소 생성
- 테스트 코드 푸시 및 README.md 파일에 기록
- 저장소 URL을 [과제 수행 채널](https://github.com/yamoo9/likelion-10th/discussions/categories/z-%EA%B3%BC%EC%A0%9C-%EC%88%98%ED%96%89)에 남기기