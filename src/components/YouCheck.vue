<template>
  <v-container >
    <v-row>
      <v-col cols="4" align="center">
        <v-card class="youcheckcard">
          <img v-bind:src="image_youcheck_nekoze" />
          <v-card-title>
            猫背注意！！
          </v-card-title>
          <v-card-subtitle>
            背筋を伸ばして座りましょう。
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="4" align="center">
        <v-card class="youcheckcard">
          <img v-bind:src="image_youcheck_mesen" />
          <v-card-title>
            目線注意！！
          </v-card-title>
          <v-card-subtitle>
            ディスプレイの位置は背筋を伸ばした時の目線の高さにしましょう。
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="4" align="center">
        <v-card class="youcheckcard">
          <img v-bind:src="image_youcheck_undo" />
          <v-card-title>
            座りすぎ注意！！
          </v-card-title>
          <v-card-subtitle>
            トイレ休憩や軽い体操をしましょう。
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'YouCheck',
    data(){
      return{
        image_youcheck_nekoze:require('../assets/youcheck_nekoze.png'),
        image_youcheck_mesen:require('../assets/youcheck_mesen.png'),
        image_youcheck_undo:require('../assets/youcheck_undo.png'),
      }
    },
  }
</script>

<style scoped>
  .youcheckcard {
    height: 300px;
  }
</style>
