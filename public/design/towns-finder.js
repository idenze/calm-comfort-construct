/* Cascading register finder: Ethnicity -> Division (sub-group) -> Tribe / clan -> Town.
   Works as a plain GET form without JS; with JS, each choice narrows the next. */
(function () {
  var R = window.OZ_REGISTER || [];
  var form = document.getElementById("register-finder");
  if (!form) return;
  var q = new URLSearchParams(location.search);
  var el = function (id) { return document.getElementById(id); };
  var eth = el("f-ethnic"), div = el("f-division"), clan = el("f-clan"), town = el("f-town"), text = el("f-q");
  var list = el("register-results"), count = el("register-count"), crumbs = el("register-crumbs");
  var uniq = function (a) { return a.filter(function (v, i) { return v && a.indexOf(v) === i; }).sort(); };
  function fill(sel, items, label, keep) {
    sel.innerHTML = '<option value="">' + label + "</option>" + items.map(function (i) {
      var v = typeof i === "string" ? i : i.v, t = typeof i === "string" ? i : i.t;
      return '<option value="' + v + '">' + t + "</option>"; }).join("");
    if (keep && [].some.call(sel.options, function (o) { return o.value === keep; })) sel.value = keep;
    sel.disabled = items.length === 0;
  }
  function pool() {
    if (eth.value && eth.value !== "igbo") return [];
    return R.filter(function (r) { return !div.value || r.division === div.value; });
  }
  function cascade(keep) {
    keep = keep || {};
    var p = eth.value === "igbo" ? R : [];
    fill(div, uniq(p.map(function (r) { return r.division; })), eth.value ? "Any division" : "Choose an ethnicity first", keep.division);
    var c = pool();
    fill(clan, c.map(function (r) { return { v: r.slug, t: r.name + " — " + r.type }; }), div.value || eth.value ? "Any tribe or clan" : "Choose a division first", keep.clan);
    var sel = R.filter(function (r) { return r.slug === clan.value; });
    var t = uniq((sel.length ? sel : c).reduce(function (a, r) { return a.concat(r.towns); }, []));
    fill(town, t, eth.value ? "Any town" : "Choose above first", keep.town);
    render();
  }
  function render() {
    var term = (text.value || "").trim().toLowerCase();
    var rows = pool().filter(function (r) {
      if (clan.value && r.slug !== clan.value) return false;
      if (town.value && r.towns.indexOf(town.value) < 0) return false;
      if (!term) return true;
      return (r.name + " " + r.region + " " + r.division + " " + r.towns.join(" ")).toLowerCase().indexOf(term) >= 0;
    });
    crumbs.textContent = [eth.selectedOptions[0] && eth.value ? eth.selectedOptions[0].text : "", div.value, clan.value ? clan.selectedOptions[0].text.split(" — ")[0] : "", town.value].filter(Boolean).join("  ›  ") || "All entries";
    if (eth.value && eth.value !== "igbo") {
      count.textContent = "0 entries";
      list.innerHTML = '<li class="sx-reg-empty"><b>Not yet in the register.</b> No ' + eth.selectedOptions[0].text + ' clans or towns have been filed. Material from knowledge holders and researchers would be the first entries. <a href="upload.html#community-knowledge">Contribute →</a></li>';
      return;
    }
    count.textContent = rows.length + (rows.length === 1 ? " entry" : " entries");
    list.innerHTML = rows.slice(0, 60).map(function (r) {
      var shown = town.value ? [town.value] : r.towns.slice(0, 4);
      return '<li><a href="town.html?clan=' + r.slug + '"><small>' + r.type + " · " + (r.region || "Region not recorded") + "</small><strong>" + r.name + "</strong><span>" + r.division + "</span><em>" +
        (r.towns.length ? r.towns.length + " towns: " + shown.join(", ") + (r.towns.length > shown.length && !town.value ? "…" : "") : "No towns recorded yet") + "</em></a></li>";
    }).join("") + (rows.length > 60 ? '<li class="sx-reg-empty">Showing 60 of ' + rows.length + ". Narrow by division or clan.</li>" : "") || '<li class="sx-reg-empty">Nothing matches. Clear a filter or try another spelling.</li>';
  }
  eth.value = q.get("ethnic") || "igbo";
  text.value = q.get("q") || "";
  cascade({ division: q.get("division"), clan: q.get("clan"), town: q.get("town") });
  cascade({ division: div.value, clan: q.get("clan"), town: q.get("town") });
  eth.addEventListener("change", function () { cascade(); });
  div.addEventListener("change", function () { cascade({ division: div.value }); });
  clan.addEventListener("change", function () { cascade({ division: div.value, clan: clan.value }); });
  town.addEventListener("change", render);
  text.addEventListener("input", render);
  form.addEventListener("submit", function (e) { e.preventDefault(); render(); list.scrollIntoView({ behavior: "smooth", block: "start" }); });
  el("f-reset").addEventListener("click", function () { eth.value = "igbo"; text.value = ""; cascade(); });
})();
