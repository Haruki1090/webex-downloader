console.log("Webex 動画ダウンローダーが有効になりました");

// Check if this is a Webex recording page and add a download button
if (window.location.href.includes('webex.com') && 
    (document.querySelector('video') || 
     document.querySelector('.playback-recording'))) {
  
  // Wait for the page to fully load
  window.addEventListener('load', () => {
    setTimeout(addDownloadButton, 2000);
  });
  
  // Also try adding the button immediately in case the page is already loaded
  if (document.readyState === 'complete') {
    addDownloadButton();
  }
}

function addDownloadButton() {
  // Check if button already exists
  if (document.querySelector('.webex-dl-button')) {
    return;
  }
  
  // Create floating button
  const downloadButton = document.createElement('button');
  downloadButton.textContent = '動画をダウンロード';
  downloadButton.className = 'webex-dl-button';
  downloadButton.style.position = 'fixed';
  downloadButton.style.top = '10px';
  downloadButton.style.right = '10px';
  downloadButton.style.zIndex = '9999';
  downloadButton.style.padding = '8px 12px';
  downloadButton.style.backgroundColor = '#0052cc';
  downloadButton.style.color = 'white';
  downloadButton.style.border = 'none';
  downloadButton.style.borderRadius = '4px';
  downloadButton.style.cursor = 'pointer';
  downloadButton.style.fontWeight = 'bold';
  downloadButton.style.fontSize = '14px';
  
  // Add hover effect
  downloadButton.style.transition = 'background-color 0.2s';
  downloadButton.addEventListener('mouseover', () => {
    downloadButton.style.backgroundColor = '#003d99';
  });
  downloadButton.addEventListener('mouseout', () => {
    downloadButton.style.backgroundColor = '#0052cc';
  });
  
  // Add click event
  downloadButton.addEventListener('click', () => {
    // Find video source
    const videoInfo = findWebexVideoSource();
    
    if (videoInfo && videoInfo.url) {
      // Create filename
      let filename = 'webex_video.mp4';
      if (videoInfo.title) {
        const cleanTitle = videoInfo.title
          .replace(/[\\/:*?"<>|]/g, '_')
          .replace(/\s+/g, '_')
          .substring(0, 50);
        
        if (cleanTitle) {
          filename = `webex_${cleanTitle}.mp4`;
        }
      }
      
      // Create a download link and click it
      const a = document.createElement('a');
      a.href = videoInfo.url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert('このページで動画が見つかりませんでした。');
    }
  });
  
  document.body.appendChild(downloadButton);
}

function findWebexVideoSource() {
  let videoInfo = {
    url: null,
    title: null
  };
  
  // Method 1: Look for video elements
  const videoElements = document.querySelectorAll('video');
  for (const video of videoElements) {
    if (video.src && video.src.includes('webex.com')) {
      videoInfo.url = video.src;
      break;
    }
  }
  
  // Method 2: Look for source elements inside video tags
  if (!videoInfo.url) {
    const sourceElements = document.querySelectorAll('video source');
    for (const source of sourceElements) {
      if (source.src && source.src.includes('webex.com')) {
        videoInfo.url = source.src;
        break;
      }
    }
  }
  
  // Method 3: Parse the HTML for download URLs
  if (!videoInfo.url) {
    const htmlContent = document.documentElement.outerHTML;
    
    // Look for MultiThreadDownloadServlet URLs
    const regex = /https:\/\/[^"'\s]+MultiThreadDownloadServlet[^"'\s]+/g;
    const matches = htmlContent.match(regex);
    
    if (matches && matches.length > 0) {
      // Decode HTML entities in the URL
      videoInfo.url = matches[0].replace(/&amp;/g, '&');
      
      // Convert play=1 to download=1 if needed
      if (videoInfo.url.includes('play=1')) {
        videoInfo.url = videoInfo.url.replace('play=1', 'download=1');
      }
    }
  }
  
  // Try to get a meaningful title
  const recordingTitle = document.querySelector('.recordingTitle');
  if (recordingTitle && recordingTitle.textContent) {
    videoInfo.title = recordingTitle.textContent.trim();
  } else {
    // Try page title as fallback
    let title = document.title;
    if (title) {
      videoInfo.title = title.replace(' - Webex', '').replace(' | Webex', '').trim();
    }
  }
  
  return videoInfo;
}