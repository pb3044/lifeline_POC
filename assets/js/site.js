(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (!form || !status) return;

  function heartBurst(x, y) {
    var hearts = ["💚", "💙", "🧡"];
    for (var i = 0; i < 12; i++) {
      var h = document.createElement("span");
      h.className = "burst";
      h.textContent = hearts[i % hearts.length];
      h.style.left = x + "px";
      h.style.top = y + "px";
      h.style.setProperty("--dx", Math.random() * 16 - 8 + "rem");
      h.style.setProperty("--r", Math.random() * 60 - 30 + "deg");
      document.body.appendChild(h);
      (function (node) {
        setTimeout(function () {
          node.remove();
        }, 1500);
      })(h);
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      var invalid = form.querySelector(":invalid");
      if (invalid) invalid.focus();
      return;
    }
    var nameInput = document.getElementById("name");
    var name = nameInput ? nameInput.value.trim() : "";
    status.textContent =
      "Thank you, " + name + "! A Lifeline team member will be in touch soon.";
    status.classList.remove("d-none");
    status.focus();
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      var r = btn.getBoundingClientRect();
      heartBurst(r.left + r.width / 2, r.top);
    }
    form.reset();
    form.classList.remove("was-validated");
  });
})();
