<template>
  <div id="app">

    <router-view  />
  </div>
</template>

<script>

import {userService} from "@/services/user.service.js"
export default {
  data() {
    return {
      
      loggdinUser: null
    };
  },
  created() {
    userService.getLoggedinUser()
    .then(loggedinUser=>{
      console.log('loggedin user:', loggedinUser)
    })
  },
  methods: {
    
   
  },
  
};
</script>

<style lang="scss" >
</style>
