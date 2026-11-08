const find = (selector: string, root: ParentNode = document) => {
  const found = root.querySelector<HTMLElement>(selector);

  if (found === null) {
    throw new Error(`index.html has no ${selector}`);
  }

  return found;
};

const wait = async (ms: number) => {
  // oxlint-disable-next-line promise/avoid-new -- setTimeout has no promise form in the browser
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const bar = find(".bar");

new IntersectionObserver(
  ([entry]) => {
    bar.classList.toggle("named", entry?.isIntersecting === false);
  },
  { rootMargin: "-56px 0px 0px 0px" },
).observe(find(".mark"));

const replay = async (term: HTMLElement) => {
  const body = find(".term-body", term);
  const lines = [...term.querySelectorAll<HTMLElement>(".line")];
  const cursor = find(".cur", term);
  body.style.minHeight = `${body.offsetHeight}px`;

  for (const line of lines) {
    line.classList.add("pending");
  }

  await wait(600);

  for (const line of lines) {
    line.classList.remove("pending");

    if (!line.classList.contains("cmd")) {
      continue;
    }

    const target = find(".t", line);
    const text = target.textContent;
    target.textContent = "";
    target.after(cursor);

    for (const char of text) {
      await wait(35);
      target.textContent += char;
    }

    if (line.classList.contains("end")) {
      break;
    }

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

if (hero && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const play = async () => {
    await document.fonts.ready;
    await replay(hero);
  };

  void play();
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
