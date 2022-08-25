// 가입 버튼 누르면 실행 - 테스트시 비번 반드시 6자리 이상 입력해야 함
// 그리고 Firebase Console에서 Authentication에 Users탭에서 가입한 정보 확인 가능함
$("#register").click(function () {
  // 사용자가 입력한 이메일 과 비번
  const name = $("#mem_name").val();
  const email = $("#mem_email").val();
  const pw = $("#mem_pw").val();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .then((result) => {
      console.log(result);
      console.log(result.user);
      result.user.updateProfile({ displayName: name }).then((displayName) => {
        console.log("user name info: " + displayName);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
