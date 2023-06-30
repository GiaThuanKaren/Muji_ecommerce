const puppeteer = require("puppeteer");
const { autoScroll, writeCSV } = require("./function");
const fs = require("fs");
const axios = require("axios").default


const { stringify } = require("csv-stringify");
const PageURL = "https://tiki.vn/";
const GetCatologe = async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(PageURL);
    const GetCatologe = await page.evaluate(() => {
        const CatologeItemEle = document.querySelectorAll(
            ".styles__StyledListItem-sc-w7gnxl-0.cjqkgR:nth-child(2) a"
        );
        let resutl = [];
        CatologeItemEle.forEach((item, index) => {
            const Img = item.querySelector("img");
            resutl.push({
                idCategorie: item.getAttribute("href")?.replace("https://tiki.vn", "").split("/")[2],
                link: item.getAttribute("href")?.replace("https://tiki.vn", ""),
                title: item.getAttribute("title"),
                img: Img?.getAttribute("src")?.toString(),
                originalLink: item.getAttribute("href"),
            });
        });
        return resutl;
    });

    await browser.close();
    return GetCatologe;
}

const GetListProductFromCatologe = async function (link, numberPage = 3, filenamesub) {
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
            const ListProduct = await page.evaluate(async () => {
                let resutl = [];

                const ListProductEle = document.querySelectorAll(".ProductList__NewWrapper-sc-1dl80l2-0.jXFjHV .product-item")
                ListProductEle.forEach((item, index) => {
                    const urlParams = new URLSearchParams(window.location.search);

                    let idCategories = window.location.href.split("/")[4].split("?")[0]
                    let queryParam = window.location.href.split("/")[3]
                    console.log(idCategories)
                    // console.log(idCategories[4])
                    const myParam = urlParams.get('page');
                    let img = "";
                    let linksp = "";
                    linksp = item?.getAttribute("href").toString();
                    img = item?.querySelector(".thumbnail .image-wrapper img")?.getAttribute("src");
                    let altName = item?.querySelector(".thumbnail .image-wrapper img")?.getAttribute("alt");
                    let idProduct = new URLSearchParams(linksp)
                    let displayPrice = item?.querySelector(".price-discount__price")?.innerHTML.replace("<sup> ₫</sup>", "");
                    console.log({
                        img,
                        altName,
                        displayPrice,
                        page: myParam,
                        linksp

                    })
                    let id = idProduct.get("spid")
                    if (id) {
                        resutl.push({
                            idCategories,
                            queryParam,
                            img,
                            altName,
                            displayPrice,
                            page: myParam,
                            linksp,
                            idProduct: id
                        })
                    }


                })

                return resutl;
            })
            await browser.close();
            Product = [...Product, ...ListProduct];
            return Product;

        }
    } catch (error) {

    }
    // 




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

    const catologeList = await GetCatologe();
    let products= []
    for (let i in catologeList) {
        // console.log(catologeList[i].link.split("/")[1])
        // console.log()
        if(catologeList[i].idCategorie.startsWith("c")){
            console.log(catologeList[i])
            let result = await FetchProduct(catologeList[i].idCategorie.replace("c",""),15);
            products = [...products,...result]
        }

        
    }

    console.log(Object.keys(products[0]))
    writeCSV(products,"check1");
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





main()






module.exports = { GetCatologe, GetListProductFromCatologe };