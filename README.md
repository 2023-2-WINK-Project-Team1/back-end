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

### commit message

- 커밋 메시지를 신경써서 작성하길 바란다. 작성 방법은 노션 참고
  - git config --global commit.template .gitmessage.txt
    - 커밋을 할 때 사용할 템플릿을 세팅하는 커맨드이다.
  - git commit
    - 이 명령어를 실행하면 커밋 템플릿이 켜진다. (vi 에디터)
    - i를 눌러 수정을 한다.
    - 제목, 본문, 푸터라고 적혀있는 부분의 아래에 있는 빈 줄에 작성한다.
    - 작성 방법은 노션을 참고한다.
    - 작성을 완료한 뒤, esc를 한번 누르면 수정 모드가 나가진다.
    - 이후 :wq 를 누르면 커밋이 완료된다.

### .env 파일 수정시 반영하기

- npm run sync-dotenv-slack
  - 이걸 실행하면 slack으로 변경사항이 넘어간다.
- 하지만 husky를 통한 설정 덕분에 push 할 때마다 자동으로 넘어갈 것이다.

### git flow 전략으로 브랜치 관리하기

- 노션을 통해서 학습해주세요!

### Run

0. 백장에게 .env파일을 전달받는다. (혹은 slack에서 최신 내용을 복붙한다.)

1. MongoDB를 켠다.

- 각자의 로컬 환경 셋업에 맞춰서 잘 진행하도록 한다.

2. npm i

- node_module을 다운받는 구문이다.
- 패키지 다운로드를 최신화한다.

3. npm run dev

- 백엔드 서버를 실행하는 구문이다.
