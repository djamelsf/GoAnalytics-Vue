<template>
   <div>
      <footer>
         <div class="social-media">
            <a href="https://github.com/djamelsf/DataViz"><i class="fab fa-github"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
         </div>
         <div class="copyrights">Copyright © 2022</div>
      </footer>
   </div>
</template>

<script>

export default {
  name: "Footer",
 
};
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"); 
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    font-family: "Montserrat";
}
:root {
    --mycolor: rgb(255,0,140)
}
footer {
    width: 100%;
    bottom: 0;
    background: #424242;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: #fff;
    padding: 10px;
    margin-bottom: 0px;

}
.text {
    font-size: 28px;
    font-weight: bold;
    margin: 40px auto;
}

.list-footer {
    margin: 40px auto;
    display: flex;
    list-style-type: none;
}
.list-footer li a {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
}
.list-footer li a:hover{color: var(--mycolor);}

.social-media {
    margin: 20px auto;
}
.social-media i {
    padding: 20px;
    font-size: 25px;
    color: #fff;
}
.social-media i:hover{
    color: rgb(2,255,171);
}

@media(max-width:810px){
   
    .list-footer li a {
        padding: 10px;
        font-size: 10px;
    }
    .social-media i {
        padding: 10px;
    }
}
@media(max-width:610px){
   
    .list-footer li a {
        padding: 10px;
        font-size: 12px;
    }
    .social-media i {
       font-size: 15px;
    }
}
@media(max-width:470px){
    .text {
        font-size: 12px;
    }
    .list-footer li a {
        padding: 5px;
    }
}
@media(max-width:330px){
    .text {
        font-size: 10px;
    }
}

</style>
