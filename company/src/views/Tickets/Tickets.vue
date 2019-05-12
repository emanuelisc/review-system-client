<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-content>
            <ticket-list table-header-color="green"></ticket-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { TicketList } from "@/components";

export default {
  components: {
    TicketList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "ticket-new"
      });
    }
  }
};
</script>