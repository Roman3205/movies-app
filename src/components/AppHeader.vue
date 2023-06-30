<script >

export default {
    methods: {
        goMain() {
            this.$router.push({
                name: 'main'
            })
        }
    }
}

</script>

<template>
    <div class="content mt-5" @click="goMain">
        <h1 class="my-2">MOVIES WORLD</h1>
        <h5><u><i>♥ The best place, where are you ever watching films ♥</i></u></h5>
    </div>
</template>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .content h1 {
        background: linear-gradient(to right, rgb(251, 121, 143), rgb(250, 101, 126), rgb(222, 104, 222), rgb(215, 53, 215), purple);
        font-weight: bold;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: #0B2349;
    }

    .content h5 {
        background: linear-gradient(to right, coral, orange);
        font-weight: bold;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: #0B2349;
    }

</style>
