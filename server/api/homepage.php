<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vAdmin</title>
  <style>
  *{
    margin:0;
    padding:0;
  }
  body{
    background: #CCD;
    background-image:url(http://localhost:8081/src/assets/bg-anim.svg);
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  }
  .container{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow:0 2px 10px rgba(0,0,0,.1);
    width: 200px;
    height: 200px;
    background:#EEF;
    text-align: center;
    z-index: 1;
  }
  .background{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .content{
    display:flex;
    flex-direction:column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  svg{
    margin: 0 auto;
  }
  h2{
    font-weight: normal;
    margin-bottom:4px;
    font-size: 16px;
  }
  p{
    margin-bottom:4px;
    font-size: 12px;
    color:#666;
  }
  .spinner {
    margin: 30px auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;
    -webkit-animation: sk-rotate 2.0s infinite linear;
    animation: sk-rotate 2.0s infinite linear;
}
.dot1, .dot2, .dot3 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: -4px;
    left: 18px;
    background-color: #11CDC5;
    border-radius: 100%;
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
}

.dot2 {
    background-color: #FC2D79;
    top: auto;
    bottom: -4px;
    -webkit-animation-delay: -0.666666s;
    animation-delay: -0.666666s;
}

.dot3 {
    background-color: #ffb52a;
    top: auto;
    bottom: 8px;
    left: -3px;
    -webkit-animation-delay: -1.22222s;
    animation-delay: -1.22222s;
}

@-webkit-keyframes sk-rotate {
    100% {
        -webkit-transform: rotate(-360deg);
    }
}

@keyframes sk-rotate {
    100% {
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
    }
}

@-webkit-keyframes sk-bounce {
    0%, 100% {
        -webkit-transform: scale(0);
    }

    50% {
        -webkit-transform: scale(1);
    }
}

@keyframes sk-bounce {
    0%, 100% {
        transform: scale(0);
        -webkit-transform: scale(0);
    }

    50% {
        transform: scale(1);
        -webkit-transform: scale(1);
    }
}
</style>
</head>
<body>
 <div class="container">
   <div class="content">
    <div class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
      <div class="dot3"></div>
    </div>
    <div class="infos">
      <h2>vAdmin Server</h2>
      <p>Version: <?= $version ?></p>
    </div>
  </div>
</div>
</body>
</html>