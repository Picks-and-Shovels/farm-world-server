## 개발 프로세스
1. Github Issues에 이슈 생성
2. 이슈에 맞는 브랜치 생성
3. 브랜치에서 작업
4. 작업 완료 후 Pull Request 생성
5. Pull Request에 맞는 리뷰 진행
6. 리뷰 완료 후 Merge


## API 원칙
- [ ] HTTP API를 따른다.
- [ ] 포맷은 JSON을 사용한다.

## API spec

### User API

```typescript
User {
    id: number;
    email: string;
    password: string;
    nickname: string;
    createdAt: Date;
    updatedAt: Date;
    farm: Farm;
}
```
- POST /user/account/signup : 회원가입

- POST /user/account/auth : 로그인

- POST /board/categories : 카테고리 생성

- GET /board/categories : 카테고리 목록

### Board API

```typescript
Board {
    id: number;
    title: string;
    content: string;
    writer: User;
    category: Category;
    tags: Tag[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
```

- POST /board/posts : 게시글 작성 (사진 첨부 가능)

- GET /board/posts : 게시글 목록 가져오기. option(tag, title, writer) 에 따라 검색도 가능하게 구현

- GET /board/posts/{post_id} : 게시글 상세

- PATCH /board/posts/{post_id} : 게시글 수정

- DELETE /board/posts/{post_id} : 게시글 삭제

- GET /board/posts/{post_id}/comments : 게시글의 댓글 목록

- POST /board/posts/{post_id}/comments : 댓글 작성

- PATCH /board/posts/{post_id}/comments/{comment_id} : 댓글 수정

- DELETE /board/posts/{post_id}/comments/{comment_id} : 댓글 삭제

### Avatar API (이부분은 백엔드가 필요할지 몰라서 일단 보류)

### Farm API
    
```typescript
Farm {
    id: number;
    name: string;
    description: string;
    owner: User;
    createdAt: Date;
    updatedAt: Date;
    fields: Field[];
}

Field {
    id: number;
    name: string;
    plantType: string;
    farmDiary: FarmDiary[];
}

FarmDiary {
    id: number;
    date: Date;
    content: string;
    weather: string;
}
```

- GET /farm/{farm_id}: 농장 상세 정보 가져오기

- PATCH /farm/farms/{farm_id} : 농장 수정
- DELETE /farm/farms/{farm_id} : 농장 삭제

- POST /farm/fields : 농장에 밭 추가
- PATCH /farm/fields/{field_id} : 밭 수정
- DELETE /farm/fields/{field_id} : 밭 삭제

- POST /farm/{field_id}/farmDiary : 농장 일지 작성 (사진 첨부 필수)
- PATCH /farm/{field_id}/farmDiary/{farmDiary_id} : 농장 일지 수정
- DELETE /farm/{field_id}/farmDiary/{farmDiary_id} : 농장 일지 삭제


<strong>실제 구현된 API는 swagger로 문서화되어 `{server address}/api/docs`에서 볼 수 있음. </strong>