(function () {
  var categories = [
    {
      id: "all",
      label: "All",
      short: "ALL",
      color: "#e9ddca",
      text: "#3f3327",
      keywords: []
    },
    {
      id: "data-centric",
      label: "Data-Centric AI",
      short: "DCAI",
      color: "#dbeafe",
      text: "#17406f",
      keywords: [
        "data-centric", "dataflow", "data synthesis", "data analytics", "data analysis",
        "dataset", "benchmark", "data augmentation", "data distillation", "data composition",
        "data selection", "data preparation", "quality evaluation", "verifier", "verifybench"
      ]
    },
    {
      id: "llm-agent",
      label: "LLM & Agents",
      short: "LLM",
      color: "#f5dddd",
      text: "#8d1f1f",
      keywords: [
        "llm", "large language", "language model", "agent", "agentic", "rag",
        "retrieval-augmented", "tool-use", "webagent", "webshaper", "reasoning model",
        "text-to-sql", "code generation", "multi-turn", "information seeking"
      ]
    },
    {
      id: "multimodal",
      label: "Multimodal & Vision",
      short: "MM",
      color: "#e5f0dc",
      text: "#2f5a29",
      keywords: [
        "multimodal", "multi-modal", "vision", "visual", "video", "image", "audio-video",
        "vlm", "mllm", "vision-language", "text-to-image", "image generation", "diffusion",
        "caption", "perception", "cross-modal"
      ]
    },
    {
      id: "document-ai",
      label: "Document AI",
      short: "DOC",
      color: "#fff0c7",
      text: "#6c4a00",
      keywords: [
        "mineru", "document", "parsing", "pdf", "html", "chart", "diagram",
        "math expression", "scientific diagram", "table extraction", "paper2"
      ]
    },
    {
      id: "db-graph",
      label: "DB & Graph",
      short: "DBG",
      color: "#e6e0f4",
      text: "#4a3376",
      keywords: [
        "graph", "gnn", "graph neural", "database", "sql", "query", "knowledge graph",
        "recommendation", "retrieval", "vldb", "sigmod", "icde", "kdd", "cikm"
      ]
    },
    {
      id: "ai4science",
      label: "AI4Science",
      short: "SCI",
      color: "#e0f2ef",
      text: "#225a51",
      keywords: [
        "science", "scientific", "glycan", "medical", "medicine", "bioinformatics",
        "math", "mathematical", "causal", "physics", "chemistry", "health"
      ]
    },
    {
      id: "systems",
      label: "Systems & AutoML",
      short: "SYS",
      color: "#e8edf5",
      text: "#2e4669",
      keywords: [
        "system", "framework", "distributed", "optimization", "automl", "efficient",
        "efficiency", "scalable", "scaling", "inference", "training", "pipeline"
      ]
    }
  ];

  var cloudTerms = [
    { label: "Data-Centric AI", topic: "data-centric", x: 50, y: 48, size: 3.5, color: "#2f5a29" },
    { label: "LLM", topic: "llm-agent", x: 52, y: 67, size: 2.2, color: "#9d1f1f" },
    { label: "Multimodal", topic: "multimodal", x: 66, y: 42, size: 2.0, color: "#9d1f1f" },
    { label: "Graph Learning", topic: "db-graph", x: 36, y: 36, size: 2.0, color: "#1d4671" },
    { label: "Document Parsing", topic: "document-ai", x: 32, y: 64, size: 1.6, color: "#2f5a29" },
    { label: "Text-to-SQL", topic: "db-graph", x: 64, y: 24, size: 1.45, color: "#2f5a29" },
    { label: "RAG", topic: "llm-agent", x: 24, y: 47, size: 1.55, color: "#9d1f1f" },
    { label: "Agents", topic: "llm-agent", x: 75, y: 58, size: 1.6, color: "#1d4671" },
    { label: "Benchmark", topic: "data-centric", x: 26, y: 30, size: 1.45, color: "#1d4671" },
    { label: "Vision-Language", topic: "multimodal", x: 55, y: 30, size: 1.35, color: "#2f5a29" },
    { label: "AI4Science", topic: "ai4science", x: 42, y: 77, size: 1.5, color: "#1d4671" },
    { label: "Data Analytics", topic: "data-centric", x: 72, y: 73, size: 1.25, color: "#9d1f1f" },
    { label: "World Models", topic: "multimodal", x: 81, y: 34, size: 1.1, color: "#6c4a2b" },
    { label: "Reasoning", topic: "llm-agent", x: 45, y: 20, size: 1.25, color: "#9d1f1f" },
    { label: "Retrieval", topic: "db-graph", x: 20, y: 72, size: 1.1, color: "#2f5a29" },
    { label: "Video", topic: "multimodal", x: 79, y: 47, size: 1.15, color: "#1d4671" },
    { label: "AutoML", topic: "systems", x: 34, y: 84, size: 1.05, color: "#4a3376" },
    { label: "Distributed Systems", topic: "systems", x: 58, y: 84, size: 1.05, color: "#2f5a29" },
    { label: "Recommendation", topic: "db-graph", x: 17, y: 56, size: 1.0, color: "#6c4a2b" },
    { label: "Medical AI", topic: "ai4science", x: 75, y: 16, size: 1.0, color: "#2f5a29" }
  ];

  function normalize(text) {
    return (text || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function categoryMatches(category, text) {
    return category.id === "all" || category.keywords.some(function (keyword) {
      return text.indexOf(keyword) !== -1;
    });
  }

  function findVenue(text) {
    var match = text.match(/\b(ICML|NeurIPS|ICLR|ACL|CVPR|EMNLP|WWW|SIGKDD|KDD|AAAI|SIGIR|VLDB|SIGMOD|ICDE|CIKM|TKDE|JMLR|AAMAS|IJCAI|ICDM|WSDM|ACM MM|MM|NAACL|COLING|Bioinformatics)\s*20\d{2}(?:\s*(?:Main|Findings|Oral|Spotlight|Industry Track|regular|Dataset|Position|CCF-[ABC]|\([^)]+\)))?/i);
    return match ? match[0].replace(/\s+/g, " ").trim() : "";
  }

  function applyItemChrome(item, matchedCategories) {
    var primary = matchedCategories[0] || categories[0];
    item.element.dataset.pubCode = primary.short;
    item.element.style.setProperty("--pub-code-bg", primary.color);
    item.element.style.setProperty("--pub-code-color", primary.text);

    if (item.element.querySelector(".pub-item-tags")) {
      return;
    }

    var tags = document.createElement("div");
    tags.className = "pub-item-tags";

    var venue = findVenue(item.text);
    if (venue) {
      var venueTag = document.createElement("span");
      venueTag.className = "pub-item-tag";
      venueTag.textContent = venue;
      tags.appendChild(venueTag);
    }

    matchedCategories.slice(0, 4).forEach(function (category) {
      var tag = document.createElement("span");
      tag.className = "pub-item-tag";
      tag.textContent = category.label;
      tags.appendChild(tag);
    });

    if (tags.children.length) {
      item.element.appendChild(tags);
    }
  }

  function init() {
    var root = document.querySelector("[data-publication-explorer]");
    var content = document.querySelector(".page__content") || document.querySelector(".archive");
    if (!root || !content) {
      return;
    }

    var filtersEl = root.querySelector("[data-publication-filters]");
    var cloudEl = root.querySelector("[data-publication-cloud]");
    var searchInput = root.querySelector("[data-publication-search]");
    var clearButton = root.querySelector("[data-publication-clear]");
    var summaryEl = root.querySelector("[data-publication-summary]");
    var yearHeadings = Array.prototype.slice.call(content.querySelectorAll("h1, h2")).filter(function (heading) {
      return /^\d{4}$/.test(heading.textContent.trim());
    });
    var items = [];

    yearHeadings.forEach(function (heading) {
      var year = heading.textContent.trim();
      var count = document.createElement("span");
      count.className = "pub-year-count";
      heading.appendChild(count);

      var node = heading.nextElementSibling;
      while (node && !(node.matches("h1, h2") && /^\d{4}$/.test(node.textContent.trim()))) {
        if (node.tagName === "OL") {
          node.classList.add("publication-list");
          Array.prototype.slice.call(node.children).forEach(function (li) {
            if (li.tagName !== "LI") {
              return;
            }
            li.classList.add("publication-item");
            li.dataset.pubYear = year;
            var text = normalize(li.textContent);
            var matchedCategories = categories.filter(function (category) {
              return category.id !== "all" && categoryMatches(category, text);
            });
            var item = {
              element: li,
              text: text,
              year: year,
              categories: matchedCategories.map(function (category) { return category.id; })
            };
            applyItemChrome(item, matchedCategories);
            items.push(item);
          });
        }
        node = node.nextElementSibling;
      }
    });

    var state = {
      category: "all",
      query: ""
    };

    var params = new URLSearchParams(window.location.search);
    if (params.get("topic")) {
      state.category = params.get("topic");
    }
    if (!categories.some(function (category) { return category.id === state.category; })) {
      state.category = "all";
    }
    state.query = params.get("q") || "";
    searchInput.value = state.query;

    function countForCategory(category) {
      if (category.id === "all") {
        return items.length;
      }
      return items.filter(function (item) {
        return item.categories.indexOf(category.id) !== -1;
      }).length;
    }

    function renderFilters() {
      filtersEl.innerHTML = "";
      categories.forEach(function (category) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "pub-filter-button";
        button.dataset.topic = category.id;
        button.innerHTML = category.label + ' <span class="pub-filter-count">' + countForCategory(category) + "</span>";
        button.addEventListener("click", function () {
          state.category = category.id;
          update();
        });
        filtersEl.appendChild(button);
      });
    }

    function renderCloud() {
      cloudEl.innerHTML = "";
      cloudTerms.forEach(function (term) {
        var count = items.filter(function (item) {
          return item.categories.indexOf(term.topic) !== -1 || item.text.indexOf(normalize(term.label)) !== -1;
        }).length;
        var word = document.createElement("button");
        word.type = "button";
        word.className = "pub-word-cloud__word";
        word.textContent = term.label;
        word.style.setProperty("--pub-word-left", term.x + "%");
        word.style.setProperty("--pub-word-top", term.y + "%");
        word.style.setProperty("--pub-word-color", term.color);
        word.style.setProperty("--pub-word-weight", term.size > 2 ? "800" : "700");
        word.style.setProperty("--pub-word-size", (0.82 + term.size * 0.44 + Math.min(count, 30) * 0.012) + "rem");
        word.addEventListener("click", function () {
          state.category = term.topic || "all";
          state.query = "";
          searchInput.value = "";
          update();
        });
        cloudEl.appendChild(word);
      });
    }

    function updateUrl() {
      var next = new URLSearchParams();
      if (state.category && state.category !== "all") {
        next.set("topic", state.category);
      }
      if (state.query) {
        next.set("q", state.query);
      }
      var query = next.toString();
      var url = window.location.pathname + (query ? "?" + query : "") + window.location.hash;
      window.history.replaceState(null, "", url);
    }

    function update() {
      var query = normalize(state.query);
      var shown = 0;
      var byYear = {};

      items.forEach(function (item) {
        var categoryOk = state.category === "all" || item.categories.indexOf(state.category) !== -1;
        var queryOk = !query || item.text.indexOf(query) !== -1;
        var visible = categoryOk && queryOk;
        item.element.hidden = !visible;
        if (visible) {
          shown += 1;
          byYear[item.year] = (byYear[item.year] || 0) + 1;
        }
      });

      yearHeadings.forEach(function (heading) {
        var year = heading.textContent.replace(/\D/g, "").slice(0, 4);
        var count = byYear[year] || 0;
        var total = items.filter(function (item) { return item.year === year; }).length;
        var countEl = heading.querySelector(".pub-year-count");
        if (countEl) {
          countEl.textContent = count + " / " + total + " papers";
        }
        heading.hidden = count === 0;
      });

      Array.prototype.slice.call(content.querySelectorAll(".publication-list")).forEach(function (list) {
        list.hidden = Array.prototype.slice.call(list.children).every(function (child) {
          return child.hidden;
        });
      });

      Array.prototype.slice.call(filtersEl.querySelectorAll(".pub-filter-button")).forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.topic === state.category);
      });

      var active = categories.find(function (category) { return category.id === state.category; }) || categories[0];
      var queryText = query ? ' · keyword "' + state.query + '"' : "";
      summaryEl.textContent = "Showing " + shown + " of " + items.length + " publications · " + active.label + queryText;
      clearButton.hidden = state.category === "all" && !state.query;
      updateUrl();
    }

    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      update();
    });

    clearButton.addEventListener("click", function () {
      state.category = "all";
      state.query = "";
      searchInput.value = "";
      update();
    });

    renderFilters();
    renderCloud();
    update();
    document.documentElement.classList.add("pub-enhanced");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
