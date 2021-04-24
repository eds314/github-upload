<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
        <span class="gt-sm">{{ $route.name }}</span>
              <q-icon 
                class="header-icon q-pa-md lt-md"
                name="fas fa-dog" 
                size="sm"
                color="primary"
              />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer 
    show-if-above 
    v-model="left" 
    side="left" 
    :width="283"
    bordered>
      <q-icon 
        color="primary"
        class="q-pa-md"
        name="fas fa-dog" 
        size="lg"
      />

       <q-list>
      <q-item 
        to="/" 
        v-ripple 
        clickable 
        exact
      >
        <q-item-section avatar>
          <q-icon  name="home" size="md"/>
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
      </q-item>
      <q-item 
        to="/about" 
        v-ripple 
        clickable 
        exact 
      >
        <q-item-section avatar>
          <q-icon  name="help" size="md"/>
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
      </q-item>
    </q-list>

    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
       <q-input 
       placeholder="Search Critter"
       class="q-ma-md"
       outlined 
       rounded 
       dense>
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      
      <q-list  padding separator>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-grey-bold">Something amazing happened</q-item-label>
            <q-item-label caption>Student loan debt has been eliminated at the expense of no one. </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
         <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">News</q-item-label>
            <q-item-label class="text-grey-bold">This just in!</q-item-label>
            <q-item-label caption>All global leaders have just signed a peace treaty, dawning a new era of human existence.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item> 
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Sports</q-item-label>
            <q-item-label class="text-grey-bold">How bout that local sports team?</q-item-label>
            <q-item-label caption>Your favorite team is doing great! They just scored a touchdown, 3-pointer,goal, homerun!</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
      <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>

<style lang="sass">
.header-icon
  position: absolute 
  bottom: 0
  left: 50%
  transform: translateX(-50%)
  </style>
