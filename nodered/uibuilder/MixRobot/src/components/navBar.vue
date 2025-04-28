<template>
  <div>
    <div class="header py-2">
      <div class="head-breadcrumb">
        <a class="logo px-3 ml-2">{{ page }}</a>
        <b-breadcrumb class="breadcrumb ml-3" :items="items"></b-breadcrumb>
      </div>
      <div v-if="$route.name === 'Queue Management'">
        <button  class="basket-button" @click="sendData('Receive')">Basket Received</button>
      <button  class="basket-button" @click="sendData('Release')">Basket Release</button>
      </div>
      
      <button v-if="$route.name === 'Queue Management'" class="add-button" @click="setPage('Add Queue')">+</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "NavBar",
  data() {
    return {
      items: [
        {
          text: "CPF Robotic",
          href: "#",
        },
        {
          text: this.$route.name,
          active: true,
        },
      ],
      page: this.$route.name,
    };
  },
  components: {},
  watch: {
    $route(to) {
      this.page = to.name;
      this.items = [
        {
          text: "CPF Robotic",
          href: "#",
        },
        {
          text: to.name, // Update breadcrumb when route changes
          active: true,
        },
      ];
    },
  },
  mounted() {
    this.page = this.$route.name;
  },
  methods: {
    sendData(Method) {
      if(Method ==="Receive"){
        uibuilder.send({
        payload: {
          basketReceived : true,
        },
      });
      }
      else if (Method ==="Release"){
         uibuilder.send({
        payload: {
          releaseProduct : true,
        },
      });
      }

    },
      setPage(pageName) {
      this.$router.push({ path: `/${pageName}` });
    },
  },
};
</script>

<style scoped>
.header {
  overflow: hidden;
  background-color: #1B262C;
  width: 85vw;
  box-shadow: 6px 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center items vertically */
}
.header a {
  float: left;
  color: rgb(255, 255, 255);
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  line-height: 25px;
  border-radius: 4px;
}
.head-breadcrumb {
  display: flex;
  flex-direction: column;
  align-items: start; /* Align items to start (left) */
  user-select: none;
  min-width: 250px;
}
.header a.logo {
  font-size: 40px;
  font-weight: bold;
  padding: 20px;
  color: white;
  margin-block: 1%;
  align-self: start;
}
.breadcrumb {
  background-color: #f8f9fa; /* Change breadcrumb background color */
  padding: 0.75rem; /* Add padding */
  border-radius: 0.25rem; /* Rounded corners */
  background-color: transparent; /* Make breadcrumb background transparent */
  color: rgb(255, 255, 255);
}
.add-button {
  background-color: #0F4C75; /* Button color */
  color: white; /* Button text color */
  border: none;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 2rem;
  cursor: pointer;
  margin-right: 20px; /* Space from the right edge */
  transition: background-color 0.3s; /* Transition effect */
}
.add-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}
.basket-button{
  background-color: #0F4C75; /* Button color */
  color: white; /* Button text color */
  border: none;
  border-radius: 20px;
  padding: 30px 40px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 20px; /* Space from the right edge */
  transition: background-color 0.3s; /* Transition effect */
}
.basket-button:hover {
background-color: #0056b3; /* Darker shade on hover */
}
</style>
