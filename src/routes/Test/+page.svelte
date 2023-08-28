<script>
    import PDFRender from "$lib/Components/PDFRender.svelte";


    let pdf;

    async function getResume(){

        let res = await fetch("/api/getResume");
        let _res = await res.text()

        return _res;
    }

    const get = getResume();
</script>


{#await get}

<p>...Waiting</p>

{:then promise}
<PDFRender uri={promise}/>
{/await}