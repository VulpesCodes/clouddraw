<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/cloud.png">
      </div>
    </router-link>
    <div class="title">
      <h1> CloudDraw</h1>
    </div>
    <div class="menu">
      <div class="menulink">
        <router-link to="/artists"><h1>Artists</h1></router-link>
      </div>
      <div class="menulink">
        <router-link to="/submit"><h1>Submit</h1></router-link>
      </div>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a href="https://github.com/BYU-CS-260-Winter-2020/lab-4-museum-of-ordinary-objects-VulpesCodes">github</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #e3e3e3;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #7e8f9c;
  color: black;
}

.menu {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.menulink {
  padding: 20px 10px;
  padding-top: 22px;
}

.menulink :hover{
  color: white;
}

.menulink a{
  text-decoration: none;
  color: inherit;
}

.logo img {
  width: 100px;
}

.title {
  margin-top: 7px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 35px;
  padding: 20px 100px 0px 100px;
  background: #7e8f9c;
  font-size: 12px;
  position: fixed;
  width: 100%;
  bottom: 0;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
