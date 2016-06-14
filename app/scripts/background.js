'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// chrome.browserAction.setBadgeText({text: '\'Allo'});
//
// console.log('\'Allo \'Allo! Event Page for Browser Action');

var URL_WORKSPACE_PAGE = chrome.extension.getURL('workspace.html');
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {
      redirectUrl: URL_WORKSPACE_PAGE + details.url
    };
  }, { urls: ["*://docs.google.com/*"] }, ["blocking"]
);
