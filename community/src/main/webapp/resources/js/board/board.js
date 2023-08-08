// 상세조회 - 목록으로 버튼

(function(){
    const goToListBtn = document.getElementById("goToListBtn");

    if(goToListBtn != null){ // 목록으로 버튼이 화면에 있을 때만 이벤트 추가

        goToListBtn.addEventListener("click", function(){
            
            // location 객체(BOM)

            // 문자열.substring(시작, 끝) : 시작 이상 끝 미만 인덱스까지 문자열 자르기

            // 문자열.indexOf("검색 문자열", 시작 인덱스)
            // : 문자열에서 "검색 문자열"의 위치(인덱스)를 찾아서 반환
            //   단, 시작 인덱스 이후부터 검색

            const pathname = location.pathname; // 주소상에서 요청 경로 반환
            //    /community/board/detail

            // 이동할 주소 저장
            let url = pathname.substring(0, pathname.indexOf("/", 1));
            //  /community

            url += "/board/list?"; //  /community/board/list?

            // URL 내장 객체 : 주소 관련 정보를 나타내는 객체
            // location.href : 현재 페이지 주소 + 쿼리스트링
            // URL.searchParams : 쿼리 스트링만 별도 객체로 반환
            
            // http://localhost:8080/community/board/detail?no=465&cp=4&type=1
            const params = new URL(location.href).searchParams;

            const type = "type=" + params.get("type"); // type=1
            let cp;
            
            if(params.get("cp") != ""){ // 쿼리스트링에 cp가 있을 경우
               cp = "cp=" + params.get("cp");
            } else{
                cp = "cp=1";
            }

            // 조립
            // /community/board/list?type=1&cp=1
            url += type + "&" + cp;

            // 검색 key, query가 존재하는 경우 url 추가
            if(params.get("key") != null){
                const key = "&key=" + params.get("key");
                const query = "&query=" + params.get("query");

                url += key + query; // url 뒤에 붙이기
            }

            // location.href = "주소"; -> 해당 주소로 이동
            location.href = url;
        });

    }

})();

// 즉시 실행 함수 : 성능 up, 변수명 중복 X
(function(){

    const deleteBtn = document.getElementById("deleteBtn"); // 존재하지 않으면 null

    if(deleteBtn != null){ // 버튼이 화면에 존재할 때
        deleteBtn.addEventListener("click", function(){
            // 현재 : detail?no=1562&cp=1&type=1

            // 목표 : delete?no=1562&type=1

            let url = "delete"; // 상대경로 형식으로 작성

            // 주소에 작성된 쿼리스트링에서 필요한 파라미터만 얻어와서 사용

            // 1) 쿼리스트링에 존재하는 파라미터 모두 얻어오기
            const params = new URL(location.href).searchParams;

            // 2) 원하는 파라미터만 얻어와서 변수에 저장
            const no = "?no=" + params.get("no"); // ?np=1562

            const type = "&type=" + params.get("type"); // &type=1

            // url에 쿼리스트링 추가
            url += no + type; // delete?no=1562&type=1

            if(confirm("정말로 삭제하시겠습니까?")){
                location.href = url; // get방식으로 url에 요청
            }
        })
    }
})();


// 검색창에 이전 검색 기록 반영하기
(function(){
    const select = document.getElementById("search-key");

    const input = document.getElementById("search-query");

    // const option = select.children;
    const option = document.querySelectorAll("#search-key > option");

    if(select != null){ // 검색창 화면이 존재할 때만 코드 적용

        // 현재 주소에서 쿼리스트링(파라미터) 얻어오기
        const params = new URL(location.href).searchParams;

        // 얻어온 파라미터 중 key, query만 변수에 저장
        const key = params.get("key");
        const query = params.get("query");
        
        // input에 query값 대입
        input.value = query;

        // option을 반복 접근해서 value와 key와 같으면 selected 속성 추가
        for(let op of option){
            if(op.value == key){
                op.selected = true;
            }
        }
    }
})();

// 검색 유효성 검사(검색어를 입력했는지 확인)
function searchValidate(){

    const query = document.getElementById("search-query");

    if(query.value.trim().length == 0){ // 미작성
        query.value = ""; // 빈칸
        query.focus();

        return false;
    }

    return true;
}