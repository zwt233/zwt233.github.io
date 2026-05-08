(function () {
  var storageKey = "zwt-home-language";
  var root = document.documentElement;

  function getInitialLanguage() {
    var params = new URLSearchParams(window.location.search);
    var queryLang = params.get("lang");
    if (queryLang === "zh" || queryLang === "en") {
      return queryLang;
    }
    var saved = window.localStorage && window.localStorage.getItem(storageKey);
    if (saved === "zh" || saved === "en") {
      return saved;
    }
    return "en";
  }

  function setLanguage(language) {
    var next = language === "zh" ? "zh" : "en";
    root.classList.toggle("lang-zh", next === "zh");
    root.classList.toggle("lang-en", next === "en");
    root.lang = next === "zh" ? "zh-CN" : "en";

    if (window.localStorage) {
      window.localStorage.setItem(storageKey, next);
    }

    Array.prototype.slice.call(document.querySelectorAll("[data-language-toggle]")).forEach(function (button) {
      button.setAttribute("aria-pressed", next === "zh" ? "true" : "false");
      button.setAttribute("title", next === "zh" ? "Switch to English" : "切换到中文");
    });

    if (document.querySelector(".home-profile")) {
      var pageTitle = document.querySelector(".page__title");
      if (pageTitle) {
        pageTitle.textContent = next === "zh" ? "简介" : "About";
      }
    }
  }

  function init() {
    setLanguage(getInitialLanguage());

    Array.prototype.slice.call(document.querySelectorAll("[data-language-toggle]")).forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(root.classList.contains("lang-zh") ? "en" : "zh");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
