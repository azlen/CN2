<template>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
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
    body {
        background: #131415;
    }

    #page{
        height: 100%;

        /* Linear gradient fill with solid colour as backup */
        background: #1A1C1B;
        background: linear-gradient(180deg, #101211 0%, #101D30 100%), #1A1C1B;
        background: linear-gradient(180deg, #101211 0%, #101A25 100%), #1A1C1B;

        display: flex;
        flex-direction: column;
    }

    #page.light {
        background: #FFFFFF;
    }

    .filler {
        flex: 1;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.25s ease-out;
    }

    .fade-enter {
       opacity: 0;
    }
    .fade-leave-active {
         opacity: 0;
    }
</style>
