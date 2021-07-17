<template>
  <div id="app">
    <aside id="nav">
      <ul id="nav__list">
        <li class="nav__item">
            <router-link to="/">
                <!-- <span class="ico nav__icon">history</span> -->
                <unicon name="history" class="nav__icon" fill="limegreen"></unicon>
                <span class="nav__text">Recents</span>
            </router-link>
        </li> 
        <li class="nav__item">
            <router-link to="/tasks/">
                <unicon name="clipboard-notes" class="nav__icon" fill="limegreen"></unicon>
                <!-- <span class="ico nav__icon">&#xe9ba;</span> -->
                <span class="nav__text">Todos</span>
            </router-link>
        </li>
        <li class="nav__item">
            <router-link to="/notes">
                <unicon name="file-alt" class="nav__icon" fill="limegreen"></unicon>
                <!-- <span class="ico nav__icon">&#xe926;</span> -->
                <span class="nav__text">Notes</span>
            </router-link>
        </li> 
        <li class="nav__item">
            <router-link to="/projects">
                <unicon name="folder-open" class="nav__icon" fill="limegreen"></unicon>
                <!-- <span id="projects-icon" class="ico nav__icon">&#xe930;</span> -->
                <span class="nav__text">Projects</span>
            </router-link>
        </li> 
      </ul>
    </aside>
    <main id="view">
        <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
    font-family: 'Fira Sans', 'Segoe UI';
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
    background-color: #eff5f8;
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
	width: 180px;
	background-color: #0E0562;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	overflow: auto;
	a {
		color: white;

		&.router-link-exact-active {
			color: var(--olive);
            font-weight: 600;
		}
	}
}

#nav__list {
    margin-top: 1.25rem; 
}

.nav__item {
    // width: 80%;
	margin-bottom: 1rem;
    // margin-left: -75px;
	font-size: 1.4rem;
}

.nav__icon {
    position: relative;
    // font-size: 1.5rem;
    top: 2px;
    right: 15px;
    // vertical-align: text-bottom;
}

.nav__text {
    font-family: 'Nunito regular';
    font-size: 1.15rem;
    vertical-align: text-top;
    padding-left: 0.5rem;
    font-weight: 500;
}

.nav__text:hover {
    font-weight: 600;
}

#view {
    margin-left: -80px;
    margin-right: 10px; /* THIS IS WHY IT IS CENTERED */
    width: 90%;
}

#projects-icon {
    // left: 2px;
    // padding-right: 1.3rem;
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
    padding-inline-start: 0;
    list-style: none;
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
    font-family: 'Fira Sans';
    src: url('./assets/fonts/FiraSans-Regular.ttf');
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
    // padding: 0 0.5em 0 0.5em;
    // vertical-align: middle;
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
