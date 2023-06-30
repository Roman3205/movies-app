<script>

</script>

<template>
    <div class="content mb-5">
        <ul class="social">
            <li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
        </ul>
        <p>©2023 Movies world | All Rights Reserved</p>
    </div>
</template>

<style scoped>
    .content {
        border-top: 2px solid black;
        padding-top: 30px;
    }

    .social {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        flex-wrap: wrap;
    }

    .social li {
        list-style: none;
    }

    .social li a {
        font-size: 2em;
        color: black;
        margin: 0 10px;
        display: inline-block;
        transition: 0.5s;
    } 

    .social li a:hover {
        opacity: 0.6;
    }
    
    p {
        color: black;
        text-align: center;
        margin-top: 15px;
        font-size: 1.1em;
    }
</style>
