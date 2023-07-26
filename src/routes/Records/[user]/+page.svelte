<script>
	import { onMount } from 'svelte';

    export let data;

    console.log(data.reports)


</script>

{JSON.stringify(data.reports[0])}