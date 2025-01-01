(async () => {
    const src = chrome.extension.getURL('src/content/content_main.js');
    const contentScript = await import(src);
    await contentScript.main(/* chrome: no need to pass it */);
  })();