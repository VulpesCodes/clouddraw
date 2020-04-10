<template>
  <div class="art">
    <div class="imagecontainer">
      <img :src="item.path" />
    </div>
    <div class="textcontainer">
      <div class="title">{{this.item.title}}</div>
      <div class="artist">{{this.item.artist}}</div>
      <div class="description">{{this.item.desc}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     item: {},
     title: "",
     artist: "",
     desc: ""
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items/" + this.$route.params.id);
        this.item = response.data;
        return true;
      } catch (error) {
        return true;
      }
    },
  }
}
</script>






<style scoped>


.title {
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: 26px;
}

.imagecontainer {
  width: 100%;
  max-height: 600px;

}

.imagecontainer img{
  max-width: 100%;
  max-height: 600px;
}

.artist {
  color: #93b5cf;
  text-decoration: underline;
  margin: 10px 0 5px 0;
}

.description {
  color: #7e8f9c;
  font-size: 16px;
  margin-bottom: 100px;
}

</style>
