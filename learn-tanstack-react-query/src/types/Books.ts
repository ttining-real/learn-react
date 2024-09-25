export interface Books {
  page:       number;
  perPage:    number;
  totalItems: number;
  totalPages: number;
  items:      Book[];
}

export interface Book {
  author:         Author;
  collectionId:   string;
  collectionName: string;
  cover:          string;
  cover_url:      string;
  created:        Date;
  description:    Author;
  id:             string;
  isbn:           string;
  title:          Author;
  updated:        Date;
}

interface Author {
  en: string;
  ko: string;
}
