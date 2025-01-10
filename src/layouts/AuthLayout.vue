<template>
  <v-container class="fill-height d-flex justify-center">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="6" class="d-flex justify-center align-center form">
        <router-view />
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-img
          src="@/assets/shop-image.png"
          alt="Shop Image"
          class="img"
          max-width="600px"
          width="100%"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100vh;
  max-width: 100%;
}

.v-card-title {
  font-size: 24px;
}

@media (max-width: 960px) {
  .img {
    display: none;
  }
}
</style>
