// firebase 데이트 끌어오기
const firebaseConfig = { // 개인 key 값
  apiKey: "AIzaSyAHLI5OD2wSYxiJYlMvJuiW8bK2xj6CaSk",
  authDomain: "kh-terrgym.firebaseapp.com",
  databaseURL: "https://kh-terrgym-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kh-terrgym",
  storageBucket: "kh-terrgym.appspot.com",
  messagingSenderId: "427262482569",
  appId: "1:427262482569:web:f89f88f3c2339ec8bf4e58"
};
firebase.initializeApp(firebaseConfig);

dbtable();

//전체레코드 갯수
class PageBar {
  totalRecord;
  numPerPage; // 10개씩
  pagePerBlock = 5;
  totalPage;
  totalBlock;
  nowPage;
  nowBlock;
  pagePath;
  pagination;
  constructor(numPerPage, totalRecord, nowPage, pagePath) {
    this.numPerPage = numPerPage;
    this.totalRecord = totalRecord;
    this.nowPage = nowPage;
    this.pagePath = pagePath;
    this.totalPage = Math.ceil(this.totalRecord / this.numPerPage); // 47.0/10=> 4.7 4.1->5page 4.2->5page
    this.totalBlock = Math.ceil(this.totalPage / this.pagePerBlock); //5.0/2=> 2.5-> 3장
    this.nowBlock = Math.floor(this.nowPage / this.pagePerBlock);
  }
  //setter메소드 선언
  setPageBar() {
    console.log("nowBlock:" + this.nowBlock);
    let pageLink = "";
    if (this.totalRecord > 0) {
      if (this.nowBlock > 0) {
        pageLink +=
          "<a href='" +
          this.pagePath +
          "?nowPage=" +
          ((this.nowBlock - 1) * this.pagePerBlock + (this.pagePerBlock - 1)) +
          "'>";
        pageLink += "<img border=0 src='./images/bu_a.gif'>";
        pageLink += "</a>&nbsp;&nbsp;";
      }
      for (let i = 0; i < this.pagePerBlock; i++) {
        //현재 내가 보고 있는 페이지 블록 일때
        if (this.nowBlock * this.pagePerBlock + i == this.nowPage) {
          pageLink +=
            "<b>" + (this.nowBlock * this.pagePerBlock + i + 1) + "</b>&nbsp;";
        }
        //그렇지 않을 때
        else {
          pageLink +=
            "<a href='" +
            this.pagePath +
            "?nowPage=" +
            (this.nowBlock * this.pagePerBlock + i) +
            "'>" +
            (this.nowBlock * this.pagePerBlock + i + 1) +
            "</a>&nbsp;";
        }
        if (this.nowBlock * this.pagePerBlock + i + 1 == this.totalPage) break;
      }
      if (this.totalBlock > this.nowBlock + 1) {
        pageLink +=
          "&nbsp;&nbsp;<a href='" +
          this.pagePath +
          "?nowPage=" +
          (this.nowBlock + 1) * this.pagePerBlock +
          "'>";
        pageLink += "<img border=0 src='/images/bu_b.gif'>";
        pageLink += "</a>";
      }
    }
    this.pagination = pageLink;
  }
  //getter메소드 선언
  getPageBar() {
    this.setPageBar();
    return this.pagination;
  }
}

function dbtable() {
  const db = firebase.firestore();
  let num = 0;
  let total = 0;
  let numPerPage = 10;
  let nowPage = 0;
  let param = new URLSearchParams(document.location.search);
  nowPage = param.get("nowPage");

  db.collection("members")
    .orderBy("mem_name")
    .get()
    .then((snapshot) => {
      console.log(snapshot);

      console.log(JSON.stringify(snapshot));
      total = snapshot.docs.length;
      console.log("전체 회원 수: " + total);
      for (
        let i = nowPage * numPerPage;
        i < nowPage * numPerPage + numPerPage;
        i++
      ) {
        if (total === i) break;
        num = i;

        const template=`
                      <tr>
                        <th scope="row">${++num}</th>
                        <td><a href="./manager_member_read.html?id=${snapshot.docs[i].id}" data-bs-toggle="modal">
                            ${snapshot.docs[i].data().mem_name}</a></td>
                        <td>${snapshot.docs[i].data().mem_phone}</td>
                        <td>${snapshot.docs[i].data().mem_branch}</td>
                      </tr>
          `
          $(".table-group-divider").append(template);
        } //데이터 넣기
      $(".pagination").append("");
      /*페이지 네비게이션 처리 위치*/
      const pagePath = "manager_member.html";
      const pb = new PageBar(numPerPage, total, nowPage, pagePath);
      // out.print(pb.getPageBar()); class PageBar에서 생성되는 링크
      $(".pagination").append(pb.getPageBar());
    });
}
function searchList() {
  const choice = $("#gubun option:selected").val();
  const user = $("#keyword").val();
  alert("검색: " + choice + ", " + user);

  let num = 0;
  let total = 0;
  let numPerPage = 10;
  let nowPage = 0;
  let param = new URLSearchParams(document.location.search);
  nowPage = param.get("nowPage");

  db.collection("members")
    .where(choice, "==", user).orderBy("mem_branch")
    .get().then((snapshot) => {
      total = snapshot.docs.length;
      if(total>0){
        $(".table-group-divider").text("")
      }
      console.log("전체 회원 수==>" + total);
      for (let i = nowPage * numPerPage; i < (nowPage * numPerPage) + numPerPage; i++){
        if (total === i) break;
        num = i;
        const template=`
                        <tr>
                            <th scope="row">${++num}</th>
                            <td><a href="./manager_member_read.html?id=${snapshot.docs[i].id}" data-bs-toggle="modal">
                                ${snapshot.docs[i].data().mem_name}</a></td>
                            <td>${snapshot.docs[i].data().mem_phone}</td>
                            <td>${snapshot.docs[i].data().mem_branch}</td>
                        </tr>
        `
        $(".table-group-divider").append(template);
      }

      $(".pagination").text("")
        /* 페이지 네비게이션 처리 위치 */
        const pagePath = "list.html"
        const pb = new PageBar(numPerPage, total, nowPage, pagePath)
        //console.log(pb.getPageBar()) class PageBar에서 생성되는 링크 출력해봄
        $(".pagination").append(pb.getPageBar())
    })
}

