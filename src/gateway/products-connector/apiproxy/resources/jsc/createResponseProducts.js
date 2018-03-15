var response = JSON.parse(context.getVariable("response.content"));

var cursor = response.cursor;
var products = response.entities;
if(products && products.length >0)
{
    for(var i = 0; i< products.length; i++)
    {
        delete products[i].uuid;
        product[i].Id = product.name;
        product[i].Name = product.Text;
        delete product[i].Text;
    }
    var bankProducts = {};
    bankProducts.Data = {};
    bankProducts.Data["BankProducts"] = products;
    bankProducts.Meta = {};
    bankProducts.Links = {};

    if (cursor) 
    {
        bankProducts.Links.next = "/bankProducts?cursor=" + cursor;
    }
    
    context.setVariable("response.content",JSON.stringify(bankProducts));
}