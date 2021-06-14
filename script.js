var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDesc = document.getElementById("productDesc")
var addBtn = document.getElementById("addBtn")
var errorsAlert = document.getElementById("errorsAlert")
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
            errorsAlert.style="display:none;"
        }
        else
        {
            errorsAlert.style="display:inline-block;"
            errorsAlert.innerHTML=errors
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
    addBtn.innerHTML="AddProduct"
    errorsAlert.style="display:none;"
    }
    
   else
   {
   errorsAlert.style="display:inline-block;"
   errorsAlert.innerHTML=errors
    }
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
        <th><button onclick="showUpdateProducts(${i})" class="btn btn-outline-warning">Update</button></th>
        <th><button onclick="deleteEle(${i})" class="btn btn-outline-Danger">Delete</button></th> 
    </tr>`
    }
    document.getElementById("tableBody").innerHTML=cartona
}

function deleteEle(index)
{
productContainer.splice(index,1)
localStorage.setItem("productlist",JSON.stringify(productContainer))
display ()
addBtn.innerHTML="AddProduct"
clearproduct()
}

function showUpdateProducts(index)
{
    productName.value=productContainer[index].name
    productPrice.value=productContainer[index].price
    productCategory.value=productContainer[index].cate
    productDesc.value=productContainer[index].desc
    addBtn.innerHTML="Update"
    x=index 
}

function search(searchTerm)
{

    cartona=``
    for(var i = 0 ; i<productContainer.length ;i++)
    {
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true
        ||productContainer[i].cate.toLowerCase().includes(searchTerm.toLowerCase())==true )
        {
            cartona+=`<tr>
            <th id="demo">${i}</th>
            <th>${productContainer[i].name}</th>
            <th>${productContainer[i].price}</th>
            <th>${productContainer[i].cate}</th>
            <th>${productContainer[i].desc}</th>
            <th><button class="btn btn-outline-warning">Update</button></th>
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


function validateNameInput()
{
    var regex = /^[A-Z][ a-zA-Z]{2,10}$/
    if (regex.test(productName.value)==true)
    {
        return true
    }       
    else
    {
        errors += `Enter Valid Name (First Letter : Capital - Then:From 2 To 10 Any Capital Or Small Letters)`
        return false
    }
}
function validatePriceInput()
{
    var regex = /^([1-9][0-9][0-9][0-9]?|10000)$/ //100-10000
    if (regex.test(productPrice.value)==true)
    {
        return true
    }       
    else
    {
        errors += `Enter Valid Price (Numbers From:100 - To:10000 )`
        return false
    }
}
function validateCategoryInput()
{
    var regex = /^[A-Z][ a-zA-Z]{1,10}$/ 
    if (regex.test(productCategory.value)==true)
    {
        return true
    }       
    else
    {
        errors += `Enter Valid Category (First Letter : Capital - Then:From 1 To 10 Any Capital Or Small Letters)`
        return false
    }
}
function validateDescInput()
{
    var regex = /^[A-Z][ a-zA-Z]{2,20}$/ 
    if (regex.test(productDesc.value)==true)
    {
        return true
    }       
    else
    {
        errors += `Enter Valid Description (First Letter : Capital - Then:From 2 To 20 Any Capital Or Small Letters)`
        return false
    }
}
