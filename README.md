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

### Package Description

- nodemon
  - 코드의 수정 내용을 반영하기 위해서 서버를 재실행할 필요가 있는데, 이를 자동으로 해준다.
- dotenv
  - 환경변수들은 외부에 노출되면 안된다. 따라서 .env파일에 작성하고 이를 .gitignore에 추가한다.
  - 깃허브에 올라가지는 않지만, 로컬 상에는 존재하는 .env파일에서 변수를 읽어올 수 있게 하는 라이브러리이다.
  - 코드를 보다 보면, process.env 형태의 구문을 볼 수 있는데 이 부분이 해당한다고 보면 된다.
  - .env 파일은 파트장에게 전달받자.

### Run

0. 백장에게 .env파일을 전달받는다.

1. MongoDB를 켠다.

- 각자의 로컬 환경 셋업에 맞춰서 잘 진행하도록 한다.

2. npm i

- node_module을 다운받는 구문이다.

3. npm run dev

- 백엔드 서버를 실행하는 구문이다.
