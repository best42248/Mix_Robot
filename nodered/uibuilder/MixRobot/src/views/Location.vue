<!-- components/AllCharts.vue -->
<template>
  <div>

  </div>
</template>

<script>
module.exports = {
  name: "AllChart",
  data() {
    return {
      Plant_ID: "",
      Machine_ID: "C5",
      Order_ID: "6701031607",
      Bag: "250",
      Start_time: "16:30:52:258",
    };
  },
  mounted() {
    // กำหนดค่าให้ robotStateData ใน mounted
  },
  methods: {
    handleIncomingData(msg) {
      if (
        msg &&
        msg.payload &&
        typeof msg.payload === "object" &&
        msg.payload !== null &&
        msg.payload !== undefined
      ) {
        const { data } = msg.payload;

        const keysToMonitor = [
          "Plant_ID",
          "Machine_ID",
          "Order_ID",
          "Bag",
          "Start_time",
        ];

        keysToMonitor.forEach((key) => {
          if (data && key in data) {
            this[key] = String(data[key]); // Convert to string
          }
        });
      }
    },
  },
  created() {
    uibuilder.onChange("msg", (msg) => {
      this.handleIncomingData(msg);
      //this.Start_time = this.Start_time.split("T")[1].split("Z")[0];
      console.log(msg.payload.data);
    });
  },
};
</script>
<style scoped>
.board {
  display: flex;
}
.target-bg {
  background-color: #bbe1fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 20.5vw;
  margin-block: 15px;
  margin-inline-start: 10px;
}
.title {
  font-size: 1.4em;
  margin-bottom: 10px;
  font-weight: bold;
  color: #0f4c75;
  text-align: center;
}
.predict-chart {
  background-color: #f9f9f9;
  padding-inline: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 63.9vw;
  margin: 15px;
}
.chart {
  width: 18vw;
}
.predict{
  width: 61.6vw;
}
.title-predict{
  font-size: 2em;
  margin-bottom: 10px;
  font-weight: bold;
  color: #0f4c75;
  text-align: center;
}
</style>
