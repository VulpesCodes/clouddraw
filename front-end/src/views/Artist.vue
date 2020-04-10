<template>
  <div class="artist">
    <div class="center">
      <input v-model="newname" placeholder="Artist's Name">
    </div>
    <textarea v-model="bio" name="desc" rows="26" cols="48"></textarea>
    <button @click="editItem()">Edit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     artist: [],
     newname: "",
     bio: "",
     works: ""
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    async getItems() {
      try {

        let response = await axios.get("/api/artists/" + this.$route.params.id);
        this.artist = response.data;
        this.bio = this.artist.bio;
        this.newname = this.artist.artist

        return true;
      } catch (error) {
        return true;
      }
    },
    async editItem() {
      try {
        this.collectWorks()
        await axios.put("/api/artists/" + this.artist._id, {
          artist: this.newname,
          bio: this.bio
        });
        this.getItems();
        return true;
      } catch (error) {
        return true;
      }
    },
    async collectWorks() {
      try {
        let response = await axios.get("/api/items");
        this.works = response.data.filter(work => work.artist === this.artist.artist )
        this.works.forEach(work => work.artist = this.newname)
        this.works.forEach(work => this.editWorks(work))
        return true;
      } catch (error) {
        return true;
      }
    },
    async editWorks(work) {
      try {
        await axios.put("/api/items/" + work._id, {
          title: work.title,
          desc: work.desc,
          artist: work.artist
        });
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

.artist {

  margin: auto;
  margin-top: 30px;
  padding-left: 20px;
  padding-top: 10px;
  width: 400px;
  height: 500px;
  overflow: hidden;
  object-fit: cover;
  background-color: #32373b;
  border-radius: 20px;

}
.center{
  margin-left: 50px;
  margin-bottom: 5px
}

input {
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: 20px;
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
