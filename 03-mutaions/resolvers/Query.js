exports.Query = {
  products: (parent, args, { db }) => {
    const { filter } = args;
    const { products, reviews } = db;

    if (filter) {
      let filteredProducts = products;
      const { onSale, avgRating } = filter;
      if (onSale === true) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === filter.onSale
        );
      }
      if (!!avgRating && [1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;
          return avgProductRating >= avgRating;
        });
      }
      return filteredProducts;
    }
    return products;
  },

  product: (parent, args, { db }) => {
    const { products } = db;
    const { id } = args;
    return products.find((product) => product.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, args, { db }) => {
    const { categories } = db;
    const { id } = args;
    return categories.find((cat) => cat.id === id);
  },
};
