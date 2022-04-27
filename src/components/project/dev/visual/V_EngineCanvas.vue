<template>
    <div class="ViewerBackground">
    <!-- 백그라운드 -->
    <!-- 내부 img태그의 src를 가공하여 사용, -->
    <!-- 자동으로 늘어나고 줄어듦. 화면 스케일에 맞게 조정 -->
    <div class="SceneBackground">
      <img src="@/assets/background.jpg" />
    </div>
    
    <!-- 백그라운드 끝. -->

    <!-- 선택지 -->

    <!-- 필요한곳에 주석을 해제하고 사용. -->
    <!-- SceneSelectBackground는 선택문이 화면상에 출력되었을때 뒤에 검은 배경을 깔아줌. -->
    <!-- SceneSelectBFrame은 중앙 위치를 잡는 용도. -->
    <!-- SelectButton을 추가할수록 더 많은 선택지를 자동으로 배치함. 3개 이상의 선택문 추가 가능.-->

    <div class="SceneSelectBackground" v-if="status == 'select'">
      <div class="SceneSelectFrame">
        <div class="SelectButton" v-if="s.task1.text.length!=0" @click="move(s.task1.plot, s.task1.index)"><span>{{s.task1.text}}</span></div>
        <div class="SelectButton" v-if="s.task2.text.length!=0" @click="move(s.task2.plot, s.task2.index)"><span>{{s.task2.text}}</span></div>
        <div class="SelectButton" v-if="s.task3.text.length!=0" @click="move(s.task3.plot, s.task3.index)"><span>{{s.task3.text}}</span></div>
      </div>
    </div>

    <!-- 선택지 끝. -->

    <!-- 일시정지(PAUSE) 메뉴 -->

    <div class="ScenePauseBackground" v-if="status == 'pause'">
      <div class="VisualNovelLabel">
        <div class="VisualNovelIcon"><img src="@/assets/sample.png"></div>
        <span class="VisualNovelName">소설 제목</span>
      </div>

      <div class="PauseMenusFrame">
        <div class="PauseMenuButtonPosition">
          <div class="PauseMenuButton">
            <span><img src="@/assets/icons/white/editing.png"></span>
          </div>

          <div class="PauseMenuButton">
            <span><img src="@/assets/icons/white/gear.png"></span>
          </div>

          <div class="PauseMenuButton">
            <span><img src="@/assets/icons/white/redo.png"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 일시정지(PAUSE) 메뉴 끝. -->

    <!-- 저장 슬롯 메뉴 -->

    <div class="SceneSaveBackground" v-if="status == 'save'">
      <span>저장</span>
      <div class="SaveSlotsFrame">
        <div class="SaveSlot"></div>
        <div class="SaveSlot"></div>
        <div class="SaveSlot"></div>
      </div>
    </div>

    <!-- 저장 슬롯 메뉴 끝. -->

    <!-- 좌측 상단 햄버거메뉴 -->
    <!-- 모바일 환경에서만 나올건지". PC에서도 반응형으로 제공할지는 선택 -->
      <div class="ViewerNav">
        <img src="@/assets/icons/white/align_left.png" />
      </div>
      <!-- 이미지 -->

      <!-- 내부 img태그의 src를 가공하여 사용, -->
      <!-- 자동으로 늘어나고 줄어듦. 화면 스케일에 맞게 조정 -->
      <div class="SceneImg"> <!--이새끼 문제-->
        <img :src="Now.img" v-if="Now.img!=''"/>
      </div>

      <!-- 이미지 끝. -->
      <!-- 대사 -->
      <div class="SceneScriptFrame"> <!-- 이새끼도 문제 -->
        <!-- 대사창 배경-->
        <div class="ScriptBackground"></div>

        <!-- 대사창 툴바 -->
        <div class="ScriptToolBar">
          <div class="ToolBarEl" @click="uploadJSON()">JSON 업로드</div>
          <div class="ToolBarEl" @click="getJSON()">JSON 불러오기</div>
          <div class="ToolBarEl">빨리감기</div>
          <div class="ToolBarEl">백로그</div>
        </div>

        <!-- 화자 -->
        <div class="SceneSpeakerName">
          <span>{{Now.name}}</span>
        </div>

        <!-- 대사 -->
        <div class="SceneScript">
          <span>{{ Now.text }}</span>
        </div>

        <!-- 다음 대사 버튼 -->
        <div class="NextScriptButton" @click="nextScene">
          <button>▶</button>
        </div>
      </div>
      <!-- 대사 끝 -->
    </div>
    <!-- <button @click="nextScene">click</button> -->
  <!-- 전체 끝 -->
</template>

<script>
import storage from '../../../../aws'
import axios from '../../../../axios'
export default {
    name : "VDevBoard",
    created() {
        this.pjCode = this.$route.params.pjCode;
        this.getPjInfo(this.pjCode);
    },
    watch : {
        $route() {
          this.getPjInfo(this.pjCode);
        }
    },
    data() {
        return {
            pjType : "",
            pjCode : "",
            title : "",
            retouchDate : "",
            stat : "",

            Now: {
                bg: "",
                bgm: "",
                name: "",
                text: "",
                img: "",
                move: false
            },
            s:{
                task1:{},
                task2:{},
                task3:{}
            },
            status: "play", // play, select, pause,
            position: {
                plot: "시작",
                index: 0,
            },
            scenario: {
                시작: [
                {
                    bg: "",
                    bgm: "",
                    name: "엄병석",
                    text: "훗",
                    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhAPEA8PEBAPEA8PDw8PDw8NDw8PFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFQ8PFSsdFRkrLSsrLSsrKysrKy0tLTctLTctKy03Ky0tNysrLSstKy0tLTctKysrKysrKysrKysrK//AABEIAOAA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUHBgj/xAAzEAACAQMCBAQEBgEFAAAAAAAAAQIDBBEFIQYSMVEHE0FhInGRoRQyM0JSgbEVFiRDcv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHREBAQEBAAMBAQEAAAAAAAAAAAERAgMSITETQf/aAAwDAQACEQMRAD8A9+hebr7DSrqtyqVGpN7csTi5uMeKGturXdOMvhjs17ng2XtauPMrVZ5zzTk0UMnSNQBkBCqUBAAUchqHBKBUICIhwqYgoRbtb6cHsz2mgcRKSUan1PAIt2smnsajNjrsK8ZLMZL2Pe8G6h5kHCTy4/c4NpmoyWFlnQODNZ5KsU3tJ7kpHXYisjpTysro0PyZUNgDYjQCNgAoCgwyIAgjFEZAgo3IoGLFHk/Ee+8q0qRe3OsI9Zk5X4z3T5aUE/XdCK5JNjQA22AAAAAABRcjRUAZFQgqAVMcNFRGacizQeCsiSEhrNatvM39JunFp9sHmbWobdrv0Kj6D4Uv1WoQaecJJmyc58L9Q2dH16nR0RTWhwAyBGIxRoAGQDIAIKIQGAAAMJHDfFm/57l0k/ybnbq8uWMpdotnzjxndebdVZ5zvj6FjUYQABpoCgACCgACCgAAAAA4AAiHi5GociMn0qmDZ0u+WcGIS20sSQR03hfUHRqwlF/maT+R262rc0YyXRpHzbpd9jB3PgfUFVoRjnLilnuWpHpkAiAihiAxGAoCAQKIDGgOAaAHk9fuVToVJP8AjJfY+aL2pzTm+8pP7nevE+4dOym13wfP8nuXlrkgABpoCiAAoAAAAAAAgABwCIXAQqY+KI0SxRMZqSMB8aYtOJNGBcY1csZYwdW8L9V5Zuk/34wcloPDPV8Lai6NWEl3QsJX0NkCvZVlKnGXrKKf2JsmWgwARkAmKIACMaOGgABkCjkfi5cf8Vx90cTZ6DiHiWtdLlnJtdjz5Y3yQAAqgAABQEABQEABQEABUOTGDkA5EsZohRLThH1eBGKs06qJ4VMlVU4fz+w+GF0eSsLcJbmtY1cNPtgxqOWW6U5L0+4qPoXgu+863jLO6xH6I9Cjh3DXG7sYYlHmj/g9npXiZbVfztQMWNx7/IrZg2XFFrW/JVTZrQrxe6knn3IJxUIgAGMYrY1gGQEEA+RtTa53joUxzn3Fyjbc+GAPSXcd5a7jV1EBMqGejHfhWNTYrgWfwzH07Rk01UwLyl+NkTwsSs3tlKm2SRtZP0NqnZ49CxTtR9T3YsdOkWqejtm5Rt0W6VIJemLS0KON8l234epPrn6mtCkW6VNFxNZceGqPYR8MUn3+pvwiiZRQHl/9r0+8vqLLh1JbN592epXKJLlA8nU0eootSw4+mOpQWh9spnuW4d0V5zpJ7tEweVtdPrU/yVJL+z0Gl6te28k+dyXvlktS5orpv8txbec6r5KdOTb7rCCujcNcUOtywqfmZ6xHhOFuGqsJKrV+FrdJHuIsyp0huQbGkC5AQUD5c1jTKVOtUpxi8RlhGRdWco7+h7biyxcLmTfSTbMLUILBynkuu3r8ebLNtbuRHOG5p2NLY7ddZGf1ErB9wdlPua0aY/yjj71r0YrtKncFCqumDZlRGKkbnTPqy4TrL0JI3NVftNOMPYc6XsX3T1Zn+o1F+0fDVZr9jLM6Ix0PYe56CGttfsZJHX8fsZWdH2Edv7D+iejSXE6xjkYsOJn6QZl/h/Ylp2/sP6H82m+JJvpBjZa5cP8AKsEEKJYp0h/Q/mi/1a6Zc05XVxONNVFHm9WNVI0tDWKsGu6E7W8PQ0vDS7lhyuY4e+N+hsWXhrTX6s3L5NnubJ/BF+yJma1jHmbHgWypPmUG37vKPQULOlBYjCK98ImAB2dsCZEABQEEIFyAmQA5f4i6dmKrYxyo5lW+LKO1cZ2rq28kllrc43cUXzPHoefr9enj7GVK3fNk0bWlhDIRbeGvUu0oi9avrEsIEqpiQRPFGdaxC6QKgWUh8ImpU9VR0MDHA0uQinSLrNimqQ10S24YIaskvUamKlSmkQpi1q6bxklo0si1ZDVAlhTLEbd9gVPHUmmEhRJIQJoLJIqY1cQRgXNKWKsfmiPkNHh+hzV4LHqXlOnYbD9OP/lE5DQWIpdkiZM7xwAgZEZKhQyIIwFYmRBAgAAAyK9PmjKPdNHJtb07yK0ljbOTr3l/BGSeU1u+zPGcY6ROS82Kz6s59z47cVzydNZbSIy1Wg11TXzK0ji7SpISLUGU4lmEiKniSQIYskixqp0LyZGQJYs3KzYq11jJjXcm3g3K8c5Me6ptNMlqYdbWcV8TNChKHRYMi5nKaxF4GWdCcXu2FelTRBcRTKUqksbENvOWd2/kNGlRjgsoipIkJq4Gem4Hseeqqn8DzDZ0fgm15afP/PBvlz8n49Sh2RiYZOzgfkTI1MGyoc5CZGtgiBWxMiZABcgIARm8NXNOpSlDOXH09ehnzvsycPLk1lrGDJ8OrjmuHHvnJd4j4rla3M6NOhSfLvzSeGasWU2twzTuG3KhKL+hzLiKzVvXnSSxy+nY6fbcc3Mv+qkvlI5fxZdSq3VSpJJOXXDyjj5Mx141UgWKZUhItUzg7ROh8BsSRINHwJSKCJCiOZXq0sk05bjcgVfwxNCiSAngGGOigjSSHOSBNMCWkPIYywTR7gTWNPnqQj3Z1vTrfyoRh2SObcK2jqV4v0judRz0R28c+PP5b9OQogHRyOATINhCgJkTIXSoBBMhDhRmQA5b4X3q/GLfqin4u206d3Kqm0p4wY/BF2oXNNp7uSX3PWeOUcRoy74NjmtDUKi6Sf1Y+dVy3byzJpT3RpQOHkduFinULtGWxmJFqjVwcHVpwkSplOlULEZlalWIjmQRkP5g0Y2NdWK6jajM66YTVutfRXQqVblvoymqe5N5BuQkOd08bhG+aGOkh9CgsiwsadtUckXae23cq0UopG7w/p7r1Onwp9RI52vWcF6byQ8yS+J9PkeqiiC1oqEVFeiwTpnWOFuniDci5NMlyKMyLkBwYG5DICgJkaWIfgQbkAPnXhvKuKT6Lnj/AJOgeNt5TnC3hGScoqPNh5xscihfzj+V4foxla4rVn8Up1H7ts2s5SQaysPO5rUjNtbBr4n9DTpI83ls/wAduIWYkWSuJG44ODos0qhZVQzoMmjMouxrEsapnc5LCYXVqcilcLPQlcgUclTWc1JDvOfYvOmhPKia1r2VYc0i/bU+XqEIpD3ssl+p10v2FrOvNQguvX5HT+HtIjbwS25vVnKtG11UJ5XU9zpPGMJfqf1g7c+O5rzdd/49ohclG11KlUSakt/ctZNerGpMi5GJjskU7Icw0AFyKMFyVDkwY1MXIBgAyA0fOGkcLyqJTqvkj1S9i/cUqVH4acVnpnubF5ebYWyX9GHX+J5PP15LXp9cVX/kkhEOUkgjlapygMqUyxEJxyFUWhIyJ50iGVMCSEh8JYK2RVUKi9CqmJUmVVUHxlkBzmwUmIOjAsVJTq9yw/iiyjeLkpuYtlcZitz1eHnXDydM28g4tkljqLi92XNSoJrKMKpserMef9e307W2sYl79T2GlcUv97ytupxyjctbpmnaapJMlkp+O72Wt0qn7kmaamn0aZxSx1f3+56TTeIpxxh5+5zvja10jIuTE03XKdRfE1F+5sRkmsrdHOzGjwY1MczIMgIBQoogAcFrTyyFxJGLynjx6ldxJIQFwPihgVRHOIo8qahlArTgXmiNxGLrOlEjaL06Q3yEUUtxYplxW6JY0URFajB+pchEdGmOUSz9FLXP0WvkZVlUeEWeIK2UombbTwj2+L5Hn8jdoVlNNGXf2+GyG1uGp/2alzHmjk765fjBew+nIdXhuQ5I1+te0rY9TatLrGNzy1KtgmV6+5qVMe2o3rW/3Ru6fxNOGFzN9Nmc5ttSa6s17e5UlkXmUdb0nXoVdns2bWTi1O/dNppnu+FuJo1F5c5b9E2cOuMaleuyKMi9si5OanZAbkAP/9k=",
                    anime: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    ],
                    move: {
                    plot: "시작",
                    index: 1,
                    },
                },
                {
                    bg: "",
                    bgm: "",
                    name: "엄준식",
                    text: "안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?",
                    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhAPEA8PEBAPEA8PDw8PDw8NDw8PFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFQ8PFSsdFRkrLSsrLSsrKysrKy0tLTctLTctKy03Ky0tNysrLSstKy0tLTctKysrKysrKysrKysrK//AABEIAOAA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUHBgj/xAAzEAACAQMCBAQEBgEFAAAAAAAAAQIDBBEFIQYSMVEHE0FhInGRoRQyM0JSgbEVFiRDcv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHREBAQEBAAMBAQEAAAAAAAAAAAERAgMSITETQf/aAAwDAQACEQMRAD8A9+hebr7DSrqtyqVGpN7csTi5uMeKGturXdOMvhjs17ng2XtauPMrVZ5zzTk0UMnSNQBkBCqUBAAUchqHBKBUICIhwqYgoRbtb6cHsz2mgcRKSUan1PAIt2smnsajNjrsK8ZLMZL2Pe8G6h5kHCTy4/c4NpmoyWFlnQODNZ5KsU3tJ7kpHXYisjpTysro0PyZUNgDYjQCNgAoCgwyIAgjFEZAgo3IoGLFHk/Ee+8q0qRe3OsI9Zk5X4z3T5aUE/XdCK5JNjQA22AAAAAABRcjRUAZFQgqAVMcNFRGacizQeCsiSEhrNatvM39JunFp9sHmbWobdrv0Kj6D4Uv1WoQaecJJmyc58L9Q2dH16nR0RTWhwAyBGIxRoAGQDIAIKIQGAAAMJHDfFm/57l0k/ybnbq8uWMpdotnzjxndebdVZ5zvj6FjUYQABpoCgACCgACCgAAAAA4AAiHi5GociMn0qmDZ0u+WcGIS20sSQR03hfUHRqwlF/maT+R262rc0YyXRpHzbpd9jB3PgfUFVoRjnLilnuWpHpkAiAihiAxGAoCAQKIDGgOAaAHk9fuVToVJP8AjJfY+aL2pzTm+8pP7nevE+4dOym13wfP8nuXlrkgABpoCiAAoAAAAAAAgABwCIXAQqY+KI0SxRMZqSMB8aYtOJNGBcY1csZYwdW8L9V5Zuk/34wcloPDPV8Lai6NWEl3QsJX0NkCvZVlKnGXrKKf2JsmWgwARkAmKIACMaOGgABkCjkfi5cf8Vx90cTZ6DiHiWtdLlnJtdjz5Y3yQAAqgAABQEABQEABQEABUOTGDkA5EsZohRLThH1eBGKs06qJ4VMlVU4fz+w+GF0eSsLcJbmtY1cNPtgxqOWW6U5L0+4qPoXgu+863jLO6xH6I9Cjh3DXG7sYYlHmj/g9npXiZbVfztQMWNx7/IrZg2XFFrW/JVTZrQrxe6knn3IJxUIgAGMYrY1gGQEEA+RtTa53joUxzn3Fyjbc+GAPSXcd5a7jV1EBMqGejHfhWNTYrgWfwzH07Rk01UwLyl+NkTwsSs3tlKm2SRtZP0NqnZ49CxTtR9T3YsdOkWqejtm5Rt0W6VIJemLS0KON8l234epPrn6mtCkW6VNFxNZceGqPYR8MUn3+pvwiiZRQHl/9r0+8vqLLh1JbN592epXKJLlA8nU0eootSw4+mOpQWh9spnuW4d0V5zpJ7tEweVtdPrU/yVJL+z0Gl6te28k+dyXvlktS5orpv8txbec6r5KdOTb7rCCujcNcUOtywqfmZ6xHhOFuGqsJKrV+FrdJHuIsyp0huQbGkC5AQUD5c1jTKVOtUpxi8RlhGRdWco7+h7biyxcLmTfSTbMLUILBynkuu3r8ebLNtbuRHOG5p2NLY7ddZGf1ErB9wdlPua0aY/yjj71r0YrtKncFCqumDZlRGKkbnTPqy4TrL0JI3NVftNOMPYc6XsX3T1Zn+o1F+0fDVZr9jLM6Ix0PYe56CGttfsZJHX8fsZWdH2Edv7D+iejSXE6xjkYsOJn6QZl/h/Ylp2/sP6H82m+JJvpBjZa5cP8AKsEEKJYp0h/Q/mi/1a6Zc05XVxONNVFHm9WNVI0tDWKsGu6E7W8PQ0vDS7lhyuY4e+N+hsWXhrTX6s3L5NnubJ/BF+yJma1jHmbHgWypPmUG37vKPQULOlBYjCK98ImAB2dsCZEABQEEIFyAmQA5f4i6dmKrYxyo5lW+LKO1cZ2rq28kllrc43cUXzPHoefr9enj7GVK3fNk0bWlhDIRbeGvUu0oi9avrEsIEqpiQRPFGdaxC6QKgWUh8ImpU9VR0MDHA0uQinSLrNimqQ10S24YIaskvUamKlSmkQpi1q6bxklo0si1ZDVAlhTLEbd9gVPHUmmEhRJIQJoLJIqY1cQRgXNKWKsfmiPkNHh+hzV4LHqXlOnYbD9OP/lE5DQWIpdkiZM7xwAgZEZKhQyIIwFYmRBAgAAAyK9PmjKPdNHJtb07yK0ljbOTr3l/BGSeU1u+zPGcY6ROS82Kz6s59z47cVzydNZbSIy1Wg11TXzK0ji7SpISLUGU4lmEiKniSQIYskixqp0LyZGQJYs3KzYq11jJjXcm3g3K8c5Me6ptNMlqYdbWcV8TNChKHRYMi5nKaxF4GWdCcXu2FelTRBcRTKUqksbENvOWd2/kNGlRjgsoipIkJq4Gem4Hseeqqn8DzDZ0fgm15afP/PBvlz8n49Sh2RiYZOzgfkTI1MGyoc5CZGtgiBWxMiZABcgIARm8NXNOpSlDOXH09ehnzvsycPLk1lrGDJ8OrjmuHHvnJd4j4rla3M6NOhSfLvzSeGasWU2twzTuG3KhKL+hzLiKzVvXnSSxy+nY6fbcc3Mv+qkvlI5fxZdSq3VSpJJOXXDyjj5Mx141UgWKZUhItUzg7ROh8BsSRINHwJSKCJCiOZXq0sk05bjcgVfwxNCiSAngGGOigjSSHOSBNMCWkPIYywTR7gTWNPnqQj3Z1vTrfyoRh2SObcK2jqV4v0judRz0R28c+PP5b9OQogHRyOATINhCgJkTIXSoBBMhDhRmQA5b4X3q/GLfqin4u206d3Kqm0p4wY/BF2oXNNp7uSX3PWeOUcRoy74NjmtDUKi6Sf1Y+dVy3byzJpT3RpQOHkduFinULtGWxmJFqjVwcHVpwkSplOlULEZlalWIjmQRkP5g0Y2NdWK6jajM66YTVutfRXQqVblvoymqe5N5BuQkOd08bhG+aGOkh9CgsiwsadtUckXae23cq0UopG7w/p7r1Onwp9RI52vWcF6byQ8yS+J9PkeqiiC1oqEVFeiwTpnWOFuniDci5NMlyKMyLkBwYG5DICgJkaWIfgQbkAPnXhvKuKT6Lnj/AJOgeNt5TnC3hGScoqPNh5xscihfzj+V4foxla4rVn8Up1H7ts2s5SQaysPO5rUjNtbBr4n9DTpI83ls/wAduIWYkWSuJG44ODos0qhZVQzoMmjMouxrEsapnc5LCYXVqcilcLPQlcgUclTWc1JDvOfYvOmhPKia1r2VYc0i/bU+XqEIpD3ssl+p10v2FrOvNQguvX5HT+HtIjbwS25vVnKtG11UJ5XU9zpPGMJfqf1g7c+O5rzdd/49ohclG11KlUSakt/ctZNerGpMi5GJjskU7Icw0AFyKMFyVDkwY1MXIBgAyA0fOGkcLyqJTqvkj1S9i/cUqVH4acVnpnubF5ebYWyX9GHX+J5PP15LXp9cVX/kkhEOUkgjlapygMqUyxEJxyFUWhIyJ50iGVMCSEh8JYK2RVUKi9CqmJUmVVUHxlkBzmwUmIOjAsVJTq9yw/iiyjeLkpuYtlcZitz1eHnXDydM28g4tkljqLi92XNSoJrKMKpserMef9e307W2sYl79T2GlcUv97ytupxyjctbpmnaapJMlkp+O72Wt0qn7kmaamn0aZxSx1f3+56TTeIpxxh5+5zvja10jIuTE03XKdRfE1F+5sRkmsrdHOzGjwY1MczIMgIBQoogAcFrTyyFxJGLynjx6ldxJIQFwPihgVRHOIo8qahlArTgXmiNxGLrOlEjaL06Q3yEUUtxYplxW6JY0URFajB+pchEdGmOUSz9FLXP0WvkZVlUeEWeIK2UombbTwj2+L5Hn8jdoVlNNGXf2+GyG1uGp/2alzHmjk765fjBew+nIdXhuQ5I1+te0rY9TatLrGNzy1KtgmV6+5qVMe2o3rW/3Ru6fxNOGFzN9Nmc5ttSa6s17e5UlkXmUdb0nXoVdns2bWTi1O/dNppnu+FuJo1F5c5b9E2cOuMaleuyKMi9si5OanZAbkAP/9k=",
                    anime: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    ],
                    move: {
                    plot: "분기",
                    index: 0,
                    },
                },
                ],
                분기: [
                {
                    bg: "",
                    bgm: "",
                    name: "엄준식",
                    text: "카드를 뽑아보게",
                    img: "data:image/jpeg;base64,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",
                    anime: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    ],
                    select: {
                    select1: {
                        text: "1번 카드",
                        plot: "시작",
                        index: 0,
                    },
                    select2: {
                        text: "",
                        plot: "시작",
                        index: 0,
                    },
                    select3: {
                        text: "3번 카드",
                        plot: "분기",
                        index: 0,
                    },
                    },
                },
                {
                    bg: "",
                    bgm: "",
                    name: "",
                    text: "4",
                    img: "",
                    anime: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    ],
                    move: {
                    plot: "",
                    index: 0,
                    },
                },
                ],
                종료: [
                {
                    bg: "",
                    bgm: "",
                    name: "",
                    text: "",
                    img: "",
                    anime: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    ],
                    move: {
                    plot: "",
                    index: 0,
                    },
                },
                ],
            },
        }
    },
    methods : {
      //해당 프로젝트 정보 가져오기
      getPjInfo() {
        axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
        .then((result)=>{
          if(result.data == "err") {
            this.$store.commit('gModalOn', "프로젝트 정보를 불러오는데 실패했습니다.", "normal");
          } else {
            this.title = result.data.PROJ_TITLE;
            this.retouchDate = result.data.PROJ_RETOUCHDATE;
            this.stat = result.data.PROJ_STATUS;
            this.pjType = result.data.PROJ_TYPE;
          }
        })
        .catch((err)=>{
          console.error(err);
        })
      },
      
        //현재 JSON 파일 업로드
        async uploadJSON() {
        var data = JSON.stringify(this.scenario);
        var fileName = `PJ${this.pjCode}.json`
        var properties = {type:'text/plain'};

        var file = new File([data], fileName, properties); //새로운 파일 객체 생성
        console.log(file);

        var result = await storage.uploadFile(`PJ${this.pjCode}/`, file);
        console.log(result);
        },
        async getJSON() {
        var result = await storage.getJson('test/testSave.json'); // unit8array(utf16) 형식으로 데이터를 읽어옴
        var uint8array = new TextEncoder("utf-8").encode(result); // utf8 형식으로 변환
        var string = new TextDecoder().decode(uint8array);
        console.log(JSON.parse(string));
        },


        loadData: function () {
        console.log("load");
        let thisScene;
        eval(
            "thisScene = this.scenario." +
            this.position.plot +
            "[" +
            this.position.index +
            "]"
        );
        this.Now.text = thisScene.text;
        this.Now.bg = thisScene.bg;
        this.Now.bgm = thisScene.bgm;
        this.Now.name = thisScene.name;
        this.Now.img = thisScene.img
        },
        nextScene: function () {
        console.log("next");
        let plot = this.position.plot;
        let index = this.position.index;
        let thisPosition;
        eval("thisPosition = this.scenario." + plot + "[" + index + "]");
        if (thisPosition.select == undefined) {
            this.position = {
            plot: thisPosition.move.plot,
            index: thisPosition.move.index,
            };
        } else {
            this.s.task1.text=thisPosition.select.select1.text
            this.s.task2.text=thisPosition.select.select2.text
            this.s.task3.text=thisPosition.select.select3.text
            
            this.s.task1.plot=thisPosition.select.select1.plot
            this.s.task2.plot=thisPosition.select.select2.plot
            this.s.task3.plot=thisPosition.select.select3.plot
            
            this.s.task1.index=thisPosition.select.select1.index
            this.s.task2.index=thisPosition.select.select2.index
            this.s.task3.index=thisPosition.select.select3.index

            this.status = "select";
        }
        this.loadData();
        },
        selectScene: function (event) {
        console.log("select");
        let plot = event.target.getAttribute("plot");
        let index = event.target.getAttribute("index");
        console.log(plot + " " + index + " " + this.position);
        this.position = {
            plot,
            index,
        };
        this.status = "select";
        console.log(this.position);
        this.loadData();
        },
        selectEvent: function(event){
        console.log(event.target);
        },
        move: function(plot, index){
        this.position.plot=plot
        this.position.index=index
        this.status='play'
        this.loadData()
        }
    },
}
</script>

<style>

.ViewerBackground {
  background: #5e5e5e;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.SceneBackground {
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.ScenePauseBackground {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}

.VisualNovelLabel {
  position: absolute;
  top: 0px;
  width: 50%;
  height: 100%;
  /* background: rgba(34, 34, 34, 0.7); */
  z-index: 10;
}

.VisualNovelIcon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 10%);
  height: calc(100% - 10%);
  border-radius: 20px;
  /* background: white; */
}

.VisualNovelIcon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.VisualNovelName {
  position: absolute;
  left: 100%;
  top: calc(0% + 40px);
  transform: translate(0, -50%);
  width: 200px;
  height: 40px;
  color: white;
  font-size: 1.5em;
}

.PauseMenusFrame {
  position: absolute;
  top: 0px;
  left: 50%;
  width: 50%;
  height: 100%;
  /* background: white; */
}

.PauseMenuButtonPosition {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  /* height: 80px; */
}

.PauseMenuButton {
  display: inline-table;
  width: 25%;
  margin: 0px 1.5% 0px 1.5%;
  height: 80px;
  border-radius: 20px;
  background: #2872f9;
  cursor: pointer;
}
.PauseMenuButton span {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
  font-size: 1.2em;
  padding: 20px;
}
.PauseMenuButton span img {
  width: 90%;
}

.SceneSaveBackground {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.SceneSaveBackground {
  color: white;
  font-size: 1.8em;
  position: fixed;
}

.SaveSlotsFrame {
  position: absolute;
  width: 70%;
  height: 60%;
  padding: 40px;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  background: rgba(134, 134, 134, 0.9);
  border-radius: 15px;
}

.SaveSlot {
  display: inline-block;
  width: calc(33% - 45px);
  margin: 15px;
  height: calc(100% - 30px);
  background: rgb(212, 212, 212);
  border-radius: 15px;
}

.SceneBackground img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.SceneSelectBackground {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.SceneSelectFrame {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 10;
}

.SelectButton {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100px;
  background: #2872f9;
  box-shadow: 0px 0px 10px #252525;
  border-radius: 50px;
  margin: 15px 0px 15px 0px;
  cursor: pointer;
  display: table;
}

.SelectButton span {
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
  word-break: break-all;
}

.ViewerNav {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  position: absolute;
  left: 10px;
  top: 10px;
  color: white;
  z-index: 1;
  transition: background-color 0.3s ease-out 100ms;
}

.ViewerNav:hover {
  background: #2872f9;
  transition: 0.3s;
}

.ViewerNav img {
  margin: 10px;
  width: 50%;
  height: 50%;
}

.SceneImg {
  position: absolute;
  left: 50%;
  top: 60%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.SceneImg img {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.SceneScriptFrame {
  position: absolute;
  left: 50%;
  top: calc(100% - 80px);
  transform: translate(-50%, -50%);
  width: 90%;
  height: 50%;
  z-index: 2;
}

.ScriptToolBar {
  position: absolute;
  height: 40px;
  left: calc(100% - 250px);
  top: 10px;
}

.ToolBarEl {
  position: relative;
  display: inline;
  width: 10%;
  margin: 0px 1.5px 1.5px 0px;
  padding: 3px;
  cursor: pointer;
  color: rgb(172, 172, 172);
}

.ScriptBackground {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 20px;
  opacity: 0.9;
  box-shadow: 0px 0px 10px #252525;
}

.SceneSpeakerName {
  position: absolute;
  left: -10px;
  top: -20px;
  width: 200px;
  height: 60px;
  background: rgb(75, 147, 255);
  display: table;
  border-radius: 25px;
  box-shadow: 0px 0px 10px #252525;
}

.SceneSpeakerName span {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 1em;
  color: white;
}

.SceneScript {
  position: absolute;
  left: 0px;
  top: 60px;
  /* width: calc(100% - 40px); */
  height: calc(100% - 200px);
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  /* display: table; */
}

.SceneScript span {
  display: table-cell;
  color: white;
  text-align: left;
  overflow: hidden;
  font-size: 1.2em;
}

/* 반응형 레이아웃 for 모바일 */
@media ( max-width: 800px ) {
.SceneSpeakerName {
  position: absolute;
  left: -10px;
  top: -20px;
  width: 45%;
  height: 50px;
  background: rgb(75, 147, 255);
  display: table;
  border-radius: 25px;
  box-shadow: 0px 0px 10px #252525;
}

  .VisualNovelLabel {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 70%;
  background: rgba(34, 34, 34, 0.7);
  z-index: 10;
  }

  .VisualNovelIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 10%);
    height: calc(100% - 10%);
    border-radius: 20px;
    /* background: white; */
  }

  .VisualNovelIcon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .VisualNovelName {
    position: absolute;
    left: 0%;
    top: calc(0% + 40px);
    transform: translate(0, -50%);
    width: 200px;
    height: 40px;
    color: white;
    font-size: 1.5em;
  }

  .PauseMenusFrame {
    position: absolute;
    top: 70%;
    left: 0px;
    width: 100%;
    height: 30%;
    /* background: white; */
  }

  .PauseMenuButtonPosition {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
  }

  .PauseMenuButton {
    display: inline-table;
    width: 25%;
    margin: 0px 1.5% 0px 1.5%;
    height: 50px;
    border-radius: 20px;
    /* background: #2872f9; */
    cursor: pointer;
  }
  .PauseMenuButton span {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 1.2em;
    
  }
  .PauseMenuButton span img {
    width: 100%;
  }
}
/* 반응형 레이아웃 for 모바일 */


.NextScriptButton {
  position: absolute;
  left: calc(100% - 90px);
  top: 35%;
  width: 60px;
  height: 40px;
  transform: translate(-50%, -50%);
  animation-name: NextScriptButtonMove;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 1s;
}

.NextScriptButton button {
  width: 100%;
  height: 100%;
  background: rgba(44, 44, 44, 0.4);
  text-align: center;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  box-shadow: 0px 0px 20px rgb(85, 85, 85);
}

@keyframes NextScriptButtonMove {
  0% {
  }

  100% {
    top: 37%;
  }
}
</style>