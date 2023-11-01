const puppeteer = require("puppeteer");
const { autoScroll, writeCSV } = require("./function");
const fs = require("fs");
const axios = require("axios").default


const { stringify } = require("csv-stringify");
const PageURL = "https://yody.vn/";

const GetCatologe = async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(PageURL);
    const GetCatologe = await page.evaluate(() => {
        // const NavBarItem = document.querySelector(
        //     ".header-nav .item_big:first-child"
        // )
        // const CatologeItemEle = NavBarItem.querySelectorAll(
        //     ".nav-item.has-mega"
        // );

        const CategoriesElement = document?.querySelectorAll(".menu_silebar_wrapper .menu_silebar_list .menu_silebar_item");

        let result = [];
        CategoriesElement.forEach((item, index) => {
            
            // Function convert Categories
            function ConvertToASCII(stringConvert) {
                let sum = 0;
                for (let i = 0; i < stringConvert.length; i++) {
                    let asc = stringConvert.charCodeAt(i);
                    sum += asc; 
                }
                return sum;
            }

            let idCategoriesAndLink = item?.querySelector(".category_item").getAttribute("href")
            let thumbnail = item?.querySelector(".image img").getAttribute("src");
            let title = item?.querySelector(".category_item .title").innerHTML;

            result.push({
                catorgoryid: ConvertToASCII(idCategoriesAndLink),
                // image_category: thumbnail,
                // name_category: title,
                // parent_id: null,
                // product_line: 1,
                // linkParent: ParentCateloge.getAttribute("href"),
                linkChild: "https://yody.vn" + idCategoriesAndLink,
                // parentCateloge: ParentCateloge.getAttribute("title"),
            });
        });

        return result;
    });
    
    await browser.close();
    return GetCatologe;
}


const GetListProductFromCatologe = async function (link, numberPage = 1, idCategory) {
    let Product = [];

    try {
        for (var numpage = 1; numpage <= numberPage; numpage++) {
            const browser = await puppeteer.launch({
                headless: true
            });
            const page = await browser.newPage();
            const url = `${link}?page=${numpage}`
            await page.goto(url);
            await autoScroll(page);

            console.log('link -> ', url);

            console.log('idCate -> ', idCategory);
            
            const ListProduct = await page.evaluate(async (idCategory) => {
                let resutl = [];
                let productSku = [];

                // window.location.href -> https://yody.vn/ao-polo-nu?q=collections:2735856&page=2&view=grid
                const ListProductEle = document?.querySelectorAll(".variants.product-action.wishItem")

                ListProductEle.forEach((item, index) => {
                    const urlParams = new URLSearchParams(window.location.search); // ?page=2
                    const myParam = urlParams.get('page'); // 2
                    let id = item.querySelector(".product-thumbnail").getAttribute("data-id")
                    let nameProduct = item?.querySelector(".image_thumb  img")?.getAttribute("alt");
                    let linkProduct = item?.querySelector(".image_thumb").getAttribute("href").toString();
                    // let price = item?.querySelector(".product-info .price ")?.innerHTML.replace(".000đ", "000");
                    // let thumbnail = item?.querySelector(".image_thumb > img").getAttribute("src")?.replace("//", "https://").toString();

                    const ProductVariants = item.querySelectorAll(".product-info .swatch-element");

                    // ProductVariants.forEach(variants => {
                    //     let color = variants.querySelector("label").getAttribute("title");
                    //     let backgroundW38H50 = "";
                    //     let backgroundSku = variants.querySelector("label").getAttribute("style");
                    //     let backgroundOriginal = variants.querySelector("label").getAttribute("data-scolor")?.replace("//", "https://").toString();

                    //     if (backgroundSku) backgroundW38H50 = backgroundSku.match(/background-image:url\(["']?([^"']*)["']?\)/gm)

                    //     productSku.push({
                    //         color,
                    //         backgroundW38H50,
                    //         backgroundOriginal
                    //     })
                    // })


                    if (id) {
                        resutl.push({
                            linkProduct,
                            // product_id: id,
                            // name_product: nameProduct,
                            // product_description: '',
                            // quantity_stock: 100,
                            // price,
                            // thumbnail,
                            // sku: productSku
                            // category_id: idCategory
                        })
                    }
                })
                return resutl;
            }, idCategory)
            await browser.close();
            Product = [...Product, ...ListProduct];
            return Product;
        }
    } catch (error) {

    }
}


async function GetDetailSubCatories(link) {
    try {

        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(link);
        const ListProduct = await page.evaluate(async () => {
            let resutl = [];

            const ListProductEle = document.querySelectorAll(".SideBar__Root-sc-18bme9p-0.ctRRBS .list.collapsed a")
            // return ListProductEle.length
            ListProductEle.forEach((item, index) => {
                const urlParams = new URLSearchParams(window.location.search);
                resutl.push(item.href)
            })

            return resutl;
        })
        await browser.close();
        console.log(ListProduct)
        return ListProduct

    } catch (error) {

    }
}

async function FetchProduct(idCate,page=1){
    try {
        let result = []
        for(let i =1;i<=page;i++){
            let {data} = await axios.get(`https://tiki.vn/api/personalish/v1/blocks/listings?category=${idCate}&page=${i}`);
            result = [...result,...data.data]

        }
        return result
    } catch (error) {
        throw error
    }
}




async function main() {

    // GetListProductFromCatologe("https://yody.vn/ao-polo-nu");

    // Usage example:
    // const catologeList = await GetCatologe();
    // let products= []
    // for (let i in catologeList) {
    //     // console.log(catologeList[i].link.split("/")[1])
    //     // console.log()
    //     if(catologeList[i].idCategorie.startsWith("c")){
    //         console.log(catologeList[i])
    //         let result = await FetchProduct(catologeList[i].idCategorie.replace("c",""),15);
    //         products = [...products,...result]
    //     }

        
    // }
   
    // Enable
    // console.log(Object.keys(products[0]))
    // writeCSV(products,"check1");


    // console.log(catologeList)
    // const sub1 =await GetDetailSubCatories("https://tiki.vn/ta-bim-cho-be/c2551")



    // console.log(catologeList)
    let TempArr = [];

    // for (let i in catologeList) {
    //     console.log(catologeList[i].link.split("/")[1])
    //     let data = await GetListProductFromCatologe(catologeList[i].originalLink, 2, catologeList[i].link.split("/")[1])
    // }
    //
    // console.log(data)
    // console.log(catologeList)

}





// main()






module.exports = { GetCatologe, GetListProductFromCatologe };