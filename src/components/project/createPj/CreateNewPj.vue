<template>
<div class="RouterView">

    <div v-if="type == null">
        <SelectType
        @selectType="inputType"></SelectType>
    </div>
  
    <div v-else>
        <InputPj
        :type="type"></InputPj>
    </div>
    
</div>
</template>

<script>
import SelectType from './SelectType.vue'
import InputPj from './InputPj.vue'
export default {
    name:"CreateNewPj",
    data() {
        return {
            type : null
        }
    },
    methods : {
        inputType(val) {
            this.type = val;
            console.log(val);
        }
    },
    components : {
        SelectType,
        InputPj
    }
}
</script>

<style>

</style>