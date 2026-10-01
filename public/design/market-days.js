(() => {
  const days = ["Eke", "Orie", "Afọ", "Nkwọ"];
  const anchor = Date.UTC(2026, 0, 1);
  const anchorIndex = 1;
  const marketDay = date => { const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()); const delta = Math.round((utc-anchor)/86400000); return days[((anchorIndex+delta)%4+4)%4]; };
  const fmt = new Intl.DateTimeFormat("en-NG", {weekday:"short",day:"numeric",month:"short",year:"numeric"});
  const today = new Date();
  document.querySelectorAll("[data-modern-date]").forEach(el => el.textContent = fmt.format(today));
  document.querySelectorAll("[data-market-day]").forEach(el => el.textContent = marketDay(today));
  const input=document.querySelector("[data-date-input]"), form=document.querySelector(".sx-date-lookup"), result=document.querySelector("[data-market-result]");
  if(input){ input.value=[today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-"); }
  if(form) form.addEventListener("submit", e => { e.preventDefault(); const parts=input.value.split("-").map(Number); if(parts.length!==3)return; const d=new Date(parts[0],parts[1]-1,parts[2]); result.innerHTML=`<b>${marketDay(d)}</b><span>${fmt.format(d)}</span>`; });
  let shown=new Date(today.getFullYear(),today.getMonth(),1); const grid=document.querySelector("[data-calendar-grid]"), title=document.querySelector("[data-month-title]");
  function render(){ if(!grid)return; title.textContent=new Intl.DateTimeFormat("en-NG",{month:"long",year:"numeric"}).format(shown); grid.innerHTML=""; const count=new Date(shown.getFullYear(),shown.getMonth()+1,0).getDate(); for(let i=1;i<=count;i++){const d=new Date(shown.getFullYear(),shown.getMonth(),i), cell=document.createElement("div"); cell.innerHTML=`<span>${i}</span><b>${marketDay(d)}</b>`; grid.appendChild(cell);} }
  document.querySelector("[data-prev-month]")?.addEventListener("click",()=>{shown.setMonth(shown.getMonth()-1);render()});
  document.querySelector("[data-next-month]")?.addEventListener("click",()=>{shown.setMonth(shown.getMonth()+1);render()}); render();
})();