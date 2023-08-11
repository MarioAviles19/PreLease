<script>
    import jsPDF from "jspdf";
	import { onMount } from "svelte";
    let uri = '';

    let resume;

    const doc = new jsPDF();

    onMount(()=>{
        doc.html(resume)
        uri = doc.output('datauristring');
        console.log(doc.output('datauristring'));
    })

</script>

<div bind:this={resume}>
<h1>Gweembo</h1>
<p>Wowie Zowie</p>
</div>

<iframe src={uri} frameborder="0" width="600" height="800"></iframe>