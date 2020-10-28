import { DataScraper } from '../src/classes/dataScraper'

describe('Complete test over the data scraping routine', () => {

    test('Get Sanitezed data', async() => {

        const searchTerm = 'van gogh artwork'
        const dataScraper = new DataScraper(searchTerm)

        const data = await dataScraper.getData()
        
        const test = data.artworks ? true : false

        expect(test).toBe(true)

    })

})

