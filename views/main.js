const restaurantList=document.getElementById('res-list');
const parent_element=document.querySelector('body');


window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    console.log("content is loading")
    showRestaurants()
});


const showRestaurants=function(){
    axios({
        method:'get',
        url: `http://localhost:8000/restaurant/restaurants`,
    })
    .then(res=>{
        console.log(res.data.Restaurants)
        restaurantList.innerHTML='';
        if(res.data.Restaurants!=undefined){
            res.data.Restaurants.forEach(element => {
                var li = document.createElement('li');
                li.className='res-item';
                li.innerHTML=`<a class="restaurants" id="res${element.id}">"${element.name}" at ${element.address}</a>`;
                restaurantList.appendChild(li);
                });
            }
    })
    .catch(err=>console.log(err))
}

parent_element.addEventListener('click',(e)=>{
    e.preventDefault()
    if(e.target.className==='restaurants'){
        const restaurantId=e.target.id.slice(3)
        console.log(restaurantId)
        localStorage.setItem('restaurantId',restaurantId)
        window.location.href=`/restaurant.html`
    }
});