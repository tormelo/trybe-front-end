export const getReviews = (productId) => {
  const reviews = JSON.parse(localStorage.getItem(productId));
  return reviews || [];
};

export const saveReview = (productId, review) => {
  const prevReviews = getReviews(productId);
  localStorage.setItem(productId, JSON.stringify([...prevReviews, review]));
};
