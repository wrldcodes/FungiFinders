const filterBar = document.querySelectorAll(".filter-bar");
const seasonSelect = document.querySelector("#season");
const typeSelect = document.querySelector("#type");
const cards = document.querySelectorAll(".card");
const noMatchMsg = document.querySelector(".no-matches");

const currentFilters = {
  season: "all",
  type: "all",
};
seasonSelect.addEventListener("change", updateFilter);

typeSelect.addEventListener("change", updateFilter);

cards.forEach((card, index) => {
   const mushroomId = `mushroom-${index + 1}`;
   card.style.viewTransitionName = `card-${mushroomId}`;
  console.log(
    
    card
    
  );
});
function updateFilter(e) {
  const filterType = e.target.name;
  currentFilters[filterType] = e.target.value;
  if (!document.startViewTransition()) {
    filterCards();
    return;
  }
  document.startViewTransition(() => filterCards());
}

function filterCards() {
  const selectedSeason = seasonSelect.value;
  const selectedType = typeSelect.value;

  let visibleCount = 0;

  cards.forEach((card) => {
    const cardSeason = card
      .querySelector("[data-season]")
      ?.getAttribute("data-season");
    const cardType = card
      .querySelector("[data-type]")
      ?.getAttribute("data-type");

    const seasonMatch =
      selectedSeason === "all" || cardSeason === selectedSeason;
    const typeMatch = selectedType === "all" || cardType === selectedType;

    if (seasonMatch && typeMatch) {
      card.style.display = "grid";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Show/hide no matches message
  if (visibleCount === 0) {
    noMatchMsg.removeAttribute("hidden");
  } else {
    noMatchMsg.setAttribute("hidden", "");
  }
}
