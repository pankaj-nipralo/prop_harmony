// Enhanced notification system for export operations

export const showSuccessNotification = (message, filename) => {
  // Create a more sophisticated notification
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <div>
        <div class="font-semibold">Export Successful!</div>
        <div class="text-sm opacity-90">${message}</div>
        ${filename ? `<div class="text-xs opacity-75 mt-1">File: ${filename}</div>` : ''}
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
  
  // Add click to dismiss
  notification.addEventListener('click', () => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });
};

export const showErrorNotification = (message, error) => {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <div>
        <div class="font-semibold">Export Failed</div>
        <div class="text-sm opacity-90">${message}</div>
        ${error ? `<div class="text-xs opacity-75 mt-1">${error}</div>` : ''}
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 7 seconds (longer for errors)
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 7000);
  
  // Add click to dismiss
  notification.addEventListener('click', () => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });
};

export const showLoadingNotification = (message) => {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
  notification.id = 'loading-notification';
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <div>
        <div class="font-semibold">Exporting...</div>
        <div class="text-sm opacity-90">${message}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  return notification;
};

export const hideLoadingNotification = () => {
  const notification = document.getElementById('loading-notification');
  if (notification && notification.parentNode) {
    notification.parentNode.removeChild(notification);
  }
};

// Enhanced export functions with better notifications
export const exportWithNotifications = async (exportFunction, type, transactions, filters) => {
  const loadingNotification = showLoadingNotification(`Generating ${type} report...`);
  
  try {
    const filename = await exportFunction(transactions, filters);
    hideLoadingNotification();
    showSuccessNotification(
      `${type} report has been downloaded successfully!`,
      filename
    );
    return filename;
  } catch (error) {
    hideLoadingNotification();
    showErrorNotification(
      `Failed to export ${type} report. Please try again.`,
      error.message
    );
    throw error;
  }
};
