let focusSession = {
  active: false,
  endTime: 0,
};
let blockedSites = ["youtube.com", "instagram.com"];

// Receive messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "startFocus") {
    const minutes = msg.minutes || 25;
    const now = Date.now();

    focusSession.active = true;
    focusSession.endTime = now + minutes * 60 * 1000;

    chrome.storage.local.set({ focusSession });
    chrome.alarms.create("focusEnd", { delayInMinutes: minutes });

    sendResponse({ status: `Focus started for ${minutes} minutes` });
  }

  else if (msg.action === "stopFocus") {
    chrome.alarms.clear("focusEnd");
    focusSession.active = false;
    focusSession.endTime = 0;
    chrome.storage.local.set({ focusSession });
    sendResponse({ status: "Focus stopped" });
  }

  else if (msg.action === "getStatus") {
    const remaining = focusSession.active
      ? Math.max(0, Math.floor((focusSession.endTime - Date.now()) / 1000))
      : 0;
    sendResponse({ active: focusSession.active, remaining });
  }

  return true; // keep sendResponse async-safe
});

// Alarm triggers when focus ends
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusEnd") {
    focusSession.active = false;
    focusSession.endTime = 0;
    chrome.storage.local.set({ focusSession });

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Focus Complete!",
      message: "Great job! Take a short break 🎯",
      priority: 2,
    });
  }
});

// 🚫 Block distracting sites during focus
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (focusSession.active && blockedSites.some(site => details.url.includes(site))) {
    chrome.tabs.update(details.tabId, {
      url: "chrome-extension://" + chrome.runtime.id + "/focus_blocked.html"
    });
  }
}, { url: [{ urlMatches: ".*" }] });
