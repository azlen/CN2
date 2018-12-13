<template>
  <router-view></router-view>
</template>

<script>
    export default {
        data(){
            return {
            }
        },
    }
</script>

<style>
    #page{
        height: 100%;
        background: #1A1C1B;

        display: flex;
        flex-direction: column;
    }

    #page.light {
        background: #FFFFFF;
    }

    .filler {
        flex: 1;
    }
</style>
