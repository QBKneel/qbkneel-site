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

/* Product photo views: swaps the card image between front and second angle. */
(function () {
  document.documentElement.classList.add("js");
  document.querySelectorAll("[data-gallery]").forEach(function (media) {
    var source = media.querySelector("picture source");
    var img = media.querySelector("picture img");
    var buttons = media.querySelectorAll(".media-view");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var b = "assets/img/" + btn.getAttribute("data-img");
        if (source) source.srcset = b + "-480.webp 480w, " + b + "-900.webp 900w";
        img.srcset = b + "-480.jpg 480w, " + b + "-900.jpg 900w";
        img.src = b + "-900.jpg";
        img.alt = btn.getAttribute("data-alt");
        buttons.forEach(function (o) {
          var on = o === btn;
          o.classList.toggle("is-active", on);
          o.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });
    });
  });
})();
