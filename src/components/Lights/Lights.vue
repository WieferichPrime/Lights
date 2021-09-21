<template>
    <div class="lights">
        <div class="lights__clock">
            <p> До смены сигнала осталось: {{this.clock}}</p>
            <button
                v-if="this.stop"
                class = 'lights__continue'
                @click = this.timer
            >Продолжить</button>
        </div>

        <light
            class="lights__light"
            v-for="light in lights" :key="light.id"
            :class="{light_red: light.color == 'red',
                     light_yellow: light.color == 'yellow',
                     light_green: light.color == 'green',
                     light_active: light.active
                     }"
        ></light>
    </div>
</template>

<script>
import Light from "../LightItem/LightItem";
export default {
    name: "Lights",
    components: {Light},
    beforeRouteEnter(to, from, next) {
        next(component => {
            component.prevRoute = from
        })
    },
    watch: {
        $route(to, from) {
            this.prevRoute = from;
            this.timer();
        }
    },
    mounted() {
        //console.log(this.prevRoute.path);
        if (sessionStorage.getItem('reload') == 'false') {
            this.timer();
        } else {
            this.clock = sessionStorage.getItem('clock');
            this.lights.forEach( light => light.active = light.color === this.lastColor);
        }
    },
    methods: {
        timer() {
            this.stop = false;
            let next = '';
            this.lights.forEach( (light, index) => {
                light.active = light.color === this.$route.params.color;
                if (light.active) this.active = index;
            });
            if (this.$route.params.color === 'red') {
                this.clock = 10;
                next = 'yellow';
            } else if (this.$route.params.color === 'yellow' ) {
                this.clock = 3;
                if (this.prevRoute.path == '/red') {
                    next = 'green';
                } else if (this.prevRoute.path == '/green') {
                    next = 'red';
                } else {
                    next = 'red';
                }
            } else if (this.$route.params.color === 'green') {
                this.clock = 15;
                next = 'yellow';
            }

            if (sessionStorage.getItem('reload') == 'true' && sessionStorage.getItem('clock')) {
                this.clock = sessionStorage.getItem('clock');
                sessionStorage.setItem('reload', false);
            } else {
                sessionStorage.setItem('clock', this.clock);
            }
            const interval = setInterval(() => {
                if (this.clock <= 0) {
                    clearInterval(interval);
                    this.$router.push(`/${next}`);
                } else if (this.clock <= 3) {
                    this.lights[this.active].active = !this.lights[this.active].active;
                }
                this.clock -= 1;
                sessionStorage.setItem('clock', this.clock);
            }, 1000);
        }
    },
    data() {
        return {
            lights: [
                {
                    id: 0,
                    color: 'red',
                    active: false
                },
                {
                    id: 1,
                    color: 'yellow',
                    active: false
                },
                {
                    id: 2,
                    color: 'green',
                    active: false
                }
            ],
            prevRoute : null,
            clock: 0,
            active: 0,
            stop: sessionStorage.getItem('reload'),
            lastColor: sessionStorage.getItem('lastColor')
        }
    }
}
</script>

<style lang="scss" scoped src="./Lights.scss">

</style>