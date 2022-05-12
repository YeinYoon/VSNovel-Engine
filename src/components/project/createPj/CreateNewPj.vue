<template>
<div class="RouterView">

    <div>
        <InputPj
        :type="'V'"></InputPj>
    </div>
    
</div>
</template>

<script>
import InputPj from './InputPj.vue'
export default {
    name:"CreateNewPj",
    data() {
        return {
        }
    },
    methods : {
    },
    components : {
        InputPj
    }
}
</script>

<style>

</style>