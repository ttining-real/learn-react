export interface MyBooks {
  items: Item[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

interface Item {
  bookId: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  expand: Expand;
  id: string;
  updated: Date;
}

interface Expand {
  bookId: BookID;
}

export interface BookID {
  id: string;
  cover_url: string;
  cover: string;
  title: Title;
}

interface Title {
  ko: string;
}
