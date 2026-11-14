const find = (selector: string, root: ParentNode = document) => {
  const found = root.querySelector<HTMLElement>(selector);

  if (found === null) {
    throw new Error(`index.html has no ${selector}`);
  }

  return found;
};

const bar = find(".bar");

new IntersectionObserver(([entry]) => {
  const shown = entry?.isIntersecting === false;
  bar.classList.toggle("on", shown);
  bar.inert = !shown;
}).observe(find(".band"));

const scrollers = [...document.querySelectorAll<HTMLElement>(".term-body, .tree")];

const markOverflow = (scroller: HTMLElement) => {
  const hidden = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft;
  scroller.classList.toggle("fades", hidden > 1);
};

const resized = new ResizeObserver((entries) => {
  for (const { target } of entries) {
    if (target instanceof HTMLElement) {
      markOverflow(target);
    }
  }
});

for (const scroller of scrollers) {
  resized.observe(scroller);
  scroller.addEventListener(
    "scroll",
    () => {
      markOverflow(scroller);
    },
    { passive: true },
  );
}

const config = find(".config");
const rules = [...config.querySelectorAll<HTMLElement>(".rules li[data-line]")];

const highlight = (rule: HTMLElement | undefined) => {
  config.dataset.hl = rule?.dataset.line;

  for (const other of rules) {
    other.classList.toggle("on", other === rule);
  }
};

highlight(rules[0]);

for (const rule of rules) {
  for (const type of ["pointerenter", "focusin", "click"]) {
    rule.addEventListener(type, () => {
      highlight(rule);
    });
  }
}

for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  const source = find(`#${button.dataset.copy}`);

  const reset = () => {
    button.classList.remove("done");
    button.textContent = "Copy";
  };

  const copy = async () => {
    // oxlint-disable-next-line unicorn/prefer-dom-node-text-content -- innerText keeps the line breaks the terminal shows
    await navigator.clipboard.writeText(source.innerText.replaceAll(/^\$ /gmu, "").trim());
    button.classList.add("done");
    button.textContent = "Copied";
  };

  button.addEventListener("click", () => {
    void copy();
  });
  button.addEventListener("blur", reset);
  button.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") {
      reset();
    }
  });
}
