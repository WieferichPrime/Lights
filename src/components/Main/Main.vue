<template>
    <div class="main">
    </div>
</template>

<script>

export default {
    name: "Main",
    watch: {
    },
    beforeCreate() {
        sessionStorage.setItem('run', 'true');
        this.$router.push('/red');
    }
}
</script>

<style lang="scss" scoped>
</style>