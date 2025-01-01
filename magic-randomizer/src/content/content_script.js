(async () => {
  const src = chrome.runtime.getURL('src/content/content_main.js');
  const contentScript = await import(src);
  await contentScript.main(/* chrome: no need to pass it */);
})();