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
        "dataset", "datasets", "benchmark", "benchmarking", "evaluating", "evaluation",
        "assessing", "quality", "quality evaluation", "verifier", "verifybench", "verify",
        "verification", "judge", "data augmentation", "data distillation", "data composition",
        "data selection", "data preparation", "data management", "data distribution",
        "training data", "pre-training data", "pretraining data", "data synthesizing",
        "synthetic data", "data generator", "data expansion", "data fusion",
        "sample reweighting", "sample selection", "curriculum learning", "datasculpt",
        "data sculpt", "data management framework", "data efficiency", "data-efficient",
        "mineru", "document parsing", "parsing", "ocr", "table extraction", "chart",
        "diagram", "rag", "retrieval-augmented", "retrieval augmented", "text-to-sql",
        "text2sql", "sql", "database exploration", "structured data", "unstructured data",
        "active learning", "condensation", "distillation", "decomposition", "datamind",
        "dataflex", "one-eval", "agentflow"
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
    { label: "Data-Centric AI", topic: "data-centric", x: 50, y: 50, size: 3.0, color: "#0f4c81" },
    { label: "LLM", topic: "llm-agent", x: 54, y: 67, size: 2.0, color: "#1e6091" },
    { label: "Multimodal", topic: "multimodal", x: 78, y: 39, size: 1.8, color: "#2b6cb0" },
    { label: "Graph Learning", topic: "db-graph", x: 27, y: 42, size: 1.8, color: "#174c75" },
    { label: "Document Parsing", topic: "document-ai", x: 27, y: 63, size: 1.45, color: "#256f9f" },
    { label: "Text-to-SQL", topic: "db-graph", x: 63, y: 24, size: 1.35, color: "#0f6b9c" },
    { label: "RAG", topic: "llm-agent", x: 16, y: 55, size: 1.35, color: "#176aa6" },
    { label: "Agents", topic: "llm-agent", x: 80, y: 61, size: 1.35, color: "#174c75" },
    { label: "Benchmark", topic: "data-centric", x: 22, y: 25, size: 1.28, color: "#2b6cb0" },
    { label: "Vision-Language", topic: "multimodal", x: 47, y: 33, size: 1.22, color: "#3978a8" },
    { label: "AI4Science", topic: "ai4science", x: 36, y: 79, size: 1.22, color: "#0f4c81" },
    { label: "Data Analytics", topic: "data-centric", x: 70, y: 76, size: 1.15, color: "#2b6cb0" },
    { label: "World Models", topic: "multimodal", x: 84, y: 25, size: 1.0, color: "#487ea8" },
    { label: "Reasoning", topic: "llm-agent", x: 43, y: 16, size: 1.08, color: "#0b4f8a" },
    { label: "Retrieval", topic: "db-graph", x: 15, y: 76, size: 1.0, color: "#3978a8" },
    { label: "Video", topic: "multimodal", x: 88, y: 50, size: 1.0, color: "#176aa6" },
    { label: "AutoML", topic: "systems", x: 33, y: 90, size: 0.92, color: "#5b7fa6" },
    { label: "Distributed Systems", topic: "systems", x: 61, y: 90, size: 0.92, color: "#2f6f9f" },
    { label: "Recommendation", topic: "db-graph", x: 17, y: 36, size: 0.88, color: "#5b7fa6" },
    { label: "Medical AI", topic: "ai4science", x: 73, y: 15, size: 0.88, color: "#3978a8" }
  ];

  var acronymKeywords = {
    rag: true,
    sql: true,
    ocr: true,
    pdf: true,
    html: true,
    llm: true,
    vlm: true,
    mllm: true,
    gnn: true,
    kdd: true,
    www: true,
    mm: true,
    ai: true
  };

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z0-9#]+;/g, " ")
      .replace(/[^a-z0-9#+]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function keywordMatches(text, keyword) {
    var term = normalize(keyword);
    if (!term) {
      return false;
    }
    if (acronymKeywords[term] || term.length <= 3) {
      return new RegExp("(^|\\s)" + escapeRegExp(term) + "(\\s|$)").test(text);
    }
    return text.indexOf(term) !== -1;
  }

  function categoryMatches(category, text) {
    return category.id === "all" || category.keywords.some(function (keyword) {
      if (category.id === "data-centric") {
        return keywordMatches(text, keyword);
      }
      return text.indexOf(keyword) !== -1 || text.indexOf(normalize(keyword)) !== -1;
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
          return item.categories.indexOf(term.topic) !== -1 || keywordMatches(item.text, term.label);
        }).length;
        var word = document.createElement("button");
        word.type = "button";
        word.className = "pub-word-cloud__word";
        word.textContent = term.label;
        word.style.setProperty("--pub-word-left", term.x + "%");
        word.style.setProperty("--pub-word-top", term.y + "%");
        word.style.setProperty("--pub-word-color", term.color);
        word.style.setProperty("--pub-word-weight", term.size > 2 ? "800" : "700");
        word.style.setProperty("--pub-word-size", (0.7 + term.size * 0.28 + Math.min(count, 30) * 0.005) + "rem");
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
