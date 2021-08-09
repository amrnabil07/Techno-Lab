const usersApi = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/";

var home = document.getElementById("home")
var about = document.getElementById("About")
var contactt = document.getElementById("contacttus")
var singleee= document.getElementById("singlee")

var cont1=document.getElementById("contact1")
var cont2=document.getElementById("contact2")
var cont3=document.getElementById("contact3")



homeShow();
home.addEventListener('click' ,homeShow)

function homeShow() {
const xhr = new XMLHttpRequest();
xhr.open("GET", usersApi);
xhr.send();
xhr.onload = function () {
  var data = xhr.response;
  if (xhr.status == 200) {
    const products = JSON.parse(xhr.response).data;

    // users list ELement
    const usersListEl = document.querySelector("#usersList");

    products.forEach(product => {

      // Create HTML elements

      var productDiv = document.createElement('div');
      var productNames = document.createElement('h1');
      var productImg = document.createElement('img');
      var productPrices = document.createElement('p');
      var productAdd = document.createElement('p');
    //  var addBtn = document.createElement('button');
      

      // Add style (classes)
   
productDiv.classList.add("card");
productDiv.classList.add("mt-3");
productPrices.classList.add("price");
//addBtn.classList.add("cart");
productNames.classList.add("product_name");
productImg.src = product.ProductPicUrl;
productNames.innerText = product.Name;
productPrices.innerText = `$${product.Price}`;
//addBtn.innerText = "Add to Cart"


productDiv.appendChild(productImg);
productDiv.appendChild(productNames);
productDiv.appendChild(productPrices);
productDiv.appendChild(productAdd);
//productAdd.appendChild(addBtn);
usersListEl.appendChild(productDiv);

var a = product.ProductId;

productDiv.addEventListener('click',function(){
        var xhr3=new XMLHttpRequest();
        xhr3.open('GET','https://afternoon-falls-30227.herokuapp.com/api/v1/products/'+a)
        xhr3.send();
        let template='';
        xhr3.onload = function (){

          var data2 = xhr3.response
          var id = JSON.parse(data2).data

           template+=`
           <div class="container px-4 px-lg-5 my-5 ">
           <div class="row gx-4 gx-lg-5 align-items-center shadow-lg p-3 mb-5 rounded" style="background: white;">
               <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${id.ProductPicUrl}" alt="..." /></div>
               <div class="col-md-6">
                   <div class="small mb-1">${id.ProductId}</div>
                   <h1 class="display-5 fw-bolder">${id.Name}</h1>
                   <div class="fs-5 mb-5">
                       <span class="text-decoration-line-through">$ ${product.Price}</span>
                       <span>$40.00</span>
                   </div>
                   <p class="lead">${id.Description}</p>
                   <div class="d-flex">
                       <input class="form-control text-center me-3" id="inputQuantity" type="number" value="1" min="1" max="${product.Quantity}" style="max-width: 5rem" />
                       <button id="cart" class="btn btn-outline-dark flex-shrink-0" type="button">
                           <i class="bi-cart-fill me-1"></i>
                           Add to cart
                       </button>
                   </div>
               </div>
           </div>
       </div>
           
           
           `
           

           usersListEl.innerHTML=template;

           
          var cart = document.getElementById("cart")
           cart.addEventListener('click' , () => {
            cartNumbers();
          })  
          function onLoadCartNumbers() {
            let pNumbers = localStorage.getItem('cartNumbers');   
            if(pNumbers) {
                document.querySelector('.cart span').textContent = pNumbers;
            }
        }
          function cartNumbers() {
            let pNumbers = localStorage.getItem('cartNumbers');
            pNumbers = parseInt(pNumbers);
            localStorage.setItem('cartNumbers' , 1 );
    
            if(pNumbers) {
              localStorage.setItem('cartNumbers' , pNumbers + 1 )
              document.querySelector(".navbar-nav span").textContent = pNumbers + 1 ;
            } else {
              localStorage.setItem('cartNumbers' , 1)
              document.querySelector('.navbar-nav span').textContent = 1;
            }
            setItem(products)
          }
    
          function setItem() {
            let cartItemes = localStorage.getItem('productsInCart');
    
            cartItemes = JSON.parse(cartItemes);
    
    
    
            if(cartItemes != null) {
    
                if(cartItemes[product.Name] == undefined) {
    
                    cartItemes = {
    
                        ...cartItemes,
    
                        [product.Name] : product  
    
                    }
    
                }
    
                cartItemes[product.Name].inCart += 1;
    
            } else {
    
                product.inCart = 1 ;
    
                cartItemes = {
    
                    [product.Name] : product
    
                }
    
            }
    
            localStorage.setItem("productsInCart", JSON.stringify(cartItemes));
          }
    

          
        } 
      
      })

    });

  
   
  } else {
    console.log("Something went wrong.");
  }

}
}

home.addEventListener("click",function(){
  cont1.style.display="block"
  cont2.style.display="none"
  cont3.style.display="none"

  const usersListEl = document.querySelector("#usersList");
  usersListEl.innerHTML=""  
 // homeShow();


})

about.addEventListener("click",function(){
  cont1.style.display="none"
  cont2.style.display="block"
  cont3.style.display="none"


})

contactt.addEventListener("click",function(){
  cont1.style.display="none"
  cont2.style.display="none"
  cont3.style.display="block"


})

function testt (){
  cont2.style.display="none"
  cont1.style.display="block"
  cont3.style.display="none"
}


testt()


var userApi2= "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us"

var contactForm = document.getElementById("addUserForm");

contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');

 const contactData={
    name : name.value,
    email : email.value,
    subject : subject.value,
    message : message.value,
 };

  // Send request

 var xhrPost=new XMLHttpRequest();
 xhrPost.open("post",userApi2 )
 xhrPost.setRequestHeader("Content-Type", "application/json");
 xhrPost.send(JSON.stringify(contactData))

 console.log(xhrPost.response);
  // Recieve Response and reset the form

 xhrPost.onload =function(){
    console.log("request accepted" );
    contactForm.reset();
 }





})
