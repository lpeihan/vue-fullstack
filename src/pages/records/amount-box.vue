<template>
  <div class="col">
    <div class="card">
      <div class="card-header text-white" :class="'bg-' + type">
        {{text}}
      </div>
      <div class="card-body">
        {{amount}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    type: String,
    amount: Number
  }
};
</script>
