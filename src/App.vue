<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li class="nav__item">
            <router-link to="/">
                <span class="ico nav__icon">history</span>
                <span class="nav__text">Recents</span>
            </router-link>
        </li> 
        <li class="nav__item">
            <router-link to="/tasks/">
                <span class="ico nav__icon">&#xe9ba;</span>
                <span class="nav__text">Todos</span>
            </router-link>
        </li>
        <li class="nav__item">
            <router-link to="/notes">
                <span class="ico nav__icon">&#xe926;</span>
                <span class="nav__text">Notes</span>
            </router-link>
        </li> 
        <li class="nav__item">
            <router-link to="/projects">
                <span id="projects-icon" class="ico nav__icon">&#xe930;</span>
                <span class="nav__text">Projects</span>
            </router-link>
        </li> 
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
    font-family: 'Segoe UI';
}

:root {
    --success: rgb(17, 204, 17);
    --danger: red;
    --change: royalblue; 
    --deepblue: #02021A;
    --olive: #A3CE65;
}

body {
	// background: linear-gradient(45deg, #6cfd9f, #6887ff);
    background-color: white;
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
	width: 20%;
	background-color: #0E0562;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	overflow: auto;
	// font-size: 1.5rem;
	a {
		font-weight: bold;
		color: white;

		&.router-link-exact-active {
			color: var(--olive)
		}
	}
}

.nav__item {
    // width: 80%;
	margin-bottom: 1rem;
    margin-left: 1rem;
	font-size: 1.8rem;
}

.nav__text {
    font-size: 1.5rem;
}

.nav__icon {
    position: relative;
    font-size: 2rem;
    top: 2px;
    right: 20px;
}

#projects-icon {
    left: 2px;
    padding-right: 1.3rem;
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


/*li:hover {
	background-color: black;
}*/

@font-face {
	font-family: 'IcoMoon';
	src: url('./assets/fonts/IcoMoon-Free.ttf');
}

@font-face {
    font-family: 'Nunito regular';
    src: url('./assets/fonts/nunito.regular.ttf');
}

@font-face {
    font-family: 'Nunito bold';
    src: url('./assets/fonts/nunito.bold.ttf');
}

.ico {
	font-family: 'IcoMoon';
}

.nunito-reg {
    font-family: 'Nunito regular';
}

.nunito-bold {
    font-family: 'Nunito bold';
}

.highlight--white:hover {
    background-color: white;
    color: black;
}
</style>
