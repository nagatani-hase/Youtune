<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped >
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              メニュー
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item v-for="list in nav_list" :key="list.name" :to="list.link">
            <v-list-item-icon>
              <v-icon>{{ list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="blue-grey" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        腰Tune
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title style="align-center">
        現在の腰タイマー{{ formatTime }}
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view :min=this.min :sec=this.sec :timerOn=this.timerOn :timerCompleted=this.timerCompleted 
        @stop="stop" @start="start" @restart="restart"/>
    </v-main>
    <v-footer color="blue-grey" dark app>
      Youtune. For IT Engineer's Back Pain
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
        drawer: null,
        nav_list:[
          {
            name:'腰タイマー',link:'/',icon: 'mdi-speedometer',
          },
          {
            name:'腰痛を防ぐ',link:'/yousupport',icon: 'mdi-cogs',
          }
        ],
        min: 40,
        sec: 0,
        timerOn: true,
        timerCompleted: false,
        timerObj: null,
    }
  },

  created : function(){
    this.start();
  },

  methods: {

    count: function() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min --;
        this.sec = 59;
      } else if(this.sec <= 0 && this.min <= 0) {
        this.complete();
      } else {
        this.sec --;
      }
    },

    start: function() {
      let self = this;

      this.min = 0;
      this.sec = 5;

      this.timerObj = setInterval(function() {self.count()}, 1000)
      this.timerOn = true; 
      this.timerCompleted = false;
    },

    stop: function() {
      clearInterval(this.timerObj);
      this.timerOn = false;
    },

    restart: function() {
      this.stop();
      this.start();
    },



    complete: function() {
      const NOTIFICATION_TITLE = 'そろそろ体を動かす時間です！';
      const NOTIFICATION_BODY = '一度体を動かして、姿勢を見直しましょう。';

      new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY });
      clearInterval(this.timerObj);
      this.timerOn = false;
      this.timerCompleted = true;

      this.$router.push({ path: '/' })
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
    },
  }
}
</script>

