<template>
    <div class="screen">
        <div class="screen-image" :style="imgStyle"></div>
        <div class="screen-overlay"></div>
        <div class="screen-content">
            <h1 class="text-3xl font-bold text-white">{{ title }}</h1>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(
{
    image: 
    {
        type: String,
        default: "https://images.unsplash.com/flagged/photo-1572213426852-0e4ed8f41ff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
    },
    filter: 
    {
        type: String,
        default: "none"
    },
    title:
    {
        type: String,
        default: "Title"
    }
})

const imgStyle = 
`
    filter: ${props.filter};
    background-image: url(${props.image});
`;
</script>


<style scoped>
.screen
{
    position: relative;
    width: 25vw;
    border: 4px solid rgb(3, 71, 72, 1);
    aspect-ratio: 10 / 16;
    border-radius: 1rem;
    overflow:hidden;
}

@keyframes pan-overlay 
{
    from 
    {
        background-position: 0 0;
    }

    to 
    {
        background-position: 0 -100%;
    }
}

@keyframes pan-image
{
    0% 
    {
    background-position: 36% 42%;
    background-size: 300%;
    }
  
    20% 
    {
        background-position: 30% 35%;
        background-size: 300%;
    }
  
    20.0001% 
    { 
        background-position: 60% 85%;
        background-size: 500%;
    }
  
    40% 
    {
        background-position: 49% 81%;
        background-size: 500%;
    }
  
    40.0001% 
    {
        background-position: 80% 42%;
        background-size: 300%;
    }
  
    60% 
    {
        background-position: 84% 33%;
        background-size: 300%;
    }
    
    60.0001% 
    { 
        background-position: 0% 0%;
        background-size: 300%;
    }
    
    80% 
    {
        background-position: 15% 4%;
        background-size: 300%;
    }
    
    80.0001% 
    { 
        background-position: 80% 10%;
        background-size: 300%;
    }
    
    100% 
    {
        background-position: 72% 14%;
        background-size: 300%;
    }
}

.screen-overlay
{
    background: linear-gradient(
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1) 3px,
        transparent 3px,
        transparent 9px
    );
    background-size: 100% 9px;
    height: 100%;
    width: 100%;
    animation: pan-overlay 22s infinite linear;
    z-index: 2;
    left: 0px;
    top: 0px;
    position: absolute;
}

.screen > .screen-image 
{
    height: 100%;
    width: 100%;
}

.screen-image
{
    opacity: 1;
    animation: pan-image 35s infinite linear;
    z-index: 0;
}

.screen-content
{
    z-index: 10;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
}

.screen-content > h1
{
    text-align: center;
    position: absolute;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    width: 100%;
    font-size: 3em;
}



</style>