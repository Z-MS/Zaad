<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/todos">Todos</router-link> |
      <router-link to="/notes">Notes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

:root {
    --success: rgb(17, 204, 17);
    --danger: red;
    --change: royalblue; 
}

body {
	background: linear-gradient(45deg, #6cfd9f, #6887ff);
	min-height: 100vh;
	overflow: auto;
}

button {
    border-width: 0px;
    margin: 5px;
    color: beige;
    font-size: 1.3rem;
}

.success  {
    background-color: var(--success);
}

.danger {
    background-color: var(--danger);
}

.change {
    background-color: var(--change);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  font-size: 1.25rem;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: beige;
    }
  }
}
</style>
