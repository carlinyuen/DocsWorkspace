'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// chrome.browserAction.setBadgeText({text: '\'Allo'});
//
// console.log('\'Allo \'Allo! Event Page for Browser Action');

function extractDocID(url) {
  return url.match(/.*\/d\/(\w*)\//);
}

var URL_WORKSPACE_PAGE = chrome.extension.getURL('workspace.html');
// chrome.webRequest.onBeforeRequest.addListener(
//   function(details)
//   {
//     console.log(details);
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       console.log(tabs);
//       var activeTab = tabs[0];
//       var activeTabId = activeTab.id; // or do whatever you need
//
//       if (details.tabId != activeTab.id) {
//         console.log('not the current tab');
//         return;
//       }
//
//       var url = details.url;
//       var fileType;
//       if (url.indexOf('document') >= 0) {
//         fileType = 'doc';
//       } else if (url.indexOf('spreadsheets') >= 0) {
//         fileType = 'sheet';
//       } else if (url.indexOf('presentation') >= 0) {
//         fileType = 'slide';
//       }
//       console.log(url);
//       console.log(fileType);
//
//       var redirectURL = URL_WORKSPACE_PAGE
//         + '?type=' + fileType
//         + '&docID=' + encodeURIComponent(extractDocID(details.url));
//       console.log(redirectURL);
//
//       return {
//         redirectUrl: redirectURL
//       };
//     });
//   }, { urls: ['*://docs.google.com/*'] }, ['blocking']
// );
