<template>
  <div class="product-selector">
    <h2>Select Products</h2>

    <div class="product-list">
      <div class="product-grid">
        <div
          v-for="product in products"
          :key="product.productID"
          class="product-item"
        >
          <h4>{{ product.name }}</h4>
          <img :src="product.image" alt="Product Image" class="product-image" />
          <div class="quantity-controls">
            <button @click="decrement(product.productID)">-</button>
            <span>{{ quantities[product.productID] }}</span>
            <button @click="increment(product.productID)">+</button>
          </div>
        </div>
      </div>
    </div>

    <div class="submit-area">
      <div class="location-selection">
        <label for="location">Select Location:</label>
        <select v-model="selectedLocation" id="location">
          <option
            v-for="location in locations"
            :key="location.locationsID"
            :value="location.name"
          >
            {{ location.name }}
          </option>
        </select>
        <button @click="submitSelection" class="submit-button">Submit</button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirm Selection</h3>
        <p>Location: {{ selectedLocation }}</p>
        <ul>
          <li v-for="product in selectedProducts" :key="product.id">
            {{ product.name }}: {{ product.quantity }}
          </li>
        </ul>
        <button @click="confirmSelection">Confirm</button>
        <button @click="showModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "ProductSelector",
  data() {
    return {
      locations: [],
      selectedLocation: null,
      products: [],
      quantities: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
      },
      showModal: false,
      selectedProducts: [],
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData(){
      uibuilder.send({
        payload: {
          addQueue: true,
        },
      });
    },
    increment(productId) {
      this.quantities[productId]++;
    },
    decrement(productId) {
      if (this.quantities[productId] > 0) {
        this.quantities[productId]--;
      }
    },
    submitSelection() {
      this.selectedProducts = Object.entries(this.quantities)
        .filter(([productID, qty]) => qty > 0)
        .map(([productID, qty]) => {
          const product = this.products.find(
            (product) => product.productID == productID
          );
          return {
            productID,
            quantity: qty,
            name: product.name, // เพิ่มชื่อสินค้า
            image: product.image, // เพิ่มรูปภาพสินค้า
            status: "Pending",
          };
        });

      if (!this.selectedLocation) {
        alert("Please select a location.");
        return;
      }

      if (this.selectedProducts.length === 0) {
        alert("Please select at least one product.");
        return;
      }

      // แสดง Modal
      this.showModal = true;
    },
    confirmSelection() {
      const payload = {
        location: this.selectedLocation,
        products: this.selectedProducts,
      };

      // ส่งข้อมูลไปยัง Node-RED
      this.sendData(payload);
      this.showModal = false; // ซ่อน Modal
    },
    sendData(payload) {
      // รับเวลาปัจจุบันใน UTC
      const nowUTC = new Date();

      // เพิ่ม 7 ชั่วโมง
      const thailandTime = new Date(nowUTC.getTime() + 7 * 60 * 60 * 1000);
      uibuilder.send({
        collection: "BufferActiveQueue",
        operation: "insertOne",
        payload: {
          timeStamp: thailandTime,
          startTime: thailandTime,
          endTime : thailandTime,
          location: payload.location,
          products: payload.products,
          status: "Pending",
          image: payload.products.image,
          mode: "Active",
        },
      });
    },
    handleIncomingData(msg) {
      // Check if msg.payload is an object and has the required structure
      if (
        msg &&
        msg.payload &&
        typeof msg.payload === "object" &&
        msg.payload !== null
      ) {
        // Destructure to extract locations and products arrays
        const { locations, products } = msg.payload;

        // Verify locations and products are arrays and have the required structure
        if (Array.isArray(locations) && Array.isArray(products)) {
          this.locations = locations;
          this.products = products;

        }
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
.product-selector {
  padding: 30px; /* เพิ่ม padding */
  background-color: #f8f9fa;
  border-radius: 12px; /* เพิ่มความโค้งมน */
  width: 85vw; /* ให้กว้างขึ้น */
  height: auto; /* ปรับความสูงตามเนื้อหา */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: auto; /* จัดกลาง */
  margin-inline-start: 10px;
}

h2 {
  color: #343a40;
  text-align: center;
  font-size: 2.5rem; /* ขนาดตัวอักษรใหญ่ขึ้น */
  font-weight: bold; /* ทำให้หนาขึ้น */
  margin-bottom: 20px; /* เพิ่มระยะห่างด้านล่าง */
  text-transform: uppercase; /* ทำให้ตัวอักษรเป็นตัวพิมพ์ใหญ่ */
  letter-spacing: 1px; /* เพิ่มระยะห่างระหว่างตัวอักษร */
}

h3 {
  color: #6c757d; /* สีของหัวข้อรอง */
  text-align: center;
  font-size: 1.5rem; /* ขนาดตัวอักษรของหัวข้อรอง */
  margin-bottom: 15px; /* เพิ่มระยะห่างด้านล่าง */
}

.location-selection {
  margin-bottom: 20px;
  text-align: center; /* จัดกลาง select location */
  width: 100%; /* ให้เต็มความกว้าง */
}

.submit-area {
  display: flex;
  justify-content: space-between; /* จัดให้ location อยู่ทางซ้ายของ submit */
  width: 100%; /* ให้เต็มความกว้าง */
  padding: 10px; /* เว้นระยะ */
}

.product-list {
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* ลดคอลัมน์ลงเป็น 4 คอลัมน์ */
  gap: 15px; /* เพิ่มระยะห่างระหว่างสินค้า */
}

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px; /* เพิ่ม padding */
  border: 1px solid #ced4da;
  border-radius: 10px; /* เพิ่มความโค้งมน */
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* เพิ่มเงาให้ดูมีมิติ */
  text-align: center;
}

.product-image {
  max-width: 100%;
  max-height: 180px; /* ขยายขนาดสูงสุดของรูปภาพ */
  margin: 15px 0; /* เพิ่มระยะห่าง */
}

.quantity-controls {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 17px;
  cursor: pointer;
  margin: 0 20px;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}

.submit-area {
  display: flex;
  flex-direction: column; /* เปลี่ยนการจัดวางให้เป็นแนวตั้ง */
  align-items: center; /* จัดกลางแนวนอน */
  width: 100%; /* ให้เต็มความกว้าง */
  padding: 20px; /* เพิ่ม padding */
  margin-top: 20px; /* เพิ่มระยะห่างด้านบน */
}

.location-selection {
  margin-bottom: 20px;
  text-align: center;
  width: 50%; /* ให้เต็มความกว้าง */
}

label {
  font-size: 1.2rem; /* ขนาดตัวอักษรใหญ่ขึ้น */
  margin-right: 10px; /* เพิ่มระยะห่างระหว่าง label กับ select */
}

select {
  padding: 10px; /* เพิ่ม padding */
  font-size: 1rem; /* ขนาดตัวอักษร */
  border: 1px solid #ced4da; /* เพิ่มเส้นขอบ */
  border-radius: 5px; /* โค้งมน */
  margin-left: 10px; /* ระยะห่างจาก label */
}

.submit-button {
  background-color: #28a745;
  color: white;
  padding: 12px 30px; /* เพิ่มขนาดปุ่ม */
  font-size: 1.2rem; /* ขนาดตัวอักษรในปุ่ม */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* เพิ่มการเปลี่ยนแปลงสีเมื่อ hover */
}

.submit-button:hover {
  background-color: #218838; /* สีเมื่อ hover */
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* ให้อยู่ด้านบนสุด */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin-bottom: 15px;
}

.modal-content ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.modal-content button {
  margin: 5px;
  padding: 10px 15px;
}
</style>
