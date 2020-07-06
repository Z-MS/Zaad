<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">HOME</router-link></li> 
        <li><router-link to="/todos/">ToDos</router-link></li>
        <li><router-link to="/notes">NOTES</router-link></li> 
        <li><router-link to="/projects">PROJECTS</router-link></li> 
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

:root {
    --success: rgb(17, 204, 17);
    --danger: red;
    --change: royalblue; 
}

body {
	background: linear-gradient(45deg, #6cfd9f, #6887ff);
	min-height: 100vh;
	overflow: auto;
	// margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
	margin-top: 0%; 
	padding: 0;
	width: 30%;
	background-color: rgb(59, 172, 218);
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	overflow: auto;
	font-size: 1.25rem;
	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: beige;
		}
	}
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

ul {
    list-style: none;
    padding-inline-start: 0;
    font-size: 1.5rem;
}

li:hover {
	background-color: black;
}
</style>
