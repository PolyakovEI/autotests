const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    const result = await page.evaluate(() => {
        let data = [];
        let elementMassiv = document.querySelectorAll('.product_pod');
//        let nodes = elementMassiv[0].childNodes;
        for (var item of elementMassiv) {
//            let nodes = item.childNodes;
//            console.log(nodes);
            
            let title = item.childNodes[5].innerText;
            let price = item.childNodes[7].children[0].innerText;
            data.push({title, price});
        }
        return data;
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
//    for (var i=0; i<value.length;i++) {
//        console.log(value[i].nodeName + " : " + value[i].nodeType);
//    }
})
