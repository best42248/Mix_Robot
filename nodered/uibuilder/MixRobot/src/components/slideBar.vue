<template>
  <div>
      <div class="sidebar">
        <div>
          <p class="logo">MIX ROBOT</p>
        </div>
        <a :class="{ active: page === 'Queue%20Management' }" @click="setPage('Queue%20Management')">Queue Management</a>
        <a :class="{ active: page === 'Queue%20History' }" @click="setPage('Queue%20History')">Queue History</a>
        <a :class="{ active: page === 'Location' }" @click="setPage('Location')">Location</a>
        <a :class="{ active: page === 'Product' }" @click="setPage('Product')">Product</a>
        <hr>
        <a :class="{ active: page === 'Setting' }" @click="setPage('Setting')" >Setting</a>
      </div>
      
  </div>
</template>

<script>
module.exports = {
  name: 'SlideBar',
  data() {
    return {
      dropdownBtn : false,
      page :  this.$route.name,
      sideBar : "hide-sidebar"
    };
  },

  mounted() {
    
  },

  methods: {
     setPage(pageName) {
      this.$router.push({ path: `/${pageName}` });
      this.page = pageName
    },
  },
  
};

</script>

<style scoped>
.logo{
  display: block;
  color: white;
  padding-block: 47px;
  text-decoration: none;
  margin: 0;
  font-size: 30px;
  font-weight: bold;  
  text-align: center;
  box-shadow: 0px 4px #0F4C75;
}
.sidebar {
  margin: 0;
  padding: 0;
  width: 13vw;
  background-color: #1B262C;
  height: 75vmax;
}
.sidebar a {
  display: block;
  color: whitesmoke;
  padding: 30px;
  font-size: 20px;
  text-decoration: none;
  user-select: none;
}
 
.sidebar a.active,button.active {
  background-color: #0F4C75;
  color: white;
}
.sidebar a:hover:not(.active),button:hover:not(.active) {
  background-color: #3282B8;
  color: white;
  left: 0px;
}
.dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  color: #000000;
  display: block;
  border: none;
  background: none;
  padding: 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}
hr{
  background-color: #0F4C75;
  border-width: 5px;
}
</style>
