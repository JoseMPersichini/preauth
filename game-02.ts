export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name:string, sellIn:number, quality:number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class NormalItem extends Item {
    updateSellIn() {
        this.sellIn = this.sellIn - 1;
    }

    updateQuality() {
        if(this.quality >= 1)  {
            if(this.sellIn < 0 && this.quality >= 2) {
                this.quality = this.quality - 2;
            }
            else {
                this.quality = this.quality - 1;
            }
        }
    }
}

export class Sulfuras extends NormalItem {
    updateQuality() {
        console.log('Not changes');
    }

    updateSellIn() {
        console.log('Not changes');
    }
}

export class AgedBrie extends NormalItem {
    updateQuality() {
        if(this.quality < 50) this.quality = this.quality + 1;        
    }    
}

export class BackstagePasses extends NormalItem {
    updateQuality() {
        if(this.sellIn < 0) this.quality = 0;
        else {
            if(this.sellIn <= 5) this.quality = this.quality + 3;
            else if(this.sellIn <= 10) this.quality = this.quality + 2;
            else this.quality = this.quality + 1;

            if(this.quality > 50) this.quality = 50;
        }
    }
}

export class Conjured extends NormalItem {
    updateQuality() {
        if(this.quality > 0) this.quality = this.quality - 2;
        if(this.quality < 0) this.quality = 0;
    }
}

export class GildedRose {
    items: Array<NormalItem>;

    constructor(items = [] as Array<NormalItem>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            var myItem;
            switch(this.items[i].name) {
                case 'Aged Brie':
                    myItem = new AgedBrie(this.items[i].name, this.items[i].sellIn, this.items[i].quality); 
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    myItem = new BackstagePasses(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
                    break;
                case 'Sulfuras, Hand of Ragnaros':
                    myItem = new Sulfuras(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
                    break;
                case 'Conjured':
                    myItem = new Conjured(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
                    break;
                default:
                    myItem = new NormalItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
                    break;
            }

            myItem.updateSellIn();
            myItem.updateQuality();

            this.items[i] = myItem;
        }

        return this.items;
    }
}