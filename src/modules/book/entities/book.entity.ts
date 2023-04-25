import * as moment from 'moment';
export class Book {
  id: string;
  title: string;
  author: string;
  yearPublication: number;
  publisher: string;
  imageUrlS: string;
  imageUrlM: string;
  imageUrlL: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
    this.id = partial.id || undefined; // if id is not provided, create a new one
    const date: string = moment.utc().format(); // get the current date
    this.createdAt = moment(this.createdAt).format() || date; // if createdAt is not provided, create a new one
    this.updatedAt = date; // always update the updatedAt field
    this.deletedAt = this.deletedAt || null; // if deletedAt is not provided, set it to null
  }
}
