<template>
  <div class="yousupport">
    <p class="text-h5">腰痛を防ぐ</p>
    <YouCheck/>
  </div>
</template>

<script>
    import YouCheck from '../components/YouCheck.vue';

    export default {
        name: 'Timer',
        components: { YouCheck },
    }
</script>