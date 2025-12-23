/* =========================
   DOM REFERENCES
========================= */

const filterToggle = document.querySelector(".filter-toggle");
const filterPanel = document.querySelector(".filter-panel");
const filterClose = document.querySelector(".filter-close");
const clearButton = document.querySelector(".filter-clear");
const filterTabs = document.querySelectorAll(".filter-tab");
const productCards = document.querySelectorAll(".product-card");
const promoSection = document.querySelector(".promo");

const skinInputs = document.querySelectorAll('[data-filter="skin"]');
const concernInputs = document.querySelectorAll('[data-filter="concern"]');

/* =========================
   STATE
========================= */

let activeCategory = "all";
let activeSkinTypes = [];
let activeConcerns = [];

/* =========================
   FILTER PANEL TOGGLE
========================= */

filterToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = filterPanel.classList.toggle("is-open");
  filterToggle.classList.toggle("is-active", isOpen);
  filterToggle.setAttribute("aria-expanded", isOpen);
});

// Close panel on outside click
document.addEventListener("click", (e) => {
  if (
    filterPanel.classList.contains("is-open") &&
    !filterPanel.contains(e.target) &&
    !filterToggle.contains(e.target)
  ) {
    filterPanel.classList.remove("is-open");
    filterToggle.classList.remove("is-active");
    filterToggle.setAttribute("aria-expanded", "false");
  }
});

filterClose.addEventListener("click", () => {
  filterPanel.classList.remove("is-open");
  filterToggle.classList.remove("is-active");
  filterToggle.setAttribute("aria-expanded", "false");
});

clearButton.addEventListener("click", () => {
  // Reset state
  activeCategory = "all";
  activeSkinTypes = [];
  activeConcerns = [];

  // Reset tabs
  filterTabs.forEach((tab) => tab.classList.remove("is-active"));
  document
    .querySelector('.filter-tab[data-ca="all"]')
    .classList.add("is-active");

  // Uncheck all checkboxes
  [...skinInputs, ...concernInputs].forEach((input) => {
    input.checked = false;
  });

  applyFilters();
});

/* =========================
   CORE FILTER LOGIC
========================= */

function applyFilters() {
  let visibleCount = 0;

  productCards.forEach((card) => {
    const cardType = card.dataset.type;
    const cardSkin = card.dataset.skin;
    const cardConcern = card.dataset.concern;

    const matchesCategory =
      activeCategory === "all" || cardType === activeCategory;

    const matchesSkin =
      activeSkinTypes.length === 0 ||
      cardSkin === "all" ||
      activeSkinTypes.includes(cardSkin);

    const matchesConcern =
      activeConcerns.length === 0 || activeConcerns.includes(cardConcern);

    if (matchesCategory && matchesSkin && matchesConcern) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  const noFiltersActive =
    activeCategory === "all" &&
    activeSkinTypes.length === 0 &&
    activeConcerns.length === 0;

  promoSection.style.display = noFiltersActive ? "block" : "none";

  document.body.classList.toggle("is-empty", visibleCount === 0);

  updateDisabledFilters();
}

/* =========================
   DISABLE IMPOSSIBLE FILTERS
========================= */

function updateDisabledFilters() {
  const visibleCards = Array.from(productCards).filter(
    (card) => card.style.display !== "none"
  );

  const availableSkins = new Set();
  const availableConcerns = new Set();

  visibleCards.forEach((card) => {
    availableSkins.add(card.dataset.skin);
    availableConcerns.add(card.dataset.concern);
  });

  // Skin type pills
  skinInputs.forEach((input) => {
    const pill = input.closest(".filter-pill");
    const isSelected = input.checked;

    pill.classList.toggle(
      "is-disabled",
      !isSelected && !availableSkins.has(input.value)
    );
  });

  // Skin concern pills
  concernInputs.forEach((input) => {
    const pill = input.closest(".filter-pill");
    const isSelected = input.checked;

    pill.classList.toggle(
      "is-disabled",
      !isSelected && !availableConcerns.has(input.value)
    );
  });
}

/* =========================
   CATEGORY TABS
========================= */

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");

    activeCategory = tab.dataset.ca;
    applyFilters();
  });
});

/* =========================
   SKIN TYPE FILTERS
========================= */

skinInputs.forEach((input) => {
  input.addEventListener("change", () => {
    activeSkinTypes = Array.from(skinInputs)
      .filter((i) => i.checked)
      .map((i) => i.value);

    applyFilters();
  });
});

/* =========================
   SKIN CONCERN FILTERS
========================= */

concernInputs.forEach((input) => {
  input.addEventListener("change", () => {
    activeConcerns = Array.from(concernInputs)
      .filter((i) => i.checked)
      .map((i) => i.value);

    applyFilters();
  });
});
