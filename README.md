# back-end

### Set-up

- .gitignore
  - /node_modules 를 추가했다.
  - /node_modules 폴더는 용량이 크다. -> 깃허브에 올리지 않는다.
  - package.json의 dependencies에 기록된 내용을 바탕으로, 각자의 로컬에서 재설치 해야한다.
  - npm i
- babel.config.json
  - babel : 쉽게 생각하면, 자바스크립트 컴파일러이다.
  - babel, preset-env 설정을 통해서 최신 자바스크립트 구문을 사용할 수 있게 한다.
- nodemon
  - 코드의 수정 내용을 반영하기 위해서 서버를 재실행할 필요가 있는데, 이를 자동으로 해준다.

### Run

- npm i
  - node_module을 다운받는다.
- npm run dev
  - 백엔드 서버를 실행한다.
