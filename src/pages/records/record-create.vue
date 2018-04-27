<template>
  <form class="form-inline mb-3" @submit.prevent="create">
    <div class="form-group mr-3">
      <input type="text" class="form-control" placeholder="date" name="date" v-model="record.date">
    </div>
    <div class="form-group mr-3">
      <input type="text" class="form-control" placeholder="title" name="title" v-model="record.title"/>
    </div>
    <div class="form-group mr-3">
      <input type="text" class="form-control" placeholder="amount" name="amount" v-model="record.amount"/>
    </div>
    <button class="btn btn-primary" type="submit">create record</button>
  </form>
</template>

<script>
export default {
  props: {
    getRecords: {
      type: Function
    }
  },
  data() {
    return {
      record: {
        date: '',
        title: '',
        amount: ''
      }
    };
  },
  methods: {
    async create() {
      try {
        const record = {
          date: this.record.date,
          title: this.record.title,
          amount: parseInt(this.record.amount, 10)
        };
        await this.$http.post('records', record);

        this.getRecords();
      } catch (e) {
        console.error(e.message);
      }
    }
  }
};
</script>
