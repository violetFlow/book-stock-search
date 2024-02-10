
export type TypeBookStockSearchResult = {
  list: {
    queue: BookEntity[],
  },
};

export type BookEntity = {
  id: number;
  name: string; 
  author: string;
  publisher: string;
  stock: string;
  shop_name: string;
  price: string;
  publication_date: publicationDate,
  category: category,
}
