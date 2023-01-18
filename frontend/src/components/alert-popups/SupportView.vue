<template>
  <div class="container-support">
    <div class="img-animation">
      <img src="/img/tallos-logo.png" alt="logo tallos">
    </div>
    <ul class="support-info">
      <li>
        <h4>Desenvolvedor Responsável:</h4>
      </li>
      <li>Paulo Sérgio - Trainee de desenvolvimento</li>
      <li>{{ $store.state.user.email }}</li>
    </ul>  
  </div>
</template>

<script>
export default {
  name : 'Support',
}
</script>

<style scoped>
  .container-support {
    height: 78vh;
    width: 400px;
    border: 2px solid #80808068;
    background-color: #fff;
    position: absolute;
    top: 014vh;
    right: 0;
    animation: slide .5s ease-in-out alternate;
  }

  @keyframes slide {
    from {
      visibility: hidden;
      transform: translateX(100%);
    }
    to {
      visibility: visible;
      transform: translateX(0);
    }
  }

  .img-animation, img {
    padding: 40px 0;  
    animation: blow-soft 3000ms ease-in;
    text-align: center;
    background-color: #fff;
  }

  @keyframes blow-soft {
    from {
      opacity: 0;
      visibility: hidden;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }

  .support-info {
    padding: 40px;
    animation: blow-soft 3000ms ease-in;
  }

  @media(max-width: 480px) {
    .container-support {
      width: 100%;
    }
    .support-info {
      font-size: 12px;
      text-align: center;
      padding: 0;
    }
  }
</style>