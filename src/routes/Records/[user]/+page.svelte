<script>
	import { onMount } from 'svelte';

    export let data;




</script>

{JSON.stringify(data.reports[0])}

{!data.reports? "Congrats": "No RentalHealthCheck has been done yet"}