export const categoryColors = {
  Personal: '#3B82F6',
  Work: '#10B981',
  Health: '#F59E0B',
  Study: '#8B5CF6',
  Finance: '#EF4444',
};

export const getCategoryColor = (category) => {
  return categoryColors[category] || '#6B7280';
};

export const getCategoryTextColor = (category) => {
  const isDark = document.body.classList.contains('dark-mode');
  const colorMap = {
    Personal: isDark ? '#93C5FD' : '#1E40AF',
    Work: isDark ? '#6EE7B7' : '#065F46',
    Health: isDark ? '#FCD34D' : '#92400E',
    Study: isDark ? '#D8B4FE' : '#5B21B6',
    Finance: isDark ? '#FCA5A5' : '#7F1D1D',
  };
  return colorMap[category] || '#374151';
};

export const defaultCategories = [
  'Personal',
  'Work',
  'Health',
  'Study',
  'Finance',
];
