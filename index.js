function handleInterface () {
    const Toggle_Sidebar=document.querySelector(".js-toggle-sidebar");
    const Filter_Product=document.querySelector(".js-filter-product");
    const Item=document.querySelector(".js-item");
    const List_Item=document.querySelectorAll(".js-item-box");
    const left=document.querySelector(".js-left");
    const filter=document.querySelector('.js-filter');
    Toggle_Sidebar.addEventListener("click",()=>{
        if(Filter_Product.offsetWidth > "0"){
            Filter_Product.classList.add("side-2");
            Filter_Product.classList.remove("gird__column-3")
            Item.classList.remove("gird__column-9");
            Item.classList.add("gird__column-12");
            List_Item.forEach(item=>{
                item.classList.remove("gird__column-9-3");
                item.classList.add("gird__column-12-3");
            });
            left.classList.add('hidden');
            filter.classList.remove('hidden')
        }
        else{
            Filter_Product.classList.remove("side-2");
            Filter_Product.classList.add("gird__column-3")
            Item.classList.add("gird__column-9");
            Item.classList.remove("gird__column-12");
            List_Item.forEach(item=>{
                item.classList.add("gird__column-9-3");
                item.classList.remove("gird__column-12-3");
            });
            left.classList.remove('hidden');
            filter.classList.add('hidden')
        }
        
        
    })
}
handleInterface ()


