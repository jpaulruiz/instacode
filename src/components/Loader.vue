<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  border: 0.4rem solid #f3f3f3;
  border-radius: 50%;
  border-top: 0.4rem solid #626363;
  width: 1rem;
  height: 1rem;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>