exports.Query = {
  products: (parent, args, { products, reviews }) => {
    const { filter } = args;

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

  product: (parent, args, { products }) => {
    const { id } = args;
    return products.find((product) => product.id === id);
  },
  categories: () => categories,
  category: (parent, args, { categories }) => {
    const { id } = args;
    return categories.find((cat) => cat.id === id);
  },
};
