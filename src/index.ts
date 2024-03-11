import { DataScraper } from './classes/dataScraper'
import * as _ from "lodash"
const fs = require('fs')

const searchTerm = process.env.SEARCH_TERM ? process.env.SEARCH_TERM : 'van gogh artwork'
const dataScraper = new DataScraper(searchTerm)


dataScraper.getData().then(
    (data)=>{
        
        const json = JSON.stringify(data, null, 4)

        console.log(json)

        fs.writeFileSync('./tmp/result.json', json)

        console.log(json)

        console.log("Done, check the tmp folder!")
    },
    (err)=>{
        console.log(err)
    }
)





