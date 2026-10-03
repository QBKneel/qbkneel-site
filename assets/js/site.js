/* Applies QBK_CONFIG (see config.js) to every element with data-link="KEY". */
(function () {
  var cfg = window.QBK_CONFIG || {};
  var isSet = function (v) { return typeof v === "string" && v.trim() !== "" && v.trim() !== "#"; };

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var val = cfg[key];
    if (!isSet(val)) {
      // Placeholder: keep the button visible but inert until a real URL is set.
      el.setAttribute("href", "#");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-placeholder");
      el.addEventListener("click", function (e) { e.preventDefault(); });
      return;
    }
    if (key === "CONTACT_EMAIL") {
      el.setAttribute("href", "mailto:" + val.trim());
      var label = el.querySelector("[data-email-text]");
      if (label) label.textContent = val.trim();
      return;
    }
    el.setAttribute("href", val.trim());
    if (/^https?:\/\//i.test(val.trim())) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
})();
