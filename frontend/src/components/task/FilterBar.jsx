import { useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import styles from './FilterBar.module.css';

function FilterBar({ onFilterChange, onSortChange, onSearchChange }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSortBy, setActiveSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleSortChange = (sort) => {
    setActiveSortBy(sort);
    onSortChange(sort);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.searchBox}>
        <FiSearch size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>
            <FiFilter size={16} />
            Filter
          </span>
          <div className={styles.filterButtons}>
            {['all', 'active', 'completed'].map((filter) => (
              <button
                key={filter}
                className={`${styles.filterButton} ${
                  activeFilter === filter ? styles.active : ''
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.sortGroup}>
          <span className={styles.sortLabel}>Sort</span>
          <select
            value={activeSortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
