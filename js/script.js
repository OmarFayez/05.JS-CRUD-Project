var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDesc = document.getElementById("productDesc")
var addBtn = document.getElementById("addBtn")
var errorsAlert = document.getElementById("errorsAlert")

let alert1 =document.getElementById("alert1")
let alert2 =document.getElementById("alert2")
let alert3 =document.getElementById("alert3")
let alert4 =document.getElementById("alert4")


var x ; // Index Of Object You Want To Update
var errors =``

var productContainer;
if(localStorage.getItem("productlist")==null)
{
    productContainer=[];
}
else
{
    productContainer =JSON.parse( localStorage.getItem("productlist"))
    display()
}

function addProduct()
{
    errors =``
    if(addBtn.innerHTML=="AddProduct")
    {
        if(validateNameInput()==true && validatePriceInput()==true 
        && validateCategoryInput()==true && validateDescInput()==true)
        {  
            var product = 
            {
                name:productName.value,
                price:productPrice.value,
                cate:productCategory.value,
                desc:productDesc.value,
            }
            productContainer.push(product)
            localStorage.setItem("productlist",JSON.stringify(productContainer))  
            clearproduct()
            display ()
           ResetInputs ()
        }
        else
        {
            wrongAlert ()
        }

    }
    else
    {
        updateProduct()
    }
}
function updateProduct()
{
    if(validateNameInput()==true && validatePriceInput()==true 
    && validateCategoryInput()==true && validateDescInput()==true)
    {
    productContainer.splice(x,1,{name:productName.value ,price:productPrice.value,cate:productCategory.value,desc:productDesc.value})
     localStorage.setItem("productlist",JSON.stringify(productContainer))  
    display ()
    clearproduct()
    ResetInputs ()
    addBtn.innerHTML="AddProduct"
    }
    
   else
   {
    wrongAlert ()
    }
}
function ResetInputs ()
{  
    productName.classList.remove("is-valid")
    productPrice.classList.remove("is-valid")
    productCategory.classList.remove("is-valid")
    productDesc.classList.remove("is-valid")
    productName.classList.remove("is-invalid")
    productPrice.classList.remove("is-invalid")
    productCategory.classList.remove("is-invalid")
    productDesc.classList.remove("is-invalid")
    errorsAlert.classList.replace("d-block","d-none")
    alert1.classList.replace("d-block","d-none")
    alert2.classList.replace("d-block","d-none")
    alert3.classList.replace("d-block","d-none")
    alert4.classList.replace("d-block","d-none")
}
function wrongAlert ()
{
    errorsAlert.innerHTML=errors;
    errorsAlert.classList.replace("d-none","d-block")
    alert1.classList.replace("d-block","d-none")
    alert2.classList.replace("d-block","d-none")
    alert3.classList.replace("d-block","d-none")
    alert4.classList.replace("d-block","d-none")
    
   
     // nameInput.classList.remove("is-invalid")
    // emailInput.classList.remove("is-invalid")
    // passwordInput.classList.remove("is-invalid")
}

function clearproduct()
{
    productName.value=""
    productPrice.value=""
    productCategory.value=""
    productDesc.value=""

}

function display ()
{
    var cartona="";
    for (var i=0 ; i<productContainer.length;i++)
    {
        cartona+=`<tr>
        <th id="demo">${i}</th>
        <th>${productContainer[i].name}</th>
        <th>${productContainer[i].price}</th>
        <th>${productContainer[i].cate}</th>
        <th>${productContainer[i].desc}</th>
        <th><button onclick="showUpdateProducts(${i})" class="btn btn-warning">Update</button></th>
        <th><button onclick="deleteEle(${i})" class="btn btn-outline-Danger">Delete</button></th> 
    </tr>`
    }
    document.getElementById("tableBody").innerHTML=cartona
}

function deleteEle(index)
{
    if(window.confirm("Are You Sure You Want To Delete This Product ?")==true)
    {
        productContainer.splice(index,1)
        localStorage.setItem("productlist",JSON.stringify(productContainer))
        display ()
        addBtn.innerHTML="AddProduct"
        // clearproduct()
    }

}

function showUpdateProducts(index)
{
    productName.value=productContainer[index].name
    productPrice.value=productContainer[index].price
    productCategory.value=productContainer[index].cate
    productDesc.value=productContainer[index].desc
    addBtn.innerHTML="Update"
    x=index 
    ResetInputs ()
 
}

function search(searchTerm)
{

    cartona=``
    for(var i = 0 ; i<productContainer.length ;i++)
    {
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true
        ||productContainer[i].cate.toLowerCase().includes(searchTerm.toLowerCase())==true
        ||productContainer[i].desc.toLowerCase().includes(searchTerm.toLowerCase())==true
        ||productContainer[i].price.toLowerCase().includes(searchTerm.toLowerCase())==true )
        {
            cartona+=`<tr>
            <th id="demo">${i}</th>
            <th>${productContainer[i].name}</th>
            <th>${productContainer[i].price}</th>
            <th>${productContainer[i].cate}</th>
            <th>${productContainer[i].desc}</th>
            <th><button class="btn btn-warning">Update</button></th>
            <th><button onclick="deleteEle(${i})" class="btn btn-outline-Danger">Delete</button></th> 
        </tr>`
        }
        else
        {
            console.log("Not Found")
        }
    }
    document.getElementById("tableBody").innerHTML=cartona
}

productName.addEventListener("keyup",validateNameInput)
function validateNameInput()
{
    console.log("fd")
    var regex = /^[A-Z][ a-zA-Z]{2,10}$/
    if (regex.test(productName.value)==true)
    {
        productName.classList.add("is-valid")
        productName.classList.remove("is-invalid")
        alert1.classList.replace("d-block","d-none")
        return true
    }       
    else
    {
        productName.classList.add("is-invalid")
        productName.classList.remove("is-valid")
        alert1.classList.add("d-block")
        alert1.innerHTML=`Enter Valid Name (First Letter : Capital - Then:From 2 To 10 Any Capital Or Small Letters)`

        errors += `Enter Valid Name`
        return false
    }
}
productPrice.addEventListener("keyup",validatePriceInput)
function validatePriceInput()
{
    var regex = /^([1-9][0-9][0-9][0-9]?|10000)$/ //100-10000
    if (regex.test(productPrice.value)==true)
    {
        productPrice.classList.add("is-valid")
        productPrice.classList.remove("is-invalid")
        alert2.classList.replace("d-block","d-none")
        return true
    }       
    else
    {
        productPrice.classList.add("is-invalid")
        productPrice.classList.remove("is-valid")
        alert2.classList.add("d-block")
        alert2.innerHTML= `Enter Valid Price (Numbers From:100 - To:10000 )`

        errors += `Enter Valid Price `
        return false
    }
}
productCategory.addEventListener("keyup",validateCategoryInput)
function validateCategoryInput()
{
    var regex = /^[A-Z][ a-zA-Z]{1,10}$/ 
    if (regex.test(productCategory.value)==true)
    {
        productCategory.classList.add("is-valid")
        productCategory.classList.remove("is-invalid")
        alert3.classList.replace("d-block","d-none")
        return true
    }       
    else
    {
        productCategory.classList.add("is-invalid")
        productCategory.classList.remove("is-valid")
        alert3.classList.add("d-block")
        alert3.innerHTML= `Enter Valid Category (First Letter : Capital - Then:From 1 To 10 Any Capital Or Small Letters)`

        errors += `Enter Valid Category`
        return false
    }
}
productDesc.addEventListener("keyup",validateDescInput)
function validateDescInput()
{
    var regex = /^[A-Z][ a-zA-Z]{2,20}$/ 
    if (regex.test(productDesc.value)==true)
    {
        productDesc.classList.add("is-valid")
        productDesc.classList.remove("is-invalid")
        alert4.classList.replace("d-block","d-none")
        return true
    }       
    else
    {
        productDesc.classList.add("is-invalid")
        productDesc.classList.remove("is-valid")
        alert4.classList.add("d-block")
        alert4.innerHTML= `Enter Valid Description (First Letter : Capital - Then:From 2 To 20 Any Capital Or Small Letters)`

        errors += `Enter Valid Description `
        return false
    }
}
