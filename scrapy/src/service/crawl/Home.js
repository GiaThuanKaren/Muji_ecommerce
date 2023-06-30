const { GetCatologe, GetListProductFromCatologe } = require("./catologe");
const { GetDetailProduct } = require("./product");

const HomeCrawl = async function () {
    const ListCatologe = await GetCatologe();
    console.log(ListCatologe)
    for (let catologeItem = 0; catologeItem < ListCatologe.length; catologeItem++) {
        let data = await GetListProductFromCatologe(ListCatologe[catologeItem].originalLink)
        
        if(data.length>0){
            for(let product =0;product<data.length;product++){
                await GetDetailProduct(`https://tiki.vn${data[product].linksp}`)
                
            }
        }
        
    }

}

HomeCrawl();


module.exports = { HomeCrawl }