<template>
<div>
  <h1>Submit Your Art!</h1>
  <div class="heading">
  </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">
        <p></p>
        <input v-model="artist" placeholder="Artist">
        <p></p>
        <textarea v-model="desc" name="desc" rows="8" cols="49"></textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
    <h1>Edit a current Piece</h1>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title"><br>
        <input v-model="findItem.artist"><br>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <textarea v-model="findItem.desc" name="name" rows="16" cols="40"></textarea>
        <div>
          <button @click="deleteItem(findItem)">Delete</button>
          <button @click="editItem(findItem)">Edit</button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
     name: 'Admin',
     data() {
        return {
          title: "",
          artist: "",
          desc: "",
          bio: "",
          file: null,
          addItem: null,
          items: [],
          artists: [],
          artistList: [],
          findTitle: "",
          findItem: null,
        }
      },
      created() {
        this.getItems();
        this.getArtists();
      },
      computed: {
        suggestions() {
          let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
          return items.sort((a, b) => a.title > b.title);
        }
      },
      methods: {
          fileChanged(event) {
            this.file = event.target.files[0]
          },
          async upload() {
            try {
              const formData = new FormData();
              formData.append('photo', this.file, this.file.name)
              let r1 = await axios.post('/api/photos', formData);
              let r2 = await axios.post('/api/items', {
                title: this.title,
                artist: this.artist,
                desc: this.desc,
                path: r1.data.path
              });
              this.artists.forEach(element => this.artistList.push(element.artist))
              if (!this.artistList.includes(this.artist)){
                await axios.post('/api/artists', {
                  artist: this.artist,
                  bio: this.bio
                });
              }
              this.addItem = r2.data;

              this.title = "";
              this.artist = "";
              this.desc = "";
              this.getItems()
          } catch (error) {
            return true;
          }
        },
        async getArtists() {
          try {
            let response = await axios.get("/api/artists");
            this.artists = response.data;
            return true;
          } catch (error) {
            return true;
          }
        },
        async getItems() {
          try {
            let response = await axios.get("/api/items");
            this.items = response.data;
            return true;
          } catch (error) {
            return true;
          }
        },
        selectItem(item) {
          this.findTitle = "";
          this.findItem = item;
        },
        async deleteItem(item) {
          try {
            await axios.delete("/api/items/" + item._id);
            this.findItem = null;
            this.getItems();
            return true;
          } catch (error) {
            return true;
          }
        },
        async editItem(item) {
          try {
            await axios.put("/api/items/" + item._id, {
              title: this.findItem.title,
              desc: this.findItem.desc,
              artist: this.findItem.artist
            });
            this.findItem = null;
            this.getItems();
            return true;
          } catch (error) {
            return true;
          }
        },
      }
    }
</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  margin-bottom: 50px;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.upload,
.actions{
  display: flex;
  flex-direction: column;
}
</style>
