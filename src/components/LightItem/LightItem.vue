<template>
    <div class="light"><slot></slot></div>
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

<style lang="scss" scoped src="./LightItem.scss">

</style>