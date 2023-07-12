const memberNickname = document.getElementsByName("memberNickname")[0];
const memberTel = document.getElementsByName("memberTel")[0];

const regExp = /^([a-z]|[A-Z]|[0-9]|[가-힣]){2,10}$/;
const regExp2 = /^[0-9]{10,11}$/;

document.getElementById("info-update-btn").addEventListener("click", function(){

    // 닉네임
    if(memberNickname.value.trim().length == 0){
        alert("닉네임을 입력해주세요.");
    }

    if(memberNickname.value.trim().length != 0 && !regExp.test(memberNickname.value)){
        alert("닉네임은 영어/숫자/한글 2~10 글자 사이로 작성해주세요.");
    }

    // 전화번호
    if(memberTel.value.trim().length == 0){
        alert("전화번호를 입력해주세요.(- 제외)");
    }

    if(memberTel.value.trim().length != 0 && !regExp2.test(memberTel.value)){
        alert("전화번호 형식이 올바르지 않습니다.");
    }
})

function myPageValidate(){
    if(memberNickname.value.trim().length == 0 | !regExp.test(memberNickname.value)
        | memberTel.value.trim().length == 0 | !regExp2.test(memberTel.value)){
            return false;
        }
}