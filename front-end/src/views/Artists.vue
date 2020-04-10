<template>
  <div class="home">
    <section class="artist-gallery">
      <div class="artist" v-for="item in items" :key="item.id">
        <div class="title">{{item.artist}} <router-link :key="item._id" :to="'/artists/' + item._id">Edit Me</router-link></div>
        <div class="description" v-if="item.bio.length > 0">{{item.bio}}</div>
        <div class="description" v-else>Bio Needed</div>

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
        let response = await axios.get("/api/artists");
        this.items = response.data;
        return true;
      } catch (error) {
        return true;
      }
    },
  }
}
</script>






<style scoped>
.artist h2 {
  font-style: italic;
}

.artist-gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.artist {
  margin-top: 30px;
  padding-left: 20px;
  padding-top: 10px;
  width: 400px;
  height: 200px;
  overflow: hidden;
  object-fit: cover;
  background-color: #32373b;
  border-radius: 20px;

}

.artist img {
 height: 300px;
 min-width: 300px;
 object-fit: cover;
 object-position: 50% 50%;
}

.title {
  padding-bottom: 10px;
  color: white;
  font-weight: bold;
  font-size: 20px;
}

.title a{
  margin-left: 15px;
  color: #7e8f9c;
}

.description {
  color: #7e8f9c;
  font-size: 16px;
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
