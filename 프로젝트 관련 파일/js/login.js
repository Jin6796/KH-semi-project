// 로그인 시키는 코드
$("#login").click(function () {
  const email = $("#email").val();
  const pw = $("#pw").val();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .then((result) => {
      console.log(result.user);
    });
});

// 로그아웃 시키는 코드
$("#logout").click(function () {
  firebase.auth().signOut();
});
