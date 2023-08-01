<script>

</script>

<section class="">
    
    <h1>
        Rate My Landlord
    </h1>
    <form action="/Community/RateMyLandlord/Search">
        <input aria-label="Search" type="text" name="address" placeholder="Enter Address (e.g., 1234 Hennepin Ave. Minneapolis, MN)">
        
    </form>
        
</section>
<div class="background">
    <img src="/longBrownstone.jpg" alt="Background of a brownstone building">
    <div class="glassTint overlay"></div>
</div>

<style>
    h1{
        font-size: 3rem;
        color:var(--color-light-text)
    }
    section{
        margin-top:6rem;
        width:100%;
        text-align: center;
    }
    input[type=text]{
        color:var(--color-light-text);
        font-size: 1.2rem;
        background:none;
        box-shadow: 0px 4px var(--color-light-text);
        min-width: 40rem;
    }
    input[type=text]::placeholder{
        color:rgba(255, 255, 255, 0.579);
    }
    button{
        padding:.5rem;
        outline: none;
        border: none;
        font-size: 2rem;
        border-radius: 7px;
    }
    .overlay{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
    .background{
        z-index: -1;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
    .background img{
        position: absolute;
        display: block;
        top:0;
        left:0;
        width:100%;
        height:100%;
        object-fit: cover;
    }

</style>