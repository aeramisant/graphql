const { v4: uuid } = require('uuid');

exports.Mutation = {
  addCategory: (parent, args, { db }) => {
    const { input } = args;
    const { categories } = db;
    const newCategory = {
      id: uuid(),
      name: input.name,
    };

    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { products } = db;
    const newProduct = {
      id: uuid(),
      name: input.name,
      description: input.description,
      image: input.image,
      quantity: input.quantity,
      price: input.price,
      onSale: input.onSale,
      categoryId: input.categoryId,
    };
    products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { input }, { db }) => {
    const { reviews } = db;
    const newReview = {
      id: uuid(),
      date: new Date().toLocaleDateString(),
      title: input.title,
      comment: input.comment,
      rating: input.rating,
      productId: input.productId,
    };
    reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    const before = db.categories.length;
    db.categories = db.categories.filter((c) => c.id !== id);
    if (db.categories.length === before) return false;

    db.products = db.products.map((product) =>
      product.categoryId === id ? { ...product, categoryId: null } : product
    );

    return true;
  },
  deleteProduct: (parent, { id }, { db }) => {
    const before = db.products.length;
    db.products = db.products.filter((product) => product.id !== id);
    if (before === db.products.length) return false;

    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },

  deleteReview: (parent, { id }, { db }) => {
    const before = db.reviews.length;
    db.reviews = db.reviews.filter((product) => product.id !== id);
    if (before === db.reviews.length) return false;
    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const idx = db.categories.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Category not found');
    db.categories[idx] = { ...db.categories[idx], ...input };
    return db.categories[idx];
  },

  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);
    if (index === -1) throw new Error('Review not found');
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
      date: new Date().toLocaleDateString(),
    };
    return db.reviews[index];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.find((product) => product.id === id);
    if (index === -1) throw new Error('Product not found');
    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return db.products[index];
  },
};
