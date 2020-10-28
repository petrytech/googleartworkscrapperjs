import { CarrouselItem } from './carrouselItem'

export class Carrousel {
    
    itens: Array<CarrouselItem> = []

    public addItem(name: string, link: string, extra?: Array<string>, image?: string) {
        const item = new CarrouselItem(name, link, extra, image)
        this.itens.push(item)
    }

    public getSanitizedCarrousel() {

        const sanitizedCarrouselItems = this.itens.map((item) => {
            return item.getAllProps()
        })

        return {"artworks": sanitizedCarrouselItems}
    }
}