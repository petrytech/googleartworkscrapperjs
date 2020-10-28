import querystring from 'querystring'
const puppeteer = require('puppeteer')

import { Carrousel } from './carrousel'

export class DataScraper {

    searchTerm: string

    constructor(searchTerm: string) {
        this.searchTerm = searchTerm
    }

    private buildGoogleSearchUrl() {

        const googleSearchUrl = 'https://www.google.com/search?'

        const urlParams = querystring.stringify({ 'q': this.searchTerm })

        return googleSearchUrl + urlParams
    }

    private browserExtractionFunc = () => {

        const carrouselItems = document.querySelectorAll('a.MiPcId')

        const rawData : Array<object> = []
        carrouselItems.forEach((carrouselItem: any) => {

            const link = carrouselItem.href

            const klitem = carrouselItem.querySelector('div.klitem')

            const name = klitem.querySelector('div > div.kltat').textContent
            
            const extra = []

            const extraContent = klitem.querySelectorAll('div > div.ellip.klmeta')
            if(extraContent && extraContent[0])
                extra.push(extraContent[0].textContent)

            const image = klitem.querySelector('div.klzc > div.klic > g-img > img').src

            rawData.push({ name, extra, link, image })

        })

        return rawData
    }

    private async getRawData() {

        const url = this.buildGoogleSearchUrl()
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(url)

        const rawData = await page.evaluate(this.browserExtractionFunc)

        await browser.close()

        return rawData
    }

    public async getData() {

        const rawData = await this.getRawData()

        const carrousel = new Carrousel()

        rawData.forEach((rawItem: any) => {

            carrousel.addItem(rawItem.name, rawItem.link, rawItem.extra, rawItem.image)
            
        })

        const sanitizedData = carrousel.getSanitizedCarrousel()

        return sanitizedData
    }
}