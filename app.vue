<template>
    <div id="app">
        <Navbar/>
        <div class="flex flex-col lg:flex-row items-center justify-evenly min-h-screen py-0 screen-holder">
            <Screen class="screen" image="https://images.unsplash.com/photo-1561553590-267fc716698a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80" filter="grayscale(100%) brightness(60%) sepia(100%) hue-rotate(60deg) saturate(250%) contrast(0.8);" title="Forecasting"/>
            <Screen class="screen" image="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" filter="grayscale(100%) brightness(60%) sepia(100%) hue-rotate(140deg) saturate(250%) contrast(0.8);" title="Solar Generation"/>
            <Screen class="screen" image="https://images.unsplash.com/flagged/photo-1572213426852-0e4ed8f41ff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80" filter="grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-55deg) saturate(250%) contrast(0.8);" title="Waste Reduction"/>
        </div>
        <div id="blob">
            <p id="blobIcon">🡒</p>
        </div>
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

onMounted(() => 
{
    initFlowbite();

    const blob = document.getElementById('blob');
    document.body.onpointermove = event =>
    {
        const { clientX, clientY } = event;

        blob.animate(
        {
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { duration: 3000, fill: "forwards" });
    }

    const screens = document.getElementsByClassName('screen');
    const blobIcon = document.getElementById('blob').firstElementChild;
    for (let i = 0; i < screens.length; i++)
    {
        //expand blob on hover over screen and contract on mouseleave

        screens[i].onmouseenter = () =>
        {
            blob.animate(
            {
                width: "100px",
                height: "100px",
                opacity: 1
            }, { duration: 200, fill: "forwards" });
            
            blobIcon.animate(
            {
                opacity: 1,
                transform: "scale(2)"
            }, { duration: 200, fill: "forwards" });

            
            //darken other screens
            for (let j = 0; j < screens.length; j++)
            {
                if (j != i)
                {
                    screens[j].animate(
                    {
                        filter: "brightness(0.5)"
                    }, { duration: 200, fill: "forwards" });
                }
            }

            const checkIntersection = setInterval(() =>
            {
                const blobRect = blob.getBoundingClientRect();
                const screenRect = screens[i].getBoundingClientRect();

                //if the blob is outside the screen considering its original size of 50px, contract it back to 50px
                if (blobRect.left > screenRect.right || blobRect.right < screenRect.left || blobRect.top > screenRect.bottom || blobRect.bottom < screenRect.top)
                {
                    blob.animate(
                    {
                        width: "50px",
                        height: "50px",
                        opacity: 0.5
                    }, { duration: 200, fill: "forwards" });

                    blobIcon.animate(
                    {
                        opacity: 0,
                        transform: "scale(1)"
                    }, { duration: 200, fill: "forwards" });

                    //restore brightness of other screens
                    for (let j = 0; j < screens.length; j++)
                    {
                        screens[j].animate(
                        {
                            filter: "brightness(1)"
                        }, { duration: 200, fill: "forwards" });
                    }

                    clearInterval(checkIntersection);
                }
            }, 100);
        }
    }
})

</script>



<style>

body
{
    background-color: #1d1d1d;
    cursor: none;
}

</style>

<style scoped>

#app 
{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
}

.screen-holder
{
    position: relative;
    z-index: 1;
}

.screen-active
{
    border: 5px solid red;
}


#blob
{
    background-color: white;
    height: 50px;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    animation: rotate 10s infinite;
    opacity: 0.5;
    z-index: 8;
}

#blob #blobIcon
{
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    font-size: 18px;
    color: #1d1d1d;
    opacity: 0;
}
</style>
