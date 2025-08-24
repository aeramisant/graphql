exports.Category = {
  products: (parent, args, { db }) => {
    const { id } = parent;
    const { filter } = args;
    const { products, reviews } = db;
    const categoryProducts = products.filter(
      (product) => product.categoryId === id
    );
    if (filter) {
      let filteredCategoryProducts = categoryProducts;
      const { onSale, avgRating } = filter;
      if (onSale === true) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            return product.onSale;
          }
        );
      }
      if (!!avgRating && [1, 2, 3, 4, 5].includes(avgRating)) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
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
          }
        );
      }
      return filteredCategoryProducts;
    }
    return categoryProducts;
  },
};
