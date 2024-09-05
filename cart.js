function manipulateCounter(){
    const minus=document.querySelectorAll(".minus");
    const plus=document.querySelectorAll(".plus");
    const numberElement=document.querySelectorAll(".qty-input ");
    minus.forEach((button,index)=>{
        button.addEventListener('click',()=>{
            let currentvalue=numberElement[index].value;
            if(currentvalue>1){
               currentvalue--;
               render(index,currentvalue);
               }
           })
    })
    plus.forEach((button,index)=>{
        button.addEventListener('click',()=>{
            let currentvalue=numberElement[index].value;
            currentvalue++;
            render(index,currentvalue);
           })
    })
    let render=(index,value)=>{
        numberElement[index].value=value;
    }
}
 manipulateCounter()

