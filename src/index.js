import './styles.scss';
import { DateTime } from 'luxon';

// Theme toggle
const toggleTheme = () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Update dates
const updateDates = () => {
  const gregorian = DateTime.now().toLocaleString(DateTime.DATE_FULL);
  const hijri = DateTime.now().toLocaleString({ ...DateTime.DATE_FULL, calendar: 'islamic' });
  
  document.getElementById('gregorian-date').textContent = gregorian;
  document.getElementById('hijri-date').textContent = hijri;
};

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
  
  updateDates();
  
  // Initialize skill bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-bar');
        const percentage = bar.dataset.percentage;
        bar.style.width = percentage + '%';
      }
    });
  });
  
  document.querySelectorAll('.skill-wrapper').forEach(wrapper => {
    observer.observe(wrapper);
  });
});

// Add event listeners
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);