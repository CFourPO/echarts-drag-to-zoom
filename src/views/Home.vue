<template>
  <div class="home">
    <EchartsContainer></EchartsContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import EchartsContainer from '@/components/EchartsContainer.vue'; // @ is an alias to /src

@Component({
  components: {
    EchartsContainer,
  },
})
export default class Home extends Vue {}
</script>
