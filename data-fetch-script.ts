import fetch from "node-fetch";
import cheerio from 'cheerio';
import { TypeBookStockSearchResult } from "./types/index";

const KUMAZAWA_URL = 'https://www.search.kumabook.com/kumazawa/html/products/list';
const shopNames = ['yotsukaidou', 'perie-chiba'];

/**
 * Fetch the book stock data from the book store stock management system.
 * @param shopName book store branch name
 * @param url URL for book store stock web scraping.
 */
const fetchBookStockDatas = async (shopName: string, url: string) => {
  const results: TypeBookStockSearchResult = {
    list: {
      queue: []
    }
  };

  const res = await fetch(url);
  const html = await res.text(); // Get HTML as text

  const $ = cheerio.load(html); // Load HTML into cheerio

  // Parsing book searching text
  $('.item').each((item) => {
    const itemName = $(item).find('.item-heading a').text();
    const contents = $(item).find('.item-content');

    contents.each((index, content) => {
      const author = $(content).find('.item-content__author').text() || '';
      const publisher = $(content).find('.item-content__publisher').text() || '';
      const stock = $(content).find('.item-content__stock').text() || '';
      const price = $(content).find('.item-content__price').text() || '';
      const publicationDate = $(content).find('.item-content__publication_date').text() || '';
      const category = $(content).find('.item-content__category').text() || '';

      results.list.queue.push({
        id: index,
        name: itemName,
        author: author,
        publisher: publisher,
        stock: stock,
        shop_name: shopName,
        price: price,
        publication_date: publicationDate,
        category: category,
      });
    });
  });

  return results;
};

// Main process
const main = async (bookName: string) => {
  const resultArray: any = [];
  
  for (const shopName of shopNames) {
    const url = `${KUMAZAWA_URL}?tenpoid=${shopName}&name=${bookName}`;
    const results = await fetchBookStockDatas(shopName, url); // await here
    resultArray.push(results);
  }

  return resultArray;
};

export default main;

