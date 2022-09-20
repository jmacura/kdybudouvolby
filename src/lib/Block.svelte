<script lang="ts">
  import type { Election, Referendum } from "./elections.type";

  export let election: Election | Referendum
</script>

<div class="border">
{election.type} {election.startDate ?? election.year}
</div>

<style></style>
