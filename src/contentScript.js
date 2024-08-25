// thanks claude
let useUpDown = true;  // Default to Up & Down

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.useUpDown !== undefined) {
    useUpDown = request.useUpDown;
    console.log('Navigation mode updated:', useUpDown ? 'Up & Down' : 'Left/Right');
  }
});

// Load initial state
chrome.storage.sync.get('useUpDown', function(data) {
  useUpDown = data.useUpDown !== undefined ? data.useUpDown : true;
  console.log('Initial navigation mode:', useUpDown ? 'Up & Down' : 'Left/Right');
});

// Rest of your content script code...

document.addEventListener('keydown', function(e) {
  let isRelevantKey;
  if (useUpDown) {
    isRelevantKey = e.key === 'ArrowUp' || e.key === 'ArrowDown';
  } else {
    isRelevantKey = e.key === 'ArrowLeft' || e.key === 'ArrowRight';
  }

  if (isRelevantKey) {
    e.preventDefault();
    
    let direction;
    if (useUpDown) {
      direction = e.key === 'ArrowUp' ? 'prev' : 'next';
    } else {
      direction = e.key === 'ArrowLeft' ? 'prev' : 'next';
    }
    
    // Get all links with class 'clicky' and the correct direction
    const links = Array.from(document.querySelectorAll('a.clicky'))
      .filter(link => link.textContent.trim() === direction);
    
    // Find the link closest to the top of the viewport
    const closestLink = links.reduce((closest, link) => {
      const rect = link.getBoundingClientRect();
      const absDist = Math.abs(rect.top);
      if (absDist < closest.dist) {
        return { element: link, dist: absDist };
      }
      return closest;
    }, { element: null, dist: Infinity }).element;
    
    
    if (closestLink) {
      console.log('Clicking link');
      closestLink.click();
    } else {
      console.log('No suitable link found');
    }
  }
});

console.log('HN navigation script loaded');