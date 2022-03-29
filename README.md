# 포트폴리오 공유 서비스 백엔드 코드

## 실행 방법

## 1. Mongodb 서버 구축 (a, b 중 선택)

### a. 로컬 서버

아래 공식 문서 참조 \
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ \
`mongosh` 커맨드로 서버가 들어가지면 성공적으로 구축된 것입니다. \

### b. Atlas 서버

아래 링크 가입 -> 무료 클러스터 생성 (512MB) \
https://www.mongodb.com/atlas \
왼쪽 아래 SECURITY 의 Database Access -> Add New User -> name, password 설정 \
왼쪽 아래 SECURITY 의 Network Access -> Add IP Address -> current IP 등록 \
왼쪽 위 DEPLOYMENT Databases -> Connect -> Connect your application -> 서버 링크 복사

> Atlas 관련 상세 매뉴얼은 프로젝트 안내페이지의 "알면 좋을 개발 Tip"에 있습니다.

## 2. Mongodb 서버 url 환경변수에 등록

./.env 파일 수정 \
MONGODB_URL을 위에서 만든 mongodb 서버 링크로 설정

```bash
MONGODB_URL="mongodb://localhost:27017/myDB"  (로컬 서버의 경우 예시)
MONGODB_URL="mongodb+srv://<name>:<password>@cluster0.acaph.mongodb.net/myDB?retryWrites=true&w=majority" (Atlas 서버의 경우 예시)
```

> Atlas 서버의 경우 <name>, <password>를 위에서 설정했던 name, password로 바꾸어 주세요.

## 3. Express 실행

```bash
yarn
yarn start
```

<hr />

## 파일 구조 설명

1. src폴더는 크게는 routers, services, db의 3개 폴더로 구분됩니다.

- routers:
  - request와 response가 처리됩니다. MVP 별로 1개씩, 총 5개 파일이 있습니다.
- services:
  - 백엔드 로직 코드가 있습니다. MVP 별로 1개씩, 총 5개 파일이 있습니다.
- db:
  - Mongoose와 mongodb 서버를 연결하는 코드가 있는 index.js
  - Mongoose 스키마가 있는 schemas 폴더,
  - Mongoose 모델 ORM 코드가 있는 models 폴더

2. 이외 폴더는 아래와 같습니다.

- src/middlewares:
  - jwt토큰을 다루는 미들웨어인 login_required.js
  - 학습 편의를 위해 일괄 http 400 코드로 에러를 변환하는 에러핸들러인 errorMiddleware.js
- API-REST:
  - VSCode 익스텐션 중 rest-client를 사용해서 api테스팅할 때 쓰는 파일들입니다.
- **tests**:
  - JEST 테스트파일입니다. MVP당 5개의 테스트, 총 25개 테스트가 있습니다.
  - `yarn test`로 실행합니다.
