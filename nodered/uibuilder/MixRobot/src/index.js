"use strict";
const routes = [
  {
    path: "/",
    name: "Queue Management",
    component: httpVueLoader("./views/QueueManagement.vue"),
  },
  {
    path: "/Queue%20Management",
    name: "Queue Management",
    component: httpVueLoader("./views/QueueManagement.vue"),
  },
  {
    path: "/Queue%20History",
    name: "Queue History",
    component: httpVueLoader("./views/QueueLog.vue"),
  },
  {
    path: "/Location",
    name: "Location",
    component: httpVueLoader("./views/Location.vue"),
  },
  {
    path: "/Product",
    name: "Product",
    component: httpVueLoader("./views/Product.vue"),
  },
  {
    path: "/Setting",
    name: "Setting",
    //component: httpVueLoader("./views/History.vue"),
  },
  {
    path: "/Add Queue",
    name: "Add Queue",
    component: httpVueLoader("./views/addQueue.vue"),
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

const app = new Vue({
  // eslint-disable-line no-unused-vars
  router,
  el: "#app",
  components: {
    sidebar: httpVueLoader("./components/slideBar.vue"),
    navbar: httpVueLoader("./components/navBar.vue"),
  },
  data() {
    return {
      test: 0,
      responseData: null,
    };
  },
  mounted() {
    // เรียกฟังก์ชันเมื่อ component ถูก mount

  },
  methods: {

  }, // --- End of methods --- //
});

// Now the app has started!
