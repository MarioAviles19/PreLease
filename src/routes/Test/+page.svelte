<script>
    import PDFRender from "$lib/Components/PDFRender.svelte";


    let pdf;

    async function getResume(){

        let res = await fetch("/api/getResume");
        console.log("Weeeembo")
        let _res = await res.text()
        console.log(_res);
        return _res;
    }

    const get = getResume();
</script>


{#await get}

<p>...Waiting</p>

{:then promise}
<PDFRender uri={promise}/>
{/await}