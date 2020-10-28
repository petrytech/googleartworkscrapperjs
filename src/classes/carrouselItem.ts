export class CarrouselItem {

    name: string
    link: string
    extra?: Array<string>
    image?: string
    
    constructor(
        name: string,
        link: string,
        extra?: Array<string>,
        image?: string) {

        this.name = name
        this.link = link
        this.extra = extra
        this.image = image
    }

    public getAllProps() {
        let validProps: any = {}

        validProps.name = this.name

        if (Array.isArray(this.extra) && this.extra.length)
            validProps.extra = this.extra
        else
            validProps.extra = null

        validProps.link = this.link

        if (this.image)
            validProps.image = this.image
        else
            validProps.image = null

        return validProps
    }
}