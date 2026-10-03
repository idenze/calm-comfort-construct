/* Fills town.html from the register when opened as town.html?clan=slug. */
(function () {
  var slug = new URLSearchParams(location.search).get("clan");
  var r = (window.OZ_REGISTER || []).filter(function (x) { return x.slug === slug; })[0];
  var box = document.getElementById("register-record");
  if (!r || !box) return;
  document.title = r.name + " — clans, tribes & towns — Ozikoro";
  document.querySelector(".sx-town-hero h1").textContent = r.name;
  document.querySelector(".sx-town-hero .eyebrow").textContent = "Igbo · " + r.division + " · " + r.type;
  document.querySelector(".sx-town-hero .lede").textContent = "Recorded in " + (r.region || "a region not yet recorded") + ". Every history, image, recording and document connected to " + r.name + " gathers here.";
  box.hidden = false;
  box.querySelector("[data-path]").innerHTML = ["Igbo", r.division, r.name].map(function (s) { return "<span>" + s + "</span>"; }).join("<i>›</i>");
  box.querySelector("[data-facts]").innerHTML = "<div><dt>Ethnicity</dt><dd>Igbo</dd></div><div><dt>Division</dt><dd>" + r.division + "</dd></div><div><dt>Recorded as</dt><dd>" + r.type + "</dd></div><div><dt>Region</dt><dd>" + (r.region || "Not recorded") + "</dd></div>";
  box.querySelector("[data-towns]").innerHTML = r.towns.length ? r.towns.map(function (t) { return '<li><a href="towns.html?clan=' + r.slug + "&town=" + encodeURIComponent(t) + '">' + t + "</a></li>"; }).join("") : "<li>No towns recorded inside this entry yet.</li>";
  box.querySelector("[data-tcount]").textContent = r.towns.length;
})();
