document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timeline');
    const notificationsContainer = document.getElementById('notifications');
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');

    // Fetch data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Render Timeline (existing code)
            data.timeline.forEach(item => {
                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');
                timelineItem.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.date}</p>
                `;
                timelineItem.addEventListener('click', () => {
                    alert(`Details for: ${item.title}\n\n${item.description}`);
                });
                timelineContainer.appendChild(timelineItem);
            });

            // Render Notifications (existing code)
            data.notifications.forEach(item => {
                const notificationItem = document.createElement('div');
                notificationItem.classList.add('notification-item');
                notificationItem.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.message}</p>
                `;
                notificationsContainer.appendChild(notificationItem);
            });

            // Search Functionality
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                searchResultsContainer.innerHTML = ''; // Clear previous results

                if (searchTerm.length === 0) {
                    return; // Don't show results if search bar is empty
                }

                const filteredResults = data.searchable_content.filter(item =>
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm)
                );

                if (filteredResults.length > 0) {
                    filteredResults.forEach(item => {
                        const resultItem = document.createElement('div');
                        resultItem.classList.add('search-result-item');
                        resultItem.innerHTML = `
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                            <a href="${item.url}" target="_blank">View Details & Apply</a>
                        `;
                        searchResultsContainer.appendChild(resultItem);
                    });
                } else {
                    searchResultsContainer.innerHTML = '<p>No results found.</p>';
                }
            });

        })
        .catch(error => console.error('Error fetching data:', error));
});