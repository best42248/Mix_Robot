<template>
  <div class="dock-container">
    <div v-for="queue in queueOptions" :key="queue.id" class="dock">
      <div @click="toggleProductList(queue.id)" class="dock-header">
        <h2>{{ queue.name }}</h2>
        <div class="status-queue">
          <div :class="['status-indicator', queue.status.toLowerCase()]"></div>
          <div class="ml-2">{{ queue.status }}</div>
        </div>
        <div class="queue-location">{{ queue.location }}</div>
        <button class="triangle-button">
          <span :class="isProductListVisible(queue.id) ? 'triangle-up' : 'triangle-down'"></span>
        </button>
      </div>

      <!-- Display products only when the list is toggled on -->
      <div v-if="isProductListVisible(queue.id)" class="queue-container">
        <h3>Product List</h3>
        <ul class="product-list">
          <li 
            v-for="(item, index) in queue.products" 
            :key="index" 
            :class="getProductClass(item.status)"
            class="queue-item"
          >
            <div class="item-details">
              <div class="item-name">{{ item.name }}</div>
              <img :src="item.image" alt="Item Image" class="item-image" />
              <div class="item-quantity">Quantity: {{ item.quantity }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "QueueList",
  data() {
    return {
      queueOptions: [],
      visibleProductLists: {},
    };
  },
  mounted() {
    this.queryData();
  },
  methods: {
    toggleProductList(queueId) {
      this.$set(this.visibleProductLists, queueId, !this.visibleProductLists[queueId]);
    },
    isProductListVisible(queueId) {
      return this.visibleProductLists[queueId] || false;
    },
    queryData() {
      uibuilder.send({ payload: {} });
    },
    handleIncomingData(msg) {
      if (msg && msg.payload && typeof msg.payload === "object" && msg.payload !== null) {
        this.queueOptions = msg.payload;
      }
    },
     getProductClass(status) {
    switch (status) {
      case "Inactive":
        return "gray-frame";
      case "Running":
        return "green-frame";
      case "Pending":
        return "orange-frame";
      default:
        return "gray-frame"; // Fallback for unknown statuses
    }
  },
  },
  created() {
    uibuilder.onChange("msg", (msg) => {
      this.handleIncomingData(msg);
      //console.log(msg);
    });
  },
};
</script>

<style scoped>
.dock-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-inline-start: 10px;
}
.dock {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.dock-header {
  display: flex;
  align-items: center;
  gap: 15px;
}
.dock-header h2 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}
.queue-location {
  font-size: 1rem;
  color: #666;
  margin-left: auto;
}
.status-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.status-indicator.running {
  background-color: greenyellow;
}
.status-indicator.error {
  background-color: red;
}
.status-indicator.pending {
  background-color: orange;
}
.status-indicator.completed {
  background-color: rgb(100, 100, 100);
}
.queue-container {
  margin-top: 15px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.queue-container h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.queue-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 150px;
}
.green-frame {
  background-color: #92ff92; /* Green */
}
.orange-frame {
  background-color: #f5ce86; /* Orange */
}
.gray-frame {
  background-color: #D3D3D3; /* Gray */
}
.item-details {
  display: flex;
  flex-direction: column;
}
.item-image {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin: 5px 0;
}
.item-name {
  font-weight: bold;
  font-size: 10px;
  text-align: center;
}
.item-quantity {
  font-size: 1rem;
  color: #666;
  font-weight: bold;
  text-align: center;
}
.triangle-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}
.triangle-button span {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.triangle-up {
  border-bottom: 15px solid black;
}
.triangle-down {
  border-top: 15px solid black;
}
.status-queue {
  display: flex;
}
</style>
