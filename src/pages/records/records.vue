<template>
  <div class="container">
    <h2 class="text-center mb-3">Records</h2>

    <div class="row mb-3">
      <amount-box text="Credit" type="success" :amount="20"></amount-box>
      <amount-box text="Debit" type="danger" :amount="10"></amount-box>
      <amount-box text="Balance" type="info" :amount="50"></amount-box>
    </div>

    <record-create :get-records="getRecords"></record-create>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
        <record v-for="record in records" :key=record._id :init-record="record"
          :get-records="getRecords"></record>
      </thead>
    </table>

  </div>
</template>

<script>
import AmountBox from './amount-box';
import RecordCreate from './record-create';
import Record from './record';

export default {
  components: {
    AmountBox,
    RecordCreate,
    Record
  },
  data() {
    return {
      records: []
    };
  },
  methods: {
    async getRecords() {
      try {
        this.records = (await this.$http.get('records')).data;
      } catch (err) {
        console.error(err.message);
      }
    }
  },
  mounted() {
    this.getRecords();
  }
};
</script>
