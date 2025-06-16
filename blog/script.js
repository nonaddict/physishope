const details=document.querySelector("details")
const summary=document.querySelector("summary")

summary.addEventListener("click",()=>{
    details.classList.toggle("open")
})