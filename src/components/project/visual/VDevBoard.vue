<template>
  <div id="devBoard">
      ㅇㅎㅇㅇㅎ
    <div id="background">
        ㅇㅎㅇㅇㅎㅎㅇ
        <div id="talkTable">
ㅎㅇㅎㅎㅇㅎㅇ
        </div>
    </div>    
  </div>
</template>

<script>
export default {
    name : "VDevBoard",
    created() {
        if(this.pjType == "V") {
            // 데이터 불러오기의 시작점.
            // 기존 프로젝트 데이터 가져오는 코드 작성할 것.
        }
    },
    data() {
        return {
            
        }
    },
    methods : {

    },
    props : {
        pjType : String,
        VpjCode : String
    }
}
</script>

<style>

#devBoard {
    background-color: rgb(218, 205, 205);
}

#background {
    background-color: white;
}

#talkTable {
    background-color: grey;
    opacity: 3;
}
</style>