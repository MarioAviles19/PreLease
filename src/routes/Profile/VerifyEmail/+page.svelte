<script>
    import {auth} from "$lib/firebase/firebase.client.js"
    import { signInWithCustomToken, sendEmailVerification } from "firebase/auth";
	import { onMount } from "svelte";
    export let data;

    onMount(()=>{
        console.log(data);
        signInWithCustomToken(auth, data.userToken).then((res)=>{
            sendEmailVerification(auth.currentUser,{url: 'http://localhost:5173/'});
        })

    })

</script>
<p>A verification email has been sent to {data.userData.email};</p>