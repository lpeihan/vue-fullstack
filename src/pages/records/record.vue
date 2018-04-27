<template>
  <tr>
    <template v-if="!edit">
      <td>{{initRecord.date}}</td>
      <td>{{initRecord.title}}</td>
      <td>{{initRecord.amount}}</td>
      <td>
        <button class="btn btn-info mr-3" @click="toggle">edit</button>
        <button class="btn btn-danger" @click="deleteRecord">delete</button>
      </td>
    </template>
    <template v-else>
      <td><input type="text" class="form-control" v-model="record.date"/></td>
      <td><input type="text" class="form-control" v-model="record.title"/></td>
      <td><input type="text" class="form-control" v-model="record.amount"/></td>
      <td>
        <button class="btn btn-info mr-3" @click="updateRecord">update</button>
        <button class="btn btn-danger" @click="toggle">cancel</button>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  props: {
    initRecord: {
      type: Object
    },
    getRecords: {
      type: Function
    }
  },
  data() {
    return {
      edit: false,
      record: {
        title: this.initRecord.title,
        date: this.initRecord.date,
        amount: this.initRecord.amount
      }
    };
  },
  methods: {
    toggle() {
      this.edit = !this.edit;
    },
    async deleteRecord() {
      try {
        await this.$http.delete(`records/${this.initRecord._id}`);
        this.getRecords();
      } catch (e) {
        console.error(e.message);
      }
    },
    async updateRecord() {
      try {
        await this.$http.put(`records/${this.initRecord._id}`, this.record);
        this.toggle();
        this.getRecords();
      } catch (e) {
        console.error(e.message);
      }
    }
  }
};
</script>
