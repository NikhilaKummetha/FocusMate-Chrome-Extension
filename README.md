# 🎯 FocusMate — Chrome Productivity Extension

FocusMate is a lightweight and student-friendly Chrome extension designed to improve productivity through **focus timers, distraction blocking, to-do management, and motivational quotes** — all in one place.

---

## 🚀 Features

### 📝 To-Do List  
- Add, delete, and manage tasks  
- Saved automatically using `chrome.storage.sync`  
- Data persists even after closing Chrome  

### ⏱ Focus Timer  
- Real-time countdown timer  
- Runs even when popup is closed (background service worker)  
- Clean UI with minute selection  
- Session status displayed clearly  

### 🚫 Distraction Blocker  
- Blocks YouTube and Instagram during focus mode  
- Uses `chrome.webNavigation` to detect navigation  
- Redirects to a custom **Stay Focused** page  

### 🔔 Notifications  
- Alerts user when focus session ends  
- Powered by Chrome `notifications` and `alarms` APIs  

### 💬 Motivational Quotes  
- Shows a new quote every time the popup opens  

---

## 🧠 Why FocusMate is Unique

Unlike existing extensions that focus only on **one** feature (only timers, only blocking, or only notes), FocusMate combines:

✔ Motivation  
✔ Task management  
✔ Focus discipline  
✔ Distraction prevention  
✔ Background execution  

—all into a single browser extension with **no login**, **no internet required**, and **no data tracking**.

---

## 🛠️ Tech Stack & APIs Used

- **HTML, CSS, JavaScript**
- **Chrome Extension Manifest V3**
- `chrome.storage`
- `chrome.runtime`
- `chrome.notifications`
- `chrome.alarms`
- `chrome.webNavigation`
- Background service workers
- Asynchronous message passing

---

## 📁 Folder Structure

```
FocusMate/
│
├── manifest.json
├── popup.html
├── popup.js
├── popup.css
├── background.js
├── focus_blocked.html
└── icons/
    └── icon128.png
```

---

## 📦 Installation (For Testing)

1. Clone the repo:
   ```
   git clone https://github.com/<your-username>/FocusMate-Chrome-Extension.git
   ```
2. Open Chrome → go to:
   ```
   chrome://extensions/
   ```
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder  
6. Extension will appear with icon on toolbar

---

## 🎉 Future Enhancements

- Pomodoro mode (focus + break cycles)  
- Task completion analytics  
- Customizable blocked websites  
- Theme customization  
- Sound alerts  

---

## 🙌 Author  
**Nikhila Kummetha**  
Feel free to connect or contribute!

