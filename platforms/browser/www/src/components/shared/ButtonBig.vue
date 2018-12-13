<template>
	<router-link class="buttonBig" :to="to">
		<div class="buttonTitle">{{ title }}</div>
		<div class="buttonDescription">{{ description }}</div>
	</router-link>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		props: {
			to: String,
        	title: String,
        	description: String
        },
	}
</script>

<style scoped>
	.buttonBig {
		display: block;
		text-decoration: none;
		-webkit-tap-highlight-color: rgba(0,0,0,0);

		padding: 15px 25px 20px 25px;
		margin-top: 20px;

		background: #2F2C2C;

		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
		border-radius: 10px;

		transition: background .1s ease-out;
	}

	#page.light .buttonBig {
		background: #DADADA;
		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
	}

	.buttonBig:active {
		background: #3F3C3C;
	}
	#page.light .buttonBig:active { background: #CACACA }

	.buttonBig.gradient {
		background: linear-gradient(149.49deg, #4838A7 29.56%, #961EF5 87.77%);
		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.5);
		padding-bottom: 60px;
	}
	#page.light .buttonBig.gradient {
		background: linear-gradient(149.49deg, #5841E8 29.56%, #AE2AFF 87.77%);
		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
	}


	/*.buttonBig.gradient:active {
		background: linear-gradient(149.49deg, #5841E8 29.56%, #AE2AFF 87.77%);
	}*/

	.buttonBig .buttonTitle {
		color: #FFFFFF;
		font-family: 'Khula', sans-serif;
		font-size: 24px;
		font-weight: 800;
		text-rendering: preciseGeometry;
	}
	#page.light .buttonBig .buttonTitle { color: #000000 }

	.buttonDescription {
		font-family: "Cousine", monospaced;
		margin-top: -6px;
		font-style: italic;
		font-size: 13px;
		color: #C6BABA;
	}
	#page.light .buttonBig .buttonDescription { color: #415462 }

	.buttonBig.gradient .buttonTitle,
	.buttonBig.gradient .buttonDescription {
		color: #FFFFFF !important;
	}
</style>
