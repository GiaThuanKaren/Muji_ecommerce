const fs = require("fs");
const { stringify } = require("csv-stringify");
const autoScroll = async function (page) {
    await page.evaluate(async () => {
       await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
};



const writeCSV = async function( data,filename){
    const writableStream = fs.createWriteStream(`./result/${filename}.csv`);
    if(data && data.length > 0){
        const columns = Object.keys(data[0])
        console.log(columns)
        const stringifier = stringify({ header: true, columns: columns });
        for( let i in data){
            // console.log(i)
             stringifier.write(data[i]);
             if(i == 10){
                // break;
             }
        }
        // data.forEach((row,index)=>{
        //     console.log(row)
            
        //     // stringifier.write(row);
        // })
        stringifier.pipe(writableStream);
        console.log("Finished writing data");
    }
    
}



module.exports = {autoScroll,writeCSV}