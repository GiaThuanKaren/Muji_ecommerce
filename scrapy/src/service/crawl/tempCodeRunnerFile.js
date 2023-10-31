const ListProductEle = document.querySelectorAll(".variants.product-action.wishItem")

                // ListProductEle.forEach((item, index) => {
                //     const urlParams = new URLSearchParams(window.location.search); // ?page=2

                //     // window.location.href -> https://tiki.vn/ta-bim-cho-be/c2551?page=2
                //     let idCategories = window.location.href.split("/")[3].split("?")[0] // c2551
                //     let queryParam = window.location.href.split("/")[3] // ta-bim-cho-be
                //     console.log(idCategories)
                //     // console.log(idCategories[4])
                //     const myParam = urlParams.get('page'); // 2
                //     let img = "";
                //     let linksp = "";
                //     // linksp = item?.getAttribute("href").toString(); // https://tiki.vn/xe-cho-i-chan-ke-t-ho-p-ba-n-da-p-cho-be-sieu-xinh-peaflo-p130829348.html?spid=130829350
                //     linksp = item?.querySelector(".image_thumb").getAttribute("href").toString();
                //     // img = item?.querySelector(".thumbnail .image-wrapper img")?.getAttribute("src");
                //     img = item?.querySelector(".image_thumb img").getAttribute("src")?.replace("//", "").toString();
                //     // let altName = item?.querySelector(".thumbnail .image-wrapper img")?.getAttribute("alt");
                //     // let idProduct = new URLSearchParams(linksp)
                //     let altName = item?.querySelector(".image_thumb  img")?.getAttribute("alt");
                //     // let displayPrice = item?.querySelector(".price-discount__price")?.innerHTML.replace("<sup> ₫</sup>", "");
                //     let displayPrice = item?.querySelector(".product-info .price ")?.innerHTML.replace(".000đ", "000");
                //     console.log({
                //         img,
                //         altName,
                //         displayPrice,
                //         page: myParam,
                //         linksp

                //     })
                //     // let id = idProduct.get("spid")
                //     // if (id) {
                //         resutl.push({
                //             idCategories,
                //             queryParam,
                //             img,
                //             altName,
                //             displayPrice,
                //             page: myParam,
                //             linksp,
                //             idProduct: id
                //         })
                //     // }


                // })

                // return resutl;