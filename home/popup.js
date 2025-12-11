// Function to copy text to clipboard
function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand("copy");
        console.log("Links copied to clipboard!");
    } catch (err) {
        console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
}

// Add event listener to the button
document.getElementById("copyLinks").addEventListener("click", function () {
    chrome.tabs.query({}, function (tabs) {
        let allLinks = tabs.map(tab => `${tab.url}`).join('\n');//${tab.title}: 
        copyToClipboard(allLinks);
    });
});

document.getElementById("downloadFavicon").addEventListener("click", function () {
    
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        console.log(tabs[0].favIconUrl);
        const favIconUrl = tabs[0].favIconUrl;
        downloadImage(favIconUrl);
    });


    
    // populateIcon(url);
    // populateImageDimensions(url);
    // resizePopupToFit();


});




function downloadImage(imageUrl) {
    
        chrome.downloads.download(
            {
                url: imageUrl,
            },
            () => {

                const donwloadBtn = document.getElementById('downloadFavicon');
                const prevBackgroundColor = donwloadBtn.style.backgroundColor;
                if (!chrome.runtime.lastError) {
                    donwloadBtn.style.backgroundColor = "gray";
                    setTimeout(() => {
                        donwloadBtn.style.backgroundColor = prevBackgroundColor;
                    }, 3000);
                } else {
                    console.log(chrome.runtime.lastError);
                    donwloadBtn.style.backgroundColor = 'red';
                    setTimeout(() => {
                        donwloadBtn.style.backgroundColor = prevBackgroundColor;
                    }, 3000);
                }
            }
        );
    
    }


////////////////////////////////////////////


/////

const imageSizeHandler = function (imgDom, data, pDom) {
    if (imgDom.naturalWidth && imgDom.naturalHeight) {
        if (imgDom.naturalWidth > data.width || imgDom.naturalHeight > data.height) {
            pDom.textContent = `( ${imgDom.naturalWidth} x ${imgDom.naturalHeight} )`;
        }
    }
};

////


if (window.getFavicon) {
    const urlValue = document.getElementById('url_input').value;
    if (urlValue) {
        // resP.textContent = i18n('loading');
        window.getFavicon
            .detectIcon(urlValue)
            .then(res => {
                if (res && res.url) {
                    document.getElementById('debug').value = res.url;
                    resImage.src = res.url;
                    resImage.style.display = 'inline';
                    donwloadBtn.style.display = 'block';
                    // resP.textContent = `( ${res.width} x ${res.height} )`;
                    imageUrl = res.url;
                    if (resImage.complete) {
                        imageSizeHandler(resImage, res, resP);
                    } else {
                        resImage.onload = () => {
                            imageSizeHandler(resImage, res, resP);
                        };
                    }
                } else {
                    // resP.textContent = i18n('loadError');
                }
            })
            .catch(e => {
                console.error(e);
                // resP.textContent = i18n('loadError');
            });
    }
} 











//////////////////////////////////////////// 

/*global document, chrome, window*/

function getCurrentTabFavIconUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        callback(tabs[0].favIconUrl);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabFavIconUrl(function (url) {
        if (url) {
            populateIcon(url);
            populateImageDimensions(url);
            resizePopupToFit();
        } else {
            clearPopup();
        }
    });
});

function populateIcon(url) {
    var fileName = getFileName(url);

    var iconElement = document.getElementById('icon');
    iconElement.src = url;
    iconElement.alt = fileName;
    iconElement.title = fileName;
    iconElement.hidden = false;

    var urlElement = document.getElementById('iconUrl');
    urlElement.innerHTML = "<a href=\"" + url + "\" target=\"_blank\">" + url + "</a>";
}

function resizePopupToFit() {
    var containerElement = document.getElementById('container');
    containerElement.style.display = "block";
    var contentWidth = containerElement.offsetWidth;
    var contentHeight = containerElement.offsetHeight;
    window.resizeTo(contentWidth, contentHeight);
}

function populateImageDimensions(url) {
    var img = new Image();
    img.addEventListener("load", function () {
        var heightElement = document.getElementById('iconHeight');
        heightElement.innerHTML = this.naturalHeight;

        var widthElement = document.getElementById('iconWidth');
        widthElement.innerHTML = this.naturalWidth;
    });
    img.src = url;
}

function clearPopup() {
    var containerElement = document.getElementById('container');
    containerElement.style.display = "none";
}

function getFileName(path) {
    return path.split('/').pop();
}



document.getElementById('open-links').addEventListener('click', () => {
  const urls = document.getElementById('urls').value.split('\n');
  urls.forEach((url) => {
    const trimmedUrl = url.trim();
    if (trimmedUrl) {
      const validUrl = /^https?:\/\//.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
      chrome.tabs.create({ url: validUrl });
    }
  });
});
