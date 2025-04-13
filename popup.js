let currentVideoUrl = null;

document.getElementById('extractBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.className = '';
  statusDiv.textContent = '動画を検索中...';
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we're on a Webex page
    if (!tab.url.includes('webex.com')) {
      statusDiv.className = 'error';
      statusDiv.textContent = 'この拡張機能はWebexページでのみ使用できます。';
      return;
    }
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: findWebexVideoSource,
    });
    
    const videoData = results[0].result;
    
    if (videoData && videoData.url) {
      currentVideoUrl = videoData.url;
      
      statusDiv.className = 'success';
      statusDiv.innerHTML = `
        <p>動画が見つかりました！</p>
        <p><strong>タイトル:</strong> ${videoData.title || '不明'}</p>
        <textarea rows="3" readonly>${videoData.url}</textarea>
      `;
      
      // Show download button
      document.getElementById('downloadBtn').style.display = 'block';
    } else {
      statusDiv.className = 'error';
      statusDiv.textContent = 'このページで動画が見つかりませんでした。';
    }
  } catch (error) {
    statusDiv.className = 'error';
    statusDiv.textContent = `エラー: ${error.message}`;
  }
});

document.getElementById('downloadBtn').addEventListener('click', async () => {
  if (!currentVideoUrl) return;
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Try to get a title for the filename
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getPageTitle,
    });
    
    let filename = `webex_video_${Date.now()}.mp4`;
    
    // If we got a title, use it for the filename
    if (results && results[0] && results[0].result) {
      // Clean up the title to make it suitable for a filename
      const cleanTitle = results[0].result
        .replace(/[\\/:*?"<>|]/g, '_') // Replace invalid filename chars
        .replace(/\s+/g, '_')          // Replace spaces with underscore
        .substring(0, 50);             // Limit length
        
      if (cleanTitle) {
        filename = `webex_${cleanTitle}.mp4`;
      }
    }
    
    chrome.downloads.download({
      url: currentVideoUrl,
      filename: filename,
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        document.getElementById('status').className = 'error';
        document.getElementById('status').textContent = 
          `ダウンロードエラー: ${chrome.runtime.lastError.message}`;
      }
    });
  } catch (error) {
    document.getElementById('status').className = 'error';
    document.getElementById('status').textContent = `エラー: ${error.message}`;
  }
});

function getPageTitle() {
  // Try to get a meaningful title
  // First check for video title in common Webex elements
  const recordingTitle = document.querySelector('.recordingTitle');
  if (recordingTitle && recordingTitle.textContent) {
    return recordingTitle.textContent.trim();
  }
  
  // Try page title as fallback, but remove common Webex suffixes
  let title = document.title;
  if (title) {
    title = title.replace(' - Webex', '').replace(' | Webex', '').trim();
    return title || null;
  }
  
  return null;
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