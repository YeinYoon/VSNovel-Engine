<template>
  <div class="ReaderScreen"> <!-- 리더 아우터 -->
  <div class="prevButtonPosition">
      <div class="PrevButton">
          <img src="">
      </div>
  </div>
  <div class="nextButtonPosition">
      <div class="NextButton">
          <img>
      </div>
  </div>
    <div class="ReaderInner"> <!-- 리더 이너 -->
        <!-- 페이지들 -->
        
        <!-- <div class="BookCover">
            <div class="PageOne">
                <div class="PageElement">
                    <div class="PageImg">
                        <img src="">
                    </div>
                </div>
            </div>
        </div> -->

        <div class="PageLeft">
            <div class="PageElement">
                <div class="PageImg">
                    <img src="@/assets/page1.jpg">
                    <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis euismod dolor. Pellentesque luctus rutrum sem. In venenatis lectus vel urna dapibus condimentum. Nunc id iaculis ante. Proin mattis neque id enim suscipit, in porttitor nisl dictum. Nullam sed sapien sed nunc tincidunt sollicitudin. Fusce enim ex, faucibus ac auctor at, molestie ac enim. Nunc in varius purus.Morbi arcu lectus, viverra eget condimentum ac, gravida a elit. Vestibulum quis mauris nec lectus gravida pretium. Curabitur a euismod quam. Nunc sodales massa vel lacus suscipit aliquet. Pellentesque tempus neque et enim lobortis efficitur. Praesent ut vulputate risus. Praesent vehicula consectetur elementum. In diam lectus, maximus in efficitur sit amet, interdum eu neque. Proin interdum purus sit amet nunc euismod, non venenatis lorem maximus.Nunc consequat venenatis vestibulum. Vestibulum interdum libero mauris, nec consectetur augue vulputate et. Nunc justo urna, posuere quis interdum vitae, malesuada a urna. Vestibulum venenatiiverra nisl et tempus. Etiam suscipit nisl in fringilla congue. Integer ultrices ipsum non nisi feugiat auctor. Morbi eu ante ultrices, blandit elit ac, accumsan sem. Sed consectetur arcu at convallis venenatis. Morbi pharetra ligula vitae tortor luctus aliquet. Fusce posuere consectetur pretium. Vestibulum faucibus viverra augue bibendum auctor. Sed dictum tortor vel sapien viverra, sit amet viverra urna congue. Fusce pharetra, leo et consequat porttitor, diam justo egestas nunc, non dignissim ex velit non tellus. Phasellus mollis neque diam, nec suscipit elit mollis et. Integer eros odio, scelerisque id egestas sed, ultrices ut lorem. Maecenas non leo lobortis, iaculis dolor id, iaculis orci.Fusce vulputate dui sit amet enim mattis, id porttitor nibh pharetra. Sed commodo volutpat nulla, ut auctor magna rhoncus ut. Ut interdum sed leo condimentum scelerisque. Integer malesuada sem in turpis ultricies condimentum. Vivamus sed ultricies mauris, sit amet feugiat orci. Ut mauris dolor, facilisis et laoreet quis,venenatis sed nunc. Phasellus ac quam lorem. Suspendisse fermentum, ipsum non congue tincidunt, lorem purus placerat massa, bibendum convallis ligula mi id elit. Integer eu est non tortor aliquet sagittis eget imperdiet erat. Nunc mauris velit, scelerisque a porta non, pharetra congue dui. Fusce ac facilisis nulla. Sed sit amet leo nisi. Vivamus tincidunt, elit quis condimentum gravida, massa lorem consectetur leo, euismod luctus risus lacus ut eros. Sed faucibus massa tincidunt, vehicula nunc quis, tempor ante. Curabitur ac tempus lacus, a eleifend urna.Mauris sagittis nisi lectus, ac faucibus nunc gravida vitae. Cras vitae lorem arcu. Ut sit amet velit vitae enim pretium volutpat. Morbi molestie, sapien sed pulvinar commodo, sem risus commodo nisi, ut volutpat nisl metus ac lacus. Integer iaculis lorem quis mi ullamcorper, sit amet hendrerit lectus malesuada. Aliquam erat volutpat. Sed ultricies ligula eget metus elementum, sed vestibulum velit auctor. Nullam faucibus vehicula enim ut blandit. Integer et magna maximus, lacinia neque quis, rhoncus nibh. In posuere ipsum tortor, vitae aliquam augue congue nec. Vivamus sit amet aliquam urna. Quisque efficitur risus sed elit maximus, et condimentum mi luctus. Duis rutrum purus in nulla interdum, a volutpat mauris vestibulum. Nulla vel tempus nibh, quis aliquam ex. In sit amet nunc purus. Suspendisse dictum tellus ut nisi fermentum vulputate. -->
                </div>
            </div>
        </div>

        <!-- <div class="PageRight RightToLeft"> -->
        <div class="PageLeft LeftToRight">
            <div class="PageElement">
                <div class="PageImg">
                    <!-- <img src="@/assets/page2.jpg" class="RotateImg"> -->
                    <img src="@/assets/page3.jpg" class="RotateImg">
                    <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis euismod dolor. Pellentesque luctus rutrum sem. In venenatis lectus vel urna dapibus condimentum. Nunc id iaculis ante. Proin mattis neque id enim suscipit, in porttitor nisl dictum. Nullam sed sapien sed nunc tincidunt sollicitudin. Fusce enim ex, faucibus ac auctor at, molestie ac enim. Nunc in varius purus.Morbi arcu lectus, viverra eget condimentum ac, gravida a elit. Vestibulum quis mauris nec lectus gravida pretium. Curabitur a euismod quam. Nunc sodales massa vel lacus suscipit aliquet. Pellentesque tempus neque et enim lobortis efficitur. Praesent ut vulputate risus. Praesent vehicula consectetur elementum. In diam lectus, maximus in efficitur sit amet, interdum eu neque. Proin interdum purus sit amet nunc euismod, non venenatis lorem maximus.Nunc consequat venenatis vestibulum. Vestibulum interdum libero mauris, nec consectetur augue vulputate et. Nunc justo urna, posuere quis interdum vitae, malesuada a urna. Vestibulum venenatiiverra nisl et tempus. Etiam suscipit nisl in fringilla congue. Integer ultrices ipsum non nisi feugiat auctor. Morbi eu ante ultrices, blandit elit ac, accumsan sem. Sed consectetur arcu at convallis venenatis. Morbi pharetra ligula vitae tortor luctus aliquet. Fusce posuere consectetur pretium. Vestibulum faucibus viverra augue bibendum auctor. Sed dictum tortor vel sapien viverra, sit amet viverra urna congue. Fusce pharetra, leo et consequat porttitor, diam justo egestas nunc, non dignissim ex velit non tellus. Phasellus mollis neque diam, nec suscipit elit mollis et. Integer eros odio, scelerisque id egestas sed, ultrices ut lorem. Maecenas non leo lobortis, iaculis dolor id, iaculis orci.Fusce vulputate dui sit amet enim mattis, id porttitor nibh pharetra. Sed commodo volutpat nulla, ut auctor magna rhoncus ut. Ut interdum sed leo condimentum scelerisque. Integer malesuada sem in turpis ultricies condimentum. Vivamus sed ultricies mauris, sit amet feugiat orci. Ut mauris dolor, facilisis et laoreet quis,venenatis sed nunc. Phasellus ac quam lorem. Suspendisse fermentum, ipsum non congue tincidunt, lorem purus placerat massa, bibendum convallis ligula mi id elit. Integer eu est non tortor aliquet sagittis eget imperdiet erat. Nunc mauris velit, scelerisque a porta non, pharetra congue dui. Fusce ac facilisis nulla. Sed sit amet leo nisi. Vivamus tincidunt, elit quis condimentum gravida, massa lorem consectetur leo, euismod luctus risus lacus ut eros. Sed faucibus massa tincidunt, vehicula nunc quis, tempor ante. Curabitur ac tempus lacus, a eleifend urna.Mauris sagittis nisi lectus, ac faucibus nunc gravida vitae. Cras vitae lorem arcu. Ut sit amet velit vitae enim pretium volutpat. Morbi molestie, sapien sed pulvinar commodo, sem risus commodo nisi, ut volutpat nisl metus ac lacus. Integer iaculis lorem quis mi ullamcorper, sit amet hendrerit lectus malesuada. Aliquam erat volutpat. Sed ultricies ligula eget metus elementum, sed vestibulum velit auctor. Nullam faucibus vehicula enim ut blandit. Integer et magna maximus, lacinia neque quis, rhoncus nibh. In posuere ipsum tortor, vitae aliquam augue congue nec. Vivamus sit amet aliquam urna. Quisque efficitur risus sed elit maximus, et condimentum mi luctus. Duis rutrum purus in nulla interdum, a volutpat mauris vestibulum. Nulla vel tempus nibh, quis aliquam ex. In sit amet nunc purus. Suspendisse dictum tellus ut nisi fermentum vulputate. -->
                </div>
            </div>
        </div>

        <div class="PageRight">
            <div class="PageElement">
                <div class="PageImg">
                    <img src="@/assets/page4.jpg">
                    <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis euismod dolor. Pellentesque luctus rutrum sem. In venenatis lectus vel urna dapibus condimentum. Nunc id iaculis ante. Proin mattis neque id enim suscipit, in porttitor nisl dictum. Nullam sed sapien sed nunc tincidunt sollicitudin. Fusce enim ex, faucibus ac auctor at, molestie ac enim. Nunc in varius purus.Morbi arcu lectus, viverra eget condimentum ac, gravida a elit. Vestibulum quis mauris nec lectus gravida pretium. Curabitur a euismod quam. Nunc sodales massa vel lacus suscipit aliquet. Pellentesque tempus neque et enim lobortis efficitur. Praesent ut vulputate risus. Praesent vehicula consectetur elementum. In diam lectus, maximus in efficitur sit amet, interdum eu neque. Proin interdum purus sit amet nunc euismod, non venenatis lorem maximus.Nunc consequat venenatis vestibulum. Vestibulum interdum libero mauris, nec consectetur augue vulputate et. Nunc justo urna, posuere quis interdum vitae, malesuada a urna. Vestibulum venenatiiverra nisl et tempus. Etiam suscipit nisl in fringilla congue. Integer ultrices ipsum non nisi feugiat auctor. Morbi eu ante ultrices, blandit elit ac, accumsan sem. Sed consectetur arcu at convallis venenatis. Morbi pharetra ligula vitae tortor luctus aliquet. Fusce posuere consectetur pretium. Vestibulum faucibus viverra augue bibendum auctor. Sed dictum tortor vel sapien viverra, sit amet viverra urna congue. Fusce pharetra, leo et consequat porttitor, diam justo egestas nunc, non dignissim ex velit non tellus. Phasellus mollis neque diam, nec suscipit elit mollis et. Integer eros odio, scelerisque id egestas sed, ultrices ut lorem. Maecenas non leo lobortis, iaculis dolor id, iaculis orci.Fusce vulputate dui sit amet enim mattis, id porttitor nibh pharetra. Sed commodo volutpat nulla, ut auctor magna rhoncus ut. Ut interdum sed leo condimentum scelerisque. Integer malesuada sem in turpis ultricies condimentum. Vivamus sed ultricies mauris, sit amet feugiat orci. Ut mauris dolor, facilisis et laoreet quis,venenatis sed nunc. Phasellus ac quam lorem. Suspendisse fermentum, ipsum non congue tincidunt, lorem purus placerat massa, bibendum convallis ligula mi id elit. Integer eu est non tortor aliquet sagittis eget imperdiet erat. Nunc mauris velit, scelerisque a porta non, pharetra congue dui. Fusce ac facilisis nulla. Sed sit amet leo nisi. Vivamus tincidunt, elit quis condimentum gravida, massa lorem consectetur leo, euismod luctus risus lacus ut eros. Sed faucibus massa tincidunt, vehicula nunc quis, tempor ante. Curabitur ac tempus lacus, a eleifend urna.Mauris sagittis nisi lectus, ac faucibus nunc gravida vitae. Cras vitae lorem arcu. Ut sit amet velit vitae enim pretium volutpat. Morbi molestie, sapien sed pulvinar commodo, sem risus commodo nisi, ut volutpat nisl metus ac lacus. Integer iaculis lorem quis mi ullamcorper, sit amet hendrerit lectus malesuada. Aliquam erat volutpat. Sed ultricies ligula eget metus elementum, sed vestibulum velit auctor. Nullam faucibus vehicula enim ut blandit. Integer et magna maximus, lacinia neque quis, rhoncus nibh. In posuere ipsum tortor, vitae aliquam augue congue nec. Vivamus sit amet aliquam urna. Quisque efficitur risus sed elit maximus, et condimentum mi luctus. Duis rutrum purus in nulla interdum, a volutpat mauris vestibulum. Nulla vel tempus nibh, quis aliquam ex. In sit amet nunc purus. Suspendisse dictum tellus ut nisi fermentum vulputate. -->
                </div>
            </div>
        </div>

        <!-- <div class="BookEnd">
            <div class="PageEnd">
                <div class="PageElement">
                    <div class="PageImg">
                        <img src="">
                    </div>
                </div>
            </div>
        </div> -->

        <!-- 페이지들 -->
    </div> <!-- 리더 이너 -->
  </div> <!-- 리더 아우터 -->
</template>

<script>
export default {

}
</script>

<style>
.ReaderScreen{
  background:#353535;
}

.nextButtonPosition{
position: fixed;
left: 0%;
top: 50%;
transform: translate(-50%, -50%);
}

.prevButtonPosition{
position: fixed;
left: 0%;
top: 50%;
transform: translate(-50%, -50%);
}

.ReaderInner {
 width: 80%;
 height: 90vh;
 background: white;
 position: fixed;
 left: 50%;
 top: 50%;
 transform: translate(-50%, -50%);
}

.PageLeft {
width: 51%;
height: 100%;
position: absolute;
top: 0px;
left: 0%;
background: #dadada;
display: inline-block;
padding: 20px;
overflow: hidden;

}

.PageRight {
width: 51%;
height: 100%;
position: absolute;
top: 0px;
left: 50%;
background: #adadad;
display: inline-block;
padding: 20px;
overflow: hidden;
}

.LeftToRight {
animation-name: LeftToRight;
animation-duration: 1.2s;
animation-fill-mode: forwards;
transition-timing-function: ease-in-out;
z-index: 11;
}

.RightToLeft {
animation-name: RightToLeft;
animation-duration: 1.2s;
animation-fill-mode: forwards;
transition-timing-function: ease-in-out;
z-index: 11;
}

.NewPageOn {
    animation-name: NewPageOn;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}

.PageDown {
    animation-name: PageDown;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}

.PageNotVisible {
    opacity: 0;
}

.PageElement {
    width: 100%;
    height: 100%;
}

.PageImg{
    width: 100%;
    height: 100%;
}

.PageImg img{
    /* object-fit:contain; */
    width: 100%;
    height: 100%;
}

.RotateImg {
    animation-name: RotateImg;
    animation-duration: 0.9s;
    animation-fill-mode: forwards;
}

.ReRotateImg {
    transform: scaleX(1); 
}

@keyframes RotateImg {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        transform: scaleX(-1);
        opacity: 1;
    }
    
}

@keyframes NewPageOn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
    
}

@keyframes PageDown {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes RightToLeft {
    0% {
        left: 50%;
        transform: scaleX(1);
    }

    100% {
        left: 0%;
        transform: scaleX(-1);
    }
    
}


@keyframes LeftToRight {
    0% {
        left: 0%;
        transform: scaleX(1);
    }

    100% {
        left: 50%;
        transform: scaleX(-1);
    }
    
}
</style>