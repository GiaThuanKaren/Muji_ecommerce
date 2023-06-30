const puppeteer = require("puppeteer");
const autoScroll = require("./function");


const GetDetailProduct = async function (link) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(link);
    const DetailProduct = await page.evaluate(() => {
        let result = [];
        const DetailProductEle = document.querySelector(".styles__StyledProductContent-sc-1f8f774-0.ewqXRk");
        let ImageProductSectionEle = document.querySelector(".style__ProductImagesStyle-sc-1fmads3-0.fymfgs")
        let imgProduct = ImageProductSectionEle.querySelector(".ImageLens__Wrapper-sc-10jbnlj-0.bobuMh img").getAttribute("src");
        let nameProduct = DetailProductEle.querySelector(".title").innerHTML;
        let brandProduct = DetailProductEle.querySelector(".brand .brand-and-author.no-after a").innerHTML
        let currentPrice = document.querySelector(".product-price__current-price").innerHTML;
        let discount = document.querySelector(".product-price__discount-rate")?.innerHTML;
        let discountPrice = document.querySelector(".product-price__list-price")?.innerHTML;
        return {
            brandProduct,
            nameProduct,
            imgProduct,
            productPrice: {
                currentPrice,
                discount,
                discountPrice,
            }
        }

    })

    console.log(DetailProduct)
    
    await browser.close();

}

module.exports ={ GetDetailProduct}
// GetDetailProduct("https://tiki.vn/dien-thoai-samsung-galaxy-a23-5g-4gb-128gb-hang-chinh-hang-xanh-p170581659.html?spid=170581666");
// GetDetailProduct("https://tiki.vn/op-bao-ve-elago-armor-case-cho-airpods-3-p215608432.html?itm_campaign=tiki-reco_UNK_DT_UNK_UNK_maybe-you-like_maybe-you-like_pdp-maybe-you-like-mix-v1_202301230600_MD_batched_PID.215608434&itm_medium=CPC&itm_source=tiki-reco&spid=215608434");