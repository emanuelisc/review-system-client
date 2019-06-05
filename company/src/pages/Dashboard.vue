<template>
  <div class="content">
    <div class="md-layout">
<md-card>
      <md-card-header>
        <div class="md-title">Sveiki atvykę į atsiliepimų administravimo svetainę paslaugų tiekėjams!
        </div>
      </md-card-header>

      <md-card-content>
        Norėdami atlikti veiksmus, pasirinkite kairėje pusėje.
      </md-card-content>

    </md-card>

    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
    };
  }
};
</script>
