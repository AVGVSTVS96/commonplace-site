const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((done) => setTimeout(done, ms));

const bar = document.querySelector<HTMLElement>(".bar")!;
new IntersectionObserver(([entry]) => bar.classList.toggle("named", !entry.isIntersecting), {
  rootMargin: "-56px 0px 0px 0px",
}).observe(document.querySelector(".mark")!);

const replay = async (term: HTMLElement) => {
  const body = term.querySelector<HTMLElement>(".term-body")!;
  const lines = [...term.querySelectorAll<HTMLElement>(".line")];
  const cursor = term.querySelector<HTMLElement>(".cur")!;
  body.style.minHeight = `${body.offsetHeight}px`;
  for (const line of lines) line.classList.add("pending");
  await wait(600);
  for (const line of lines) {
    line.classList.remove("pending");
    if (!line.classList.contains("cmd")) continue;
    const target = line.querySelector<HTMLElement>(".t")!;
    const text = target.textContent ?? "";
    target.textContent = "";
    target.after(cursor);
    for (const char of text) {
      await wait(35);
      target.textContent += char;
    }
    if (line.classList.contains("end")) break;
    await wait(240);
    cursor.remove();
    let next = line.nextElementSibling;
    while (next && !next.classList.contains("cmd")) {
      next.classList.remove("pending");
      next = next.nextElementSibling;
    }
    await wait(700);
  }
};

const hero = document.querySelector<HTMLElement>("[data-play]");
if (hero && !reducedMotion) void document.fonts.ready.then(() => replay(hero));

const config = document.querySelector<HTMLElement>(".config")!;
const rules = [...config.querySelectorAll<HTMLElement>(".rules li")];
const highlight = (rule: HTMLElement) => {
  config.dataset.hl = rule.dataset.line;
  for (const other of rules) other.classList.toggle("on", other === rule);
};
highlight(rules[0]);
for (const rule of rules) {
  rule.addEventListener("pointerenter", () => highlight(rule));
  rule.addEventListener("focusin", () => highlight(rule));
  rule.addEventListener("click", () => highlight(rule));
}

for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  const source = document.getElementById(button.dataset.copy!)!;
  const reset = () => {
    button.classList.remove("done");
    button.textContent = "Copy";
  };
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(source.innerText.replaceAll(/^\$ /gm, "").trim());
    button.classList.add("done");
    button.textContent = "Copied";
  });
  button.addEventListener("blur", reset);
  button.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") reset();
  });
}
