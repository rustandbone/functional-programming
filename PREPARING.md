# 프리페어링

학습에 필요한 환경이 준비되어 있는 지 확인합니다.

- [x] [Git v2+](https://git-scm.com/)
- [x] [Node.js v18+](https://nodejs.dev/en/)
- [ ] [PNPM v8+](https://pnpm.io/ko/)
- [ ] [degit v2+](https://github.com/Rich-Harris/degit#readme)
- [ ] [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## 프리페이링 실습

강사와 함께 직접 학습 폴더(로컬) 및 학습 저장소(리모트)를 구성합니다.

1. 학습을 진행할 `functional-programming` 폴더를 생성합니다.
1. 학습 폴더를 Git으로 관리할 수 있도록 초기화합니다. (브랜치 이름: `main`)
1. Git 관리 제외 항목을 설정한 `.gitignore` 파일을 작성합니다.
1. `index.html`, `src/main.js` 파일을 생성합니다.
1. PNPM을 사용해 [vite](https://npmjs.com/package/vite) 패키지를 설치하고 구성합니다.
1. `pnpm dev` 명령으로 개발 서버를 구동시킵니다.
1. 변경 이력을 커밋(commit)한 후, GitHub에 배포합니다.
1. `degit` 명령을 사용해 강사의 학습 저장소 `src` 폴더를 다운로드 받습니다.