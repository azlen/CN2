<template>
    <div id="page" :class="theme">
		<header-component></header-component>

        <div class="paddedContainer align-bottom">
            <input class="login-input" type="text"/>
            <input class="login-input" type="password"/>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
    .align-bottom {
        /*margin-top: auto;*/
    }
    .login-input {
        box-sizing: border-box;
        width: 100%;
        background: #122834;
        font-family: "Lato", sans-serif;
        padding: 15px 20px;
        border-radius: 10px;
        border: none;
        margin: 10px 0px 15px 0px;
        color: #FFFFFF;
        font-size: 12pt;
        outline: none;
    }
</style>

