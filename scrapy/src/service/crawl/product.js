const puppeteer = require("puppeteer");
const autoScroll = require("./function");
const {writeCSV} = require("./function");

const GetDetailProduct = async function (link) {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(link);
    const DetailProduct = await page.evaluate(() => {
        let result = [];
        const DetailProductElement = document?.querySelector("#all-info-wrapper");
        // const ThumbnailProduct = DetailProductElement?.querySelector(".slick-track .image-item:first-child img");
        const InforProduct = DetailProductElement?.querySelector("#product-chonsize > .select-swatch")

        // InforProduct.forEach((variant, index) => {
            const SwatchSize = InforProduct?.querySelectorAll(".swatch-size.swatch .swatch-element");
            const SwatchColor = InforProduct?.querySelectorAll(".swatch-color.swatch .swatch-element");

            SwatchColor?.forEach((sizeItem, index) => {
                function ConvertToASCII(stringConvert) {
                    let sum = 0;
                    for (let i = 0; i < stringConvert.length; i++) {
                        let asc = stringConvert.charCodeAt(i);
                        sum += asc; 
                    }
                    return sum;
                }

                const LabelVariants = sizeItem?.querySelector("label");
    
                let backgroundOriginal = "";
                let idSku = sizeItem?.getAttribute("data-sku")
                // let thumbnail = ThumbnailProduct.getAttribute("src");
                let backgroundSku = sizeItem?.querySelector("span")?.getAttribute("style")
                // let nameProduct = DetailProductElement?.querySelector(".title-head")?.innerHTML;
                let idProduct = DetailProductElement?.querySelector(".sapo-product-reviews-badge").getAttribute("data-id");
                let price = DetailProductElement?.querySelector(".product-price")?.innerHTML.replace(".000đ", "000");
                let size = LabelVariants?.getAttribute("title");
                // let color = LabelVariants.getAttribute("title");
    
                if (backgroundSku) backgroundOriginal = backgroundSku.match(/background-image:url\(([^)]+)\)/)[1]
                backgroundOriginal = backgroundOriginal.replace("//", "https://")
                backgroundOriginal = backgroundOriginal.replace("/thumb/small", "");
                
                result.push({
                    product_id: idProduct,
                    sku_id: ConvertToASCII(idSku),
                    image_product: backgroundOriginal,
                    price,
                    quantity_stock: 100,
                    sku_name: idSku,
                    // option_id: 1,
                    // value_id: index + 1,
                    // values_name: size,
                    // values_name: size
                })
            });

        return result;
    })

    await browser.close();
    return DetailProduct;

}

module.exports = { GetDetailProduct}
// GetDetailProduct("https://tiki.vn/dien-thoai-samsung-galaxy-a23-5g-4gb-128gb-hang-chinh-hang-xanh-p170581659.html?spid=170581666");
// GetDetailProduct("https://tiki.vn/op-bao-ve-elago-armor-case-cho-airpods-3-p215608432.html?itm_campaign=tiki-reco_UNK_DT_UNK_UNK_maybe-you-like_maybe-you-like_pdp-maybe-you-like-mix-v1_202301230600_MD_batched_PID.215608434&itm_medium=CPC&itm_source=tiki-reco&spid=215608434");