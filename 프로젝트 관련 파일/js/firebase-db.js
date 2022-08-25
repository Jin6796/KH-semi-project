// Database에서 데이터 가져오기
//작성 후 Firebase Database에서 규칙 옵션을 true로 변경 한 후 게시버튼 클릭한다
const db = firebase.firestore();
db.collection("classes")
  .get()
  .then((snapshot) => {
    //console.log(snapshot);
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });

// Database에서 데이터 저장하기

db.collection("product").doc("상품3").set({ 제목: "농구공", 가격: 1500 });

// 전송 버튼 누르면 데이터 저장하기
// set으로 추가하면 문서 이름 내가 결정 가능함
//db.collection("product").doc("상품3").set({ 제목: "농구공", 가격: 1500 });
// 아래 add로 추가하면 문서 파일 명이 자동으로 부과됨
//db.collection("product").add({ 제목: "플스5", 가격: 25000 });
$("#send").click(function () {
  const pt = {
    코치명: $("#코치명").val(),
    수업유형: $("#수업유형").val(),
    수강료: parseInt($("#price").val()),
    날짜: getFullYmdStr(),
  };
  db.collection("classes")
    .add(pt)
    .then((result) => {
      //성공 후 실행 할 코드
      console.log(result); // 저장한 자료의 아이디나 이름들이 담겨 온다
      window.location.href = "./index.html";
    })
    .catch((error) => {
      // 실패 후 실행 할 코드
      console.log(error);
    });
});

// storage에 이미지 업로드 하기
const file = document.querySelector("#image").files[0];
const storageRef = storage.ref();
const storagePath = storageRef.child("image/" + file.name);
// 잠깐 반드시 Storage가서 Rules에 true를 준다 - 누구나 사용할 수 있게
const uploadImg = storagePath.put(file);

uploadImg.on(
  "state_changed",
  // 변화시 동작하는 함수
  null,
  //에러시 동작하는 함수
  (error) => {
    console.error("실패사유는", error);
  },
  // 성공시 동작하는 함수
  () => {
    uploadImg.snapshot.ref.getDownloadURL().then((url) => {
      console.log("업로드된 경로는", url);

      const pt = {
        코치명: $("#코치명").val(),
        수업유형: $("#수업유형").val(),
        수강료: parseInt($("#price").val()),
        이미지: url,
        날짜: getFullYmdStr(),
      };
      db.collection("classes")
        .add(pt)
        .then((result) => {
          //성공 후 실행 할 코드
          console.log(result); // 저장한 자료의 아이디나 이름들이 담겨 온다
          window.location.href = "./index.html";
        })
        .catch((error) => {
          // 실패 후 실행 할 코드
          console.log(error);
        });
    });
  } ////////////////// end of 성공시 동작 함수
);

// 데이터 수정하기
const queryString = new URLSearchParams(window.location.search);
console.log(queryString.get("id"));

db.collection("product")
  .doc(queryString.get("id"))
  .get()
  .then((result) => {
    console.log(result.data());
    $("#title").val(result.data().제목);
  });

// 수정하기 처리
$("#send").click(function () {
  const change = {
    제목: $("#title").val(),
  };
  db.collection("product").doc(queryString.get("id")).update(change);
});
