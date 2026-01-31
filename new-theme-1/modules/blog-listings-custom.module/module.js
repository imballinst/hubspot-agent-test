// Blog listings custom module JavaScript

(function() {
  'use strict';

  // Handle load more functionality
  const loadMoreButtons = document.querySelectorAll('.blog-custom__load-more');

  loadMoreButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const nextPageUrl = this.getAttribute('data-next-page');

      if (!nextPageUrl) return;

      // Show loading state
      const originalText = this.textContent;
      this.textContent = 'Loading...';
      this.disabled = true;

      // Fetch next page
      fetch(nextPageUrl)
        .then(function(response) {
          return response.text();
        })
        .then(function(html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newItems = doc.querySelectorAll('.blog-custom__item');
          const newLoadMore = doc.querySelector('.blog-custom__load-more');
          const list = document.querySelector('.blog-custom__list');

          // Append new items
          newItems.forEach(function(item) {
            list.appendChild(item.cloneNode(true));
          });

          // Update or remove load more button
          if (newLoadMore) {
            button.setAttribute('data-next-page', newLoadMore.getAttribute('data-next-page'));
            button.textContent = originalText;
            button.disabled = false;
          } else {
            button.remove();
          }
        })
        .catch(function(error) {
          console.error('Error loading more posts:', error);
          button.textContent = originalText;
          button.disabled = false;
        });
    });
  });

  // Handle infinite scroll if enabled
  const infiniteScrollContainer = document.querySelector('[data-infinite-scroll="true"]');

  if (infiniteScrollContainer) {
    const loadMoreBtn = infiniteScrollContainer.querySelector('.blog-custom__load-more');

    if (loadMoreBtn) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !loadMoreBtn.disabled) {
            loadMoreBtn.click();
          }
        });
      }, {
        rootMargin: '100px'
      });

      observer.observe(loadMoreBtn);
    }
  }
})();
