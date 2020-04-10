<template>
  <div class="home">
    <section class="image-gallery">
      <div class="image" v-for="item in items" :key="item.id" @click = "lookAtArt(item)">
        <img :src="item.path" />
        <div class="hoverbox"></div>
        <div class="hovertext">
          <div class="hovertitle">{{item.title}}</div>
          <div class="hoverartist">{{item.artist}}</div>
          <div class="hoverdesc">{{item.desc}}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     items: [],
     con: true
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        return true;
      }
    },
    lookAtArt(item)
    {
      this.$router.push({path: '/art/'+item._id})
    }
  }
}
</script>






<style scoped>
.image h2 {
  font-style: italic;
}

.image-gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
}

.image {
  width: 300px;
  height: 300px;
  overflow: hidden;
  object-fit: cover;
}

.image img {
 height: 300px;
 min-width: 300px;
 object-fit: cover;
 object-position: 50% 50%;
}

.hoverbox {
  opacity: 0;
  position: relative;
  top: -330px;
  left: 0;
  width: 350px;
  height: 350px;
  padding: 30px;
  background-color: black;
  transition: .5s ease;
}
.hovertext {
  color: white;
  opacity: 0;
  position: relative;
  top: -700px;
  left: 0;
  width: 250px;
  height: 350px;
  padding: 30px;
  transition: .5s ease;
  overflow: hidden; 
}

.hovertitle{
  padding: 5px 0 10px 0;
  font-size: 26px;
  font-weight: bold;
}

.hoverartist{
  padding: 0 0 3px 0;
  color: #93b5cf;
  text-decoration: underline;
}

.hoverdesc{

}

.image:hover .hoverbox  {
  opacity: .8;
}

.image:hover .hovertext  {
  top: -735px;
  opacity: 1;
}

.title {
  background-color: #5BDEFF;
  padding: 10px 10px;
  position: relative;
  top: -5px;
}

.description {
  border-color: #5BDEFF;
  border-style: solid;
  border-width: 1.5px 0 0 0;
  padding: 3px 3px 3px 5px;
}

/* Masonry on large screens */
@media only screen and  (min-width: 1401px) {
  .image-gallery {

  }
}

@media only screen and (max-width: 1400px) and (min-width: 1024px) {
  .image-gallery {

  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {

  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {

  }
}
</style>
