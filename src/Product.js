import { id } from './productManager.js';
import { notNegative } from './notNegative.js';
import { notNull } from './notNull.js';

export class Product {
    constructor({ code, title, description, price, thumbnail = '', stock = 0 }) {
        this.id = notNull(id, 'id');
        this.code = notNull(code, 'code');
        this.title = notNull(title, 'title');
        this.description = notNull(description, 'description');
        this.price = notNegative(price, 'price');
        this.thumbnail = notNull(thumbnail, 'thumbnail');
        this.stock = notNegative(stock, 'stock');
    }

    asPOJO() {
        return {
            id: this.id,
            code: this.code,
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            stock: this.stock,
        };
    }
}
