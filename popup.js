document.addEventListener('DOMContentLoaded', async () => {
    const domain = await getCurrentDomain();
    document.getElementById('domain').textContent = domain;
    

    const styles = await getSavedStyles(domain);
    document.getElementById('cssInput').value = styles || '';
    

    document.getElementById('save').addEventListener('click', async () => {
      const css = document.getElementById('cssInput').value;
      await saveStyles(domain, css);
      await applyStyles(domain, css);
    });
    

    document.getElementById('clear').addEventListener('click', async () => {
      document.getElementById('cssInput').value = '';
      await saveStyles(domain, '');
      await applyStyles(domain, '');
    });
  });
  
  async function getCurrentDomain() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return new URL(tabs[0].url).hostname;
  }
  
  async function getSavedStyles(domain) {
    const result = await chrome.storage.local.get(domain);
    return result[domain];
  }
  
  async function saveStyles(domain, css) {
    await chrome.storage.local.set({ [domain]: css });
  }
  
  async function applyStyles(domain, css) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tabs[0].tab.id, { 
      action: 'applyStyles', 
      css: css 
    });
  }
  