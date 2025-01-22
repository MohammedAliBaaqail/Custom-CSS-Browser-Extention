let styleElement = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applyStyles') {
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'style-saver-custom-css';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = request.css;
  }
});


(async () => {
  const domain = window.location.hostname;
  const result = await chrome.storage.local.get(domain);
  if (result[domain]) {
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'style-saver-custom-css';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = result[domain];
  }
})();
