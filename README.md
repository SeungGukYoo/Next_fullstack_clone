# NextJS+NodeJS SNS

## 소개

NextJS로 프론트엔드를 구성하였으며, NodeJS를 사용해 백엔드를 구축한 SNS 클론 코딩입니다. <br/>

## 사용 기술 스택

### Front-end

![ReactJS](https://img.shields.io/badge/React-444444?style=for-the-badge&logo=react)
![NextJS](https://img.shields.io/badge/Next-444444?style=for-the-badge&logo=Next.js)
![TailwindCss](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=ffffff)
![ReduxSaga](https://img.shields.io/badge/ReduxSaga-999999?style=for-the-badge&logo=ReduxSaga&logoColor=ffffff)
![antdesign](https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=ffffff)
![antdesign](https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=ffffff)
![axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=ffffff)
![babel](https://img.shields.io/badge/babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=ffffff)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=ffffff)

### Back-end

![nodejs](https://img.shields.io/badge/nodeJS-339933?style=for-the-badge&logo=node.js&logoColor=fff)
![express](https://img.shields.io/badge/express-000?style=for-the-badge&logo=express&logoColor=fff)
![mySQL](https://img.shields.io/badge/mySQL-4479A1?style=for-the-badge&logo=mySQL&logoColor=fff)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=fff)
![passport](https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=fff)
![sequelize](https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=fff)
![nodemon](https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=fff)
![amazonaws](https://img.shields.io/badge/amazonaws-FF9900?style=for-the-badge&logo=amazonaws&logoColor=fff)

## 프로젝트 소개

### 프로젝트 실행

- ### 설치

  ```zsh
  git clone https://github.com/SeungGukYoo/Next_fullstack_clone.git
  // back폴더에서 서버 실행 후 front 폴더 이동 후 실행
  cd back
  cd front
  ```

- ### Front

  ```zsh
  npm run dev
  // 3060 포트에서 실행
  // http://localhost:3060/
  ```

- ### Back

  ```zsh
  npm run dev
  // node mon을 통해 실행
  ```

### 프로젝트 기능

해당 프로젝트는 트위터, 인스타그램과 같이 글과 이미지를 올리고, 다른 사용자들이 해당 글을 좋아요, 댓글등을 할 수 있는 프로젝트입니다.<br>
기술을 배우기 위해 진행한 프로젝트였기 때문에 디자인적인 요소는 크게 신경쓰지 않고 진행하였습니다.

### 프로젝트 구성 및 학습 내용

프로젝트에서 프론트 엔드 부분은 NextJS를 사용하여 구성하였으며, 백엔드는 NodeJS를 사용하였습니다. <br>
프로젝트를 진행하면서 프론트엔드 부분에서 중점적으로 학습하고자 한 내용은 NextJS와 리덕스 사가에 대해서 심화적으로 공부하는 것을 목표를 잡았으며,<br>
백엔드 부분 학습하고자 한 내용은 프론트에서 데이터 요청시 어떻게 요청이 들어오고데이터를 어떻게 가공해서 응답을 해야하는지에 대해서 학습해보았습니다.

## 문제와 해결과정

### 1. 백엔드와 프론트엔드의 데이터 구조 설계

지금까지는 모두 만들어진 백엔드 데이터를 불러와 사용하였지만 이번에는 프론트를 모두 제작한 후 백엔드를 진행하였습니다. <br>
이 과정에서 사전에 만들어 놓은 프론트의 더미데이터 구조를 백엔드에서 그대로 사용했는데, 프론트의 더미데이터의 구조가 규칙없이 만들어 놓았기 때문에 백엔드에서의 데이터 구조를 만드는 것이 어려웠습니다. 그래서 백엔드의 데이터 구조를 다시 만들어 놓고, 프론트의 데이터 구조를 바꾸는 과정을 해야만 했습니다.

#### <b>해결과정</b>

해당 문제로 인해 앞으로 프로젝트를 진행시 백엔드와 프론트엔드에서 어떻게 데이터 구조를 잡고 진행할지에 대한 소통의 중요성을 알게되었습니다.

### 2. reducer와 saga의 함수, 변수에 대한 명명 규칙

많은 양의 데이터를 사가로 관리해본 경험이 없었기에 변수명에 규칙보다는 읽었을 때 알아보기 쉽게 작성하자고만 생각하고 진행했습니다. <br>
프론트에서 필요한 데이터의 양이 점점 늘어나기 시작했고, reducer와 saga의 함수가 증가했고, reducer를 관리하기 위한 state도 늘어나기 시작했고, 이름의 규칙이 없었기에 가독성이 더 어려워졌고, 수정하고 찾는데만 오랜시간이 걸렸습니다.<br>

#### <b>해결과정</b>

이러한 문제를 해결하기 위해 함수와 변수의 명명을 하는 과정에서 규칙의 중요성에 대해서 알게되었습니다. 해당 변수명과 함수명이 무엇을 뜻하는지 작성하는 것도 중요하지만 작성할 때의 문법에 대한 규칙이 생김으로 써 코드 양이 많아져도 찾기 쉽고, 수정 및 추가하는데 큰 어려움이 없다는 것을 학습하였습니다.

### 3. AWS의 배포중에 생긴 에러

백엔드를 직접 구현하고 배포할 생각이였기 때문에 AWS를 통해 만든 프로젝트를 배포하려고 하였습니다. <br>
하지만 AWS를 처음 사용해보고 배우는 것이였기 때문에 여러가지 커뮤니티를 통해 공부하며 진행하였지만 에러가 발생하여 해결하려고 하였지만, 결국 해결하지 못하였습니다. <br>
그로인하여 배포를 완료하지 못하였습니다.
