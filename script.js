
const response = fetch('https://sql-backend-production-6b3b.up.railway.app/get-all-products/display_products')
.then(rawJson=>rawJson.json())
.then(response=>{
    
const container=document.querySelector('.sample-products')

for(let i = 0;i<6;i++){
    let element=response.data[i]
    
    const article=document.createElement("article")
    article.setAttribute("class","product-card")

    const image=document.createElement("img")
    image.setAttribute("src",element.image)
    image.setAttribute("alt",element.name)

    const price=document.createElement("p")
    price.innerHTML="$"+element.price;

    const link=document.createElement("a")
    link.setAttribute("class","display-products-link")
    link.setAttribute("href",element.link)
    link.setAttribute("target","_blank")
    link.innerHTML="View on ebay"

    article.appendChild(image)
    article.appendChild(price)
    article.appendChild(link)

    container.appendChild(article)
}
})
.catch(err=>console.log(err))