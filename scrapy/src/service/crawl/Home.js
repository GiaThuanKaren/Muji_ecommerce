const { GetCatologe, GetListProductFromCatologe } = require("./catologe");
const { writeCSV } = require("./function");
const { GetDetailProduct } = require("./product");

const HomeCrawl = async function () {
    const ListCatologe = await GetCatologe();

    if (ListCatologe) console.log('List Category -> ', ListCatologe)

    for (let catologeItem = 0; catologeItem < ListCatologe.length; catologeItem++) {
        let data = await GetListProductFromCatologe(ListCatologe[catologeItem].linkChild, 1, ListCatologe[catologeItem].catorgoryid)

        console.log('data -> ', data);

        if(data.length > 0){
            for(let product =0;product<data.length;product++){
                let productItem = await GetDetailProduct(`https://yody.vn${data[product].linkProduct}`)
                writeCSV(productItem, "RE_PRODUCT_SKU")
            }
        }
        
    }

}

HomeCrawl();


module.exports = { HomeCrawl }