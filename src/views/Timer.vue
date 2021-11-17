<template>
  <div class="timer">
    <v-container >
      <v-row>
        <v-col cols="12" align="center" class="timerinfomation" v-if="!timerCompleted">
          <p class="text-h6">次のリフレッシュまで</p>
          <div class="my-5 time ">
            {{ formatTime }}
          </div>
        </v-col>
        <v-col cols="12" align="center" class="timerinfomation" v-if="timerCompleted">
          <YouCheck/>
        </v-col>
        <v-col cols="12" align="center" class="timerooperation" v-if="timerCompleted">
          <v-btn x-large color="blue-grey lighten-5" v-on:click="restart"  align="center">作業再開</v-btn>
          <p class="text-h6 my-4">リフレッシュしてから作業開始しましょう！！</p>
        </v-col>
        <v-col cols="12" align="center" class="timerooperation" v-if="!timerCompleted">
          <v-btn x-large color="blue-grey lighten-5" v-on:click="restart"  align="center">リセット</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import YouCheck from '../components/YouCheck.vue';

  export default {
    name: 'Timer',
    components: { YouCheck },
    props: ['min','sec','timerOn','timerCompleted'],

    methods: {

        start: function() {
          this.$emit('start');
        },

        stop: function() {
          this.$emit('stop');
        },

        restart: function() {
          this.$emit('restart');
        },
    },
    computed: {
      formatTime: function() {
        let timeStrings = [
          this.min.toString(),
          this.sec.toString()
        ].map(function(str) {
          if (str.length < 2) {
            return "0" + str
          } else {
            return str
          }
        })
        return timeStrings[0] + ":" + timeStrings[1]
      }
    }
  }
</script>

<style scoped>
  .time {
    font-size: 120px;
  }

  .timerinfomation {
    height: 350px;
  }

  .timerooperation {
    height: 150px;
  }
</style>