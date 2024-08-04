# ⚡Vite 커스텀 템플릿

2024.07.31 (수)
<br>
<b>🎯 React 프로젝트를 위한 Vite 커스텀 템플릿을 만들어보자.</b>

---

### 초기 구성

- README.md 생성
- .gitignore 생성

<br>

### Vite

- Vite 패키지 설치 (node_modules, package.json, pnpm-lock.yaml)
- 명령어 인터페이스
- Vite 플러그인 구성 (vitejs, vite.config.js)

<br>

### React

- React 패키지 설치 (React, ReactDOM)
- 타입 선언 패키지 설치 (React Type, ReactDOM Type, Node Type) ➡️optional

<br>

### ESLint (v.9+)

- ESLint 설치
- eslint.config.js 설정 (plugins, languageOptions-parserOptions, rules)
- 명령어 인터페이스
- ESLint 플러그인 구성 (eslint-plugin-react-hooks, eslint-plugin-react-refresh)

<br>

### 절대 경로 설정

- fileURLToPath, URL (Node.js)
- jsconfig.json

<br>

### Sass 설치

- base, utils 추가

---

### 🚥 느낀점

👍 직접 구성해보며 하나하나 살펴보는 좋은 기회

- 정규 강의 시간에는 이해하기 보다 따라하기 바빴지만, 직접 설치해보면서 각 파일들의 역할에 대해 한번 더 생각해볼 수 있었습니다.

<br>

⚠️ named export와 default export에 대한 이해

- React를 계속 import하지 않고 jsx를 사용하기 위해 플러그인을 설치하였습니다.
- config 파일을 작성하던 중, 계속 오류가 발생해서 왜 그런가 하고 봤더니 import 구문의 named와 default 방식을 잘못 사용하고 있었다는 것을 알게 됐습니다.

<br>

⛔ prettier 설정에 대하여

- html에서 어트리뷰트 마다 줄 바꿈이 되고 있는데, 한줄로 나타내기 위해 프리티어 설정을 계속 바꿔보았지만 실패했습니다. 🥲
