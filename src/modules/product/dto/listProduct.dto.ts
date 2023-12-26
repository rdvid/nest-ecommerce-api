class listImageDto {
    url: string;
    description: string;
}

class listCharacteristicDto {
    name: string;
    description: string
}

export class ListProductDto {
    
    constructor(
        readonly id: string,
        readonly name: string,
        readonly characteristics: listCharacteristicDto[],
        readonly images: listImageDto[]
    ) {}
}