<template>
    <div class="light"></div>
</template>

<script>
export default {
    name: "Light",
    data() {
        return {
            isActive: false
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
    .light {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-color: grey;
        &_green {
            background-color: green;
        }
        &_red {
            background-color: red;
        }
        &_yellow {
            background-color: yellow;
        }
    }
</style>