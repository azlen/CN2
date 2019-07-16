<template>
	<div id="page" :class="theme">
		<!-- As the SVG is absolutely positioned, the header needs to be in front of it in the DOM to display -->
		<header-component iconleft="menu" iconright="settings" :functionleft="toggleMenu"></header-component>

        <div class="padded-container">
            <div id="learn-button">
                <div class="weekly-progress">
                    <div class="info">Weekly Progress</div>
                    <div class="progress-bar">
                        <div class="progress-indicator" :style="{'width': weeklyProgress / weeklyGoal}"></div>
                    </div>
                </div> 
                <button v-touch:tap="learnPage">Learn</button>
            </div>
        </div>
        

		<!-- Side Menu; hidden by default  -->
		<div id="close-menu-overlay" :class="menuOpen?'':'hidden'" v-touch:tap="toggleMenu"></div>
		<div id="menu" :class="menuOpen?'':'hidden'">
			<div id="menu-header">
				
			</div>
			<div class="menu-item">Profile</div>
			<div class="menu-item">Statistics</div>
			<div class="menu-item">Words</div>
			<div class="menu-item">Practice</div>
			<div class="menu-item">Settings</div>
		</div>
	</div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
	import metaball from './../../assets/js/metaball.js'
	import router from './../../vue/router/index.js'

	import { mapState, mapActions } from 'vuex'
	
	import { distance, random } from './../../assets/js/util.js'

	export default {
		data(){
			return {
				svgBBox: {},
				svgButton: {
					x: null,
					y: null,
					r: 70
				},
				weeklyProgress: 5,
				weeklyGoal: 20,

				menuOpen: false,
			}
		},
		computed: {
			...mapState('options', {
				'simplifiedOrTraditional': state => state.simplifiedOrTraditional,
				'theme': state => state.theme,
			}),
		},
		components: {
			HeaderComponent,
			//ButtonBig
		},
		methods: {
			learnPage(e) {
				router.push('/learn');
			},
			toggleMenu(e) {
				this.menuOpen = !this.menuOpen;
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
	#page { z-index: -2;}

	#close-menu-overlay {
		position: absolute;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity .17s ease-out .1s, width 0s linear .1s;
		z-index: 100;
		opacity: 1;
		background: rgba(0, 0, 0, 0.5)
	}
	#close-menu-overlay.hidden {
		opacity: 0;
		width: 0%;
		transition: opacity .17s ease-out 0s, width 0s linear .17s;
		/* 
		`display: none` does not work as pointer event is registered  immediately
		and thus the menu is not able to open properly
		*/
		/*transform: translateX(-100%); */
	}

	#menu {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 80%;
		transition: transform .23s ease-out;
		z-index: 101;

		background: #385761;
	}
	#page.paper #menu { background: #4F6EB9 }
	/*#page.paper #menu { background: #FFFFFF }*/

	#page.light #menu { background: #25BEA1 }

	#menu.hidden {
		transform: translateX(-100%);
	}

	#menu-header {
		width: 100%;
		height: 110px;
		background: rgba(255, 255, 255, 0.3);
		margin-bottom: 10px;
	}

	.menu-item {
		box-sizing: border-box;
		width: 100%;
		padding: 15px 20px 15px 50px;
		font-family: "Lato", sans-serif;
		background-color: transparent;
		transition: background-color 0.2s ease-out;
	}
	#page.paper .menu-item,
	#page.light .menu-item {
		color: #FFFFFF;
	}

	.menu-item:active {
		background-color: rgba(0, 0, 0, 0.2);
	}


    #learn-button {
        display: flex;
        border-radius: 10px;
        overflow: hidden;
    }

    #learn-button > button {
        flex: 1 0 1;
        width : 80px;
        box-sizing: border-box;
        padding: 20px;

        background-color: #FF0000;
        border: none;
        outline: none;

        color: #FFFFFF;
    }

    #learn-button > .weekly-progress {
        flex: 1;

        display: flex;
        flex-direction: column;
    }

    #learn-button > .weekly-progress > .info {
        flex: 1;
    }

    #learn-button > .weekly-progress > .progress-bar {
        flex: 1 0 1;
        height: 20px;
        background-color: #00ff00;
        position: relative;
    }

    #learn-button > .weekly-progress > .progress-bar > .progress-indicator {
        position: absolute;
        background-color: #0000ff;
        top: 0; left: 0;
        height: 100%;
    }

</style>
