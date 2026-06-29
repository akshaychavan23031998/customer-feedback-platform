export function filterFeedbackItems(feedbackItems, filters) {
  const searchTerm = filters.search.trim().toLowerCase();

  return feedbackItems.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.comment.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm) ||
      item.user?.name?.toLowerCase().includes(searchTerm) ||
      item.user?.email?.toLowerCase().includes(searchTerm);

    const matchesCategory =
      filters.category === 'All' || item.category === filters.category;

    const matchesStatus =
      filters.status === 'All' || item.status === filters.status;

    const matchesRating =
      filters.rating === 'All' || Number(item.rating) === Number(filters.rating);

    return matchesSearch && matchesCategory && matchesStatus && matchesRating;
  });
}

export function sortFeedbackItems(feedbackItems, sortBy) {
  const copiedItems = [...feedbackItems];

  if (sortBy === 'oldest') {
    return copiedItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  if (sortBy === 'highestRating') {
    return copiedItems.sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === 'lowestRating') {
    return copiedItems.sort((a, b) => a.rating - b.rating);
  }

  return copiedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}