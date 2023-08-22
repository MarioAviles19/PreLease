<script>
    export let data;



</script>

<h1>Rental Resume</h1>
<h2>{data.userData.firstName} {data.userData.lastName}</h2>

<h3>Objective</h3>
<p>{data.resume.objectiveStatement}</p>

<h3>Background</h3>
<p>{data.resume.backgroundStatement}</p>

<h3>Rental History</h3>
{#each data.resume.rentalHistory as entry}

<h4>{entry.address}</h4>
<p>{entry.rent}/mo</p>
<p>{entry.reasonForLeaving}</p>
<h4>Start Date</h4>
<p>{new Date(entry.startDate._seconds * 1000).toLocaleString('default',{month:"long"})} {new Date(entry.startDate._seconds * 1000).getFullYear()}</p>
<h4>End Date</h4>
<p>{new Date(entry.endDate._seconds * 1000)}</p>
{/each}