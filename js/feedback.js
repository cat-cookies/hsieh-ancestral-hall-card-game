(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const locale = document.body?.dataset.locale === "en" ? "en" : "zh";
  const config = window.PROJECT_CONFIG || {};
  const storageKey = "hsiehCardGameFeedbackV229";
  let memoryEntries = [];
  const copy = locale === "en" ? {
    saved: "Feedback saved on this device.",
    empty: "Please complete at least the comprehension rating or one written response.",
    download: "Feedback records downloaded.",
    external: "Open project Google Form"
  } : {
    saved: "回饋已儲存在此裝置。",
    empty: "請至少填寫理解程度，或提供一項文字回饋。",
    download: "已下載回饋紀錄。",
    external: "開啟專案 Google 表單"
  };

  function readEntries() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      memoryEntries = Array.isArray(parsed) ? parsed : [];
    } catch {
      // Some preview or privacy modes disable persistent storage.
    }
    return [...memoryEntries];
  }

  function saveEntries(entries) {
    memoryEntries = entries.slice(-500);
    try {
      localStorage.setItem(storageKey, JSON.stringify(memoryEntries));
    } catch {
      // Keep the current-session copy available for CSV export.
    }
  }

  function csvEscape(value) {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  }

  function downloadEntries() {
    const entries = readEntries();
    const headers = ["submittedAt","locale","ageGroup","identity","comprehension","favorite","suggestion","version"];
    const rows = [headers.join(","), ...entries.map((entry) => headers.map((key) => csvEscape(entry[key])).join(","))];
    const blob = new Blob(["\ufeff" + rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `謝氏宗祠卡牌遊戲回饋_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    const status = $("#feedback-status");
    if (status) status.textContent = copy.download;
  }

  function openFeedback() {
    $("#feedback-modal")?.classList.remove("hidden");
    setTimeout(() => $("#feedback-age")?.focus(), 0);
  }

  function closeFeedback() {
    $("#feedback-modal")?.classList.add("hidden");
  }

  function submitFeedback(event) {
    event.preventDefault();
    const entry = {
      submittedAt: new Date().toISOString(),
      locale,
      ageGroup: $("#feedback-age")?.value || "",
      identity: $("#feedback-identity")?.value || "",
      comprehension: $("#feedback-comprehension")?.value || "",
      favorite: $("#feedback-favorite")?.value.trim() || "",
      suggestion: $("#feedback-suggestion")?.value.trim() || "",
      version: config.version || "2.30"
    };
    if (!entry.comprehension && !entry.favorite && !entry.suggestion) {
      const status = $("#feedback-status");
      if (status) status.textContent = copy.empty;
      return;
    }
    const entries = readEntries();
    entries.push(entry);
    saveEntries(entries);
    event.currentTarget.reset();
    const status = $("#feedback-status");
    if (status) status.textContent = copy.saved;
    $("#feedback-download")?.removeAttribute("disabled");
  }

  function initExternalForm() {
    const button = $("#feedback-external");
    if (!button) return;
    if (/^https:\/\//i.test(config.feedbackFormUrl || "")) {
      button.href = config.feedbackFormUrl;
      button.textContent = copy.external;
      button.classList.remove("hidden");
    }
  }

  function init() {
    $("#feedback-button")?.addEventListener("click", openFeedback);
    $("#feedback-close")?.addEventListener("click", closeFeedback);
    $("#feedback-form")?.addEventListener("submit", submitFeedback);
    $("#feedback-download")?.addEventListener("click", downloadEntries);
    $("#feedback-modal")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeFeedback();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeFeedback();
    });
    if (readEntries().length) $("#feedback-download")?.removeAttribute("disabled");
    initExternalForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
