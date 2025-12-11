const columns = 9;

// Default URLs list
const defaultUrls = [
  ['https://web.whatsapp.com/', 'whatsapp.png'],
  ['https://chatgpt.com/', 'chatgpt.png'],
  ['https://www.notion.so', 'Notion-logo.svg'],
  ['https://mail.google.com/mail/u/0/#inbox', 'gmail.png'],
  ['https://ogmp3.cc/5/', 'ogmp3.ico'],
  ['https://github.com/LeanderZiehm', 'github.png'],
  ['https://mygit.th-deg.de/', 'gitlab.png'],
  ['https://discord.com/channels/1330143467828940840/1330499170716352534', 'discord.png'],
  ['https://webmail.th-deg.de/', 'webmail.svg'],
  ['https://ilearn.th-deg.de/my/', 'thdD.png'],
  ['https://www.youtube.com/', 'youtube.png'],
  ['https://claude.ai/new', 'sonet.ico'],
  ['https://notebooklm.google.com/notebook/e131e5f8-8f2a-46bd-9d68-01f257895f0d', 'notebooklm.png'],
  ['https://aistudio.google.com/prompts/new_chat', 'ai_studio.png'],
  ['https://www.canva.com/'],
  'https://www.kaggle.com/',
  'https://wakatime.com/dashboard',
  'https://www.mermaidchart.com/play'
];

// Load URLs from localStorage or use defaults
function loadUrls() {
  const savedUrls = localStorage.getItem('customUrls');
  return savedUrls ? JSON.parse(savedUrls) : defaultUrls;
}

let urls = loadUrls();

function getFaviconUrl(siteUrl, size = 64) {
  const { hostname } = new URL(siteUrl);
  return `https://www.google.com/s2/favicons?sz=${size}&domain=${hostname}`;
}

function createContainer() {
  const container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);
  return container;
}

function createControlButtons() {
  // Container for control buttons
  const controlContainer = document.createElement('div');
  controlContainer.id = 'controlContainer';
  controlContainer.style.position = 'fixed';
  controlContainer.style.top = '20px';
  controlContainer.style.right = '20px';
  controlContainer.style.display = 'flex';
  controlContainer.style.gap = '15px';
  controlContainer.style.zIndex = '1000';
  
  // Add button
  const addButton = document.createElement('button');
  addButton.id = 'addButton';
  addButton.innerHTML = '+';
  addButton.style.width = '50px';
  addButton.style.height = '50px';
  addButton.style.borderRadius = '25px';
  addButton.style.backgroundColor = 'rgba(150, 10, 255, 0.7)';
  addButton.style.color = 'white';
  addButton.style.fontSize = '24px';
  addButton.style.fontWeight = 'bold';
  addButton.style.border = 'none';
  addButton.style.cursor = 'pointer';
  addButton.style.boxShadow = '5px 5px 15px rgba(150, 10, 255, 0.5)';
  addButton.hidden = true;
  
  addButton.addEventListener('click', showAddLinkPopup);
  
  const editIconPath = "edit.png"
  const editIcon = document.createElement('img');
  editIcon.src = editIconPath;
  editIcon.alt = 'Edit';
  editIcon.style.width = '45%';  // Adjust size to fit the button
  editIcon.style.height = '45%';
  editIcon.style.objectFit = 'contain';
  editIcon.style.pointerEvents = 'none'; // Prevent the image from blocking button clicks
  editIcon.style.margin = '0px';
  editIcon.style.filter = 'invert(1)';

  // Edit toggle button
  const editToggle = document.createElement('button');
  editToggle.id = 'editToggle';
  editToggle.appendChild(editIcon);

  // editToggle.innerHTML = '✏️'.replace('\uFE0F', '\uFE0E');  // Forces black-and-white
  editToggle.style.width = '50px';
  editToggle.style.height = '50px';
  editToggle.style.borderRadius = '25px';
  editToggle.style.backgroundColor = 'rgba(150, 10, 255, 0.7)';
  editToggle.style.color = 'white';
  editToggle.style.fontSize = '20px';
  editToggle.style.border = 'none';
  editToggle.style.cursor = 'pointer';
  editToggle.style.boxShadow = '5px 5px 15px rgba(150, 150, 150, 0.5)';
  editToggle.dataset.active = 'false';
  editToggle.style.padding = '0px';

  
  editToggle.addEventListener('click', () => {
    const isActive = editToggle.dataset.active === 'true';
    editToggle.dataset.active = isActive ? 'false' : 'true';
    
    if (editToggle.dataset.active === 'true') {
      editToggle.style.backgroundColor = 'rgba(150, 150, 150, 0.7)';
      editToggle.style.boxShadow = '5px 5px 15px rgba(255, 165, 0, 0.5)';
      addButton.hidden = false;
    } else {
      editToggle.style.backgroundColor = 'rgba(150, 10, 255, 0.7)';
      editToggle.style.boxShadow = '5px 5px 15px rgba(150, 150, 150, 0.5)';
      addButton.hidden = true;
    }
    
    // Refresh buttons to update delete button visibility
    createButtons(urls);
  });
  
  controlContainer.appendChild(addButton);
  controlContainer.appendChild(editToggle);
  document.body.appendChild(controlContainer);
}

function createButtons(urls) {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear existing buttons
  
  urls.forEach((entry, i) => {
    let link, localIcon = null;

    if (typeof entry === 'string') {
      link = entry;
    } else if (Array.isArray(entry)) {
      link = entry[0];
      if (entry.length > 1) {
        localIcon = entry[1];
      }
    }

    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.id = String(i + 1);
    a.style.position = 'relative';
    // a styles
    a.style.padding = '20px';
    a.style.textAlign = 'center';
    a.style.backgroundColor = 'rgba(150,10,255,0.3)';
    a.style.color = '#fff';
    a.style.border = 'none';
    a.style.cursor = 'pointer';
    a.style.borderRadius = '20px';
    a.style.width = '45px';
    a.style.height = '45px';
    a.style.fontSize = '100%';
    a.style.fontWeight = 'bold';
    a.style.background = 'linear-gradient(135deg, rgba(150,10,255,0.5) 0%, rgba(255,0,255,0.5) 100%)';
    a.style.boxShadow = '10px 10px 30px rgba(150, 10, 255, 0.5)';
    a.style.display = 'flex';
    a.style.justifyContent = 'center';
    a.style.alignItems = 'center';

    const img = document.createElement('img');
    img.style.display = 'block';
    // img styles
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';

    img.alt = extractMainDomain(link);

    if (localIcon) {
      img.src = `icons/${localIcon}`;
    } else {
      img.src = getFaviconUrl(link);
    }

    a.appendChild(img);
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.top = '-10px';
    deleteBtn.style.right = '-10px';
    deleteBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    deleteBtn.style.color = 'white';
    deleteBtn.style.borderRadius = '50%';
    deleteBtn.style.width = '24px';
    deleteBtn.style.height = '24px';
    deleteBtn.style.border = 'none';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.display = 'none';
    deleteBtn.style.alignItems = 'center';
    deleteBtn.style.justifyContent = 'center';
    deleteBtn.style.fontSize = '14px';
    deleteBtn.style.fontWeight = 'bold';
    
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showDeleteConfirmation(i);
    });
    
    // Only show delete button on hover if edit mode is active
    a.addEventListener('mouseover', () => {
      const editToggle = document.getElementById('editToggle');
      if (editToggle && editToggle.dataset.active === 'true') {
        deleteBtn.style.display = 'flex';
      }
    });
    
    a.addEventListener('mouseout', () => {
      deleteBtn.style.display = 'none';
    });
    
    a.appendChild(deleteBtn);
    container.appendChild(a);
  });
}

function showAddLinkPopup() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '2000';
  
  // Create popup
  const popup = document.createElement('div');
  popup.id = 'addLinkPopup';
  popup.style.backgroundColor = '#222';
  popup.style.padding = '30px';
  popup.style.borderRadius = '20px';
  popup.style.width = '400px';
  popup.style.boxShadow = '0 0 30px rgba(150, 10, 255, 0.7)';
  popup.style.position = 'relative';
  
  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '10px';
  closeBtn.style.backgroundColor = 'transparent';
  closeBtn.style.color = 'white';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = '24px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.addEventListener('click', () => document.body.removeChild(overlay));
  
  // Title
  const title = document.createElement('h2');
  title.innerHTML = 'Add New Link';
  title.style.color = 'white';
  title.style.marginTop = '0';
  title.style.marginBottom = '20px';
  title.style.textAlign = 'center';
  
  // URL input
  const urlLabel = document.createElement('label');
  urlLabel.innerHTML = 'URL:';
  urlLabel.style.color = 'white';
  urlLabel.style.display = 'block';
  urlLabel.style.marginBottom = '5px';
  
  const urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.placeholder = 'https://example.com';
  urlInput.style.width = '100%';
  urlInput.style.padding = '10px';
  urlInput.style.marginBottom = '20px';
  urlInput.style.backgroundColor = '#333';
  urlInput.style.border = '1px solid #555';
  urlInput.style.borderRadius = '5px';
  urlInput.style.color = 'white';
  urlInput.style.boxSizing = 'border-box';
  
  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.innerHTML = 'Add Link';
  submitBtn.style.backgroundColor = 'rgba(150, 10, 255, 0.7)';
  submitBtn.style.color = 'white';
  submitBtn.style.padding = '10px 20px';
  submitBtn.style.border = 'none';
  submitBtn.style.borderRadius = '5px';
  submitBtn.style.cursor = 'pointer';
  submitBtn.style.width = '100%';
  submitBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url && isValidUrl(url)) {
      addNewLink(url);
      document.body.removeChild(overlay);
    } else {
      alert('Please enter a valid URL');
    }
  });
  
  // Build popup
  popup.appendChild(closeBtn);
  popup.appendChild(title);
  popup.appendChild(urlLabel);
  popup.appendChild(urlInput);
  popup.appendChild(submitBtn);
  
  // Add popup to overlay
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  
  // Focus URL input
  setTimeout(() => urlInput.focus(), 100);
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function addNewLink(url) {
  urls.push(url);
  saveUrls();
  createButtons(urls);
}

function saveUrls() {
  localStorage.setItem('customUrls', JSON.stringify(urls));
}

function goTo(url, openInNewTab = true) {
  if (openInNewTab) {
    chrome.tabs.create({ url });
  } else {
    chrome.tabs.update({ url });
  }
}

function extractMainDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '').split('.')[0];
  } catch (e) {
    return 'unknown';
  }
}

function showDeleteConfirmation(index) {
  // Get the link info
  const entry = urls[index];
  const link = Array.isArray(entry) ? entry[0] : entry;
  const siteName = extractMainDomain(link);
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'confirmOverlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '2000';
  
  // Create popup
  const popup = document.createElement('div');
  popup.id = 'confirmPopup';
  popup.style.backgroundColor = '#222';
  popup.style.padding = '30px';
  popup.style.borderRadius = '20px';
  popup.style.width = '400px';
  popup.style.boxShadow = '0 0 30px rgba(255, 50, 50, 0.7)';
  popup.style.position = 'relative';
  
  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '10px';
  closeBtn.style.backgroundColor = 'transparent';
  closeBtn.style.color = 'white';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = '24px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.addEventListener('click', () => document.body.removeChild(overlay));
  
  // Title
  const title = document.createElement('h2');
  title.innerHTML = 'Confirm Deletion';
  title.style.color = 'white';
  title.style.marginTop = '0';
  title.style.marginBottom = '20px';
  title.style.textAlign = 'center';
  
  // Message
  const message = document.createElement('p');
  message.innerHTML = `Are you sure you want to remove <strong>${siteName}</strong> from your shortcuts?`;
  message.style.color = 'white';
  message.style.marginBottom = '30px';
  message.style.textAlign = 'center';
  
  // Button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'space-between';
  buttonContainer.style.gap = '20px';
  
  // Cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.style.flex = '1';
  cancelBtn.style.padding = '10px';
  cancelBtn.style.backgroundColor = '#444';
  cancelBtn.style.color = 'white';
  cancelBtn.style.border = 'none';
  cancelBtn.style.borderRadius = '5px';
  cancelBtn.style.cursor = 'pointer';
  cancelBtn.addEventListener('click', () => document.body.removeChild(overlay));
  
  // Confirm button
  const confirmBtn = document.createElement('button');
  confirmBtn.innerHTML = 'Delete';
  confirmBtn.style.flex = '1';
  confirmBtn.style.padding = '10px';
  confirmBtn.style.backgroundColor = 'rgba(255, 50, 50, 0.8)';
  confirmBtn.style.color = 'white';
  confirmBtn.style.border = 'none';
  confirmBtn.style.borderRadius = '5px';
  confirmBtn.style.cursor = 'pointer';
  confirmBtn.addEventListener('click', () => {
    urls.splice(index, 1);
    saveUrls();
    createButtons(urls);
    document.body.removeChild(overlay);
  });
  
  // Add elements to popup
  buttonContainer.appendChild(cancelBtn);
  buttonContainer.appendChild(confirmBtn);
  
  popup.appendChild(closeBtn);
  popup.appendChild(title);
  popup.appendChild(message);
  popup.appendChild(buttonContainer);
  
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

function main() {
  window.focus();

  document.body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.justifyContent = 'center'; // center vertically
  document.body.style.alignItems = 'center'; // center horizontally
  document.body.style.height = '100vh';
  document.body.style.margin = '0';
  document.body.style.fontFamily = 'Arial, sans-serif';

  createContainer();
  createControlButtons();

  const container = document.getElementById('container');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(8, 1fr)';
  container.style.gridTemplateRows = 'repeat(auto-fill, 1fr)';
  container.style.gap = '55px';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.margin = '50px 0';

  createButtons(urls);

  document.addEventListener('keydown', e => {
    const n = Number(e.key);
    if (n >= 1 && n <= urls.length) {
      const entry = urls[n - 1];
      const link = Array.isArray(entry) ? entry[0] : entry;
      goTo(link);
    }
  });
}

document.addEventListener('DOMContentLoaded', main);