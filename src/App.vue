<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped >
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              腰Tune
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
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>腰Tune</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="primary" dark app>
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
            name:'Home',link:'/',icon: 'mdi-speedometer',
          },
          {
            name:'About',link:'/about',icon: 'mdi-speedometer',
          }
        ],
    }
  }
}
</script>