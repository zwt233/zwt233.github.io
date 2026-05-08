---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Our recent open-source work centers on **Data-centric AI**: preparing high-quality data, dynamically interacting with models during training, evaluating models in an agentic way, and extending the ecosystem to world models and research productivity tools.

<style>
.project-list {
  display: grid;
  gap: 1rem;
  margin: 1rem 0 2rem;
}

.project-card {
  align-items: center;
  border: 1px solid #e6e8eb;
  border-radius: 8px;
  display: grid;
  gap: 1.1rem;
  grid-template-columns: minmax(120px, 180px) minmax(0, 1fr);
  padding: 1rem;
}

.project-card--text {
  grid-template-columns: 1fr;
}

.project-card__logo {
  align-items: center;
  background: #fff;
  border: 1px solid #edf0f2;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  min-height: 110px;
  padding: 0.8rem;
}

.project-card__logo img {
  display: block;
  max-height: 90px;
  max-width: 100%;
  object-fit: contain;
}

.project-card__logo--square img {
  max-height: 115px;
}

.project-card__logo--banner img {
  max-height: 110px;
}

.project-card h3 {
  margin: 0 0 0.35rem;
}

.project-card p {
  margin: 0 0 0.55rem;
}

.project-card__links {
  font-size: 0.86em;
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .project-card {
    grid-template-columns: 1fr;
  }

  .project-card__logo {
    min-height: 84px;
  }
}
</style>

## 1. Data Preparation and Parsing

<div class="project-list">
  <article class="project-card">
    <a class="project-card__logo" href="https://github.com/OpenDCAI/DataFlow" aria-label="DataFlow">
      <img src="/images/projects/dataflow-logo.png" alt="DataFlow logo">
    </a>
    <div>
      <h3>DataFlow</h3>
      <p><a href="https://github.com/OpenDCAI/DataFlow">DataFlow</a> is an LLM-driven framework for unified data preparation and workflow automation. It abstracts data operators, prompts, and workflows into reusable pipelines, supporting data generation, cleaning, filtering, evaluation, and format conversion for training, fine-tuning, RAG, and domain-specific AI applications.</p>
      <p>DataFlow also provides a foundation for the broader <strong>DataFlow-EcoSystem</strong>, where multiple repositories can follow shared operator and pipeline protocols and collaborate as a data-centric AI toolchain.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/DataFlow">Code</a> / <a href="https://arxiv.org/abs/2512.16676">Technical Report</a> / <a href="https://opendcai.github.io/DataFlow-Doc/">Documentation</a></p>
    </div>
  </article>

  <article class="project-card">
    <a class="project-card__logo" href="https://github.com/opendatalab/MinerU" aria-label="MinerU 2.5">
      <img src="/images/projects/mineru-logo.png" alt="MinerU logo">
    </a>
    <div>
      <h3>MinerU 2.5</h3>
      <p><a href="https://github.com/opendatalab/MinerU">MinerU</a> is a high-accuracy document parsing engine for LLM, RAG, and agent workflows. <strong>MinerU 2.5</strong> introduces a decoupled vision-language parsing strategy for efficient high-resolution document understanding, separating global layout analysis from local content recognition to better handle dense text, formulas, tables, and complex layouts.</p>
      <p class="project-card__links"><a href="https://github.com/opendatalab/MinerU">Code</a> / <a href="https://arxiv.org/abs/2509.22186">Technical Report</a> / <a href="https://openreview.net/forum?id=GqfnTTsSFr">ACL 2026 Industry Track Oral</a></p>
    </div>
  </article>

  <article class="project-card">
    <a class="project-card__logo" href="https://github.com/opendatalab/MinerU-HTML" aria-label="MinerU-HTML">
      <img src="/images/projects/mineru-logo.png" alt="MinerU logo">
    </a>
    <div>
      <h3>MinerU-HTML</h3>
      <p><a href="https://github.com/opendatalab/MinerU-HTML">MinerU-HTML</a> is an SLM-powered HTML main-content extractor. It converts complex web pages into cleaner AI-ready content by removing boilerplate, navigation, ads, and metadata while preserving structured elements such as code blocks, formulas, and tables.</p>
      <p>The resulting extraction pipeline supports web-scale corpus construction, Deep Research agents, RAG, and model training.</p>
      <p class="project-card__links"><a href="https://github.com/opendatalab/MinerU-HTML">Code</a> / <a href="https://arxiv.org/abs/2511.16397">Technical Report</a> / <a href="https://huggingface.co/opendatalab/MinerU-HTML-v1.1-hunyuan0.5B-compact">Model</a></p>
    </div>
  </article>

  <article class="project-card">
    <a class="project-card__logo project-card__logo--square" href="https://github.com/OpenDCAI/Flash-MinerU" aria-label="Flash-MinerU">
      <img src="/images/projects/flash-mineru-logo.png" alt="Flash-MinerU logo">
    </a>
    <div>
      <h3>Flash-MinerU</h3>
      <p><a href="https://github.com/OpenDCAI/Flash-MinerU">Flash-MinerU</a> is a Ray-powered acceleration layer for MinerU that turns PDF-to-Markdown parsing into a scalable data infrastructure component. It keeps MinerU's parsing logic and output format while adding distributed execution, high-throughput VLM inference, and asynchronous pipeline parallelism for multi-GPU and cluster-ready document processing.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/Flash-MinerU">Code</a> / <a href="https://pypi.org/project/flash-mineru/">PyPI</a> / <a href="https://github.com/OpenDCAI/Flash-MinerU/blob/main/docs/BENCHMARK.md">Benchmark</a></p>
    </div>
  </article>

  <article class="project-card">
    <a class="project-card__logo" href="https://github.com/OpenDCAI/DataFlow-MM" aria-label="DataFlow-MM and AgentFlow">
      <img src="/images/projects/dataflow-logo.png" alt="DataFlow logo">
    </a>
    <div>
      <h3>DataFlow-MM and AgentFlow</h3>
      <p><a href="https://github.com/OpenDCAI/DataFlow-MM">DataFlow-MM</a> extends the DataFlow philosophy to multimodal data such as images, audio, and videos. <a href="https://github.com/OpenDCAI/AgentFlow">AgentFlow</a> provides an agent-data synthesis framework covering scenarios such as RAG, multimodal RAG, Deep Research, code, and GUI environments.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/DataFlow-MM">DataFlow-MM Code</a> / <a href="https://opendcai.github.io/DataFlow-MM-Doc/zh/mm_guide/intro/basicinfo/intro/">DataFlow-MM Docs</a> / <a href="https://github.com/OpenDCAI/AgentFlow">AgentFlow Code</a></p>
    </div>
  </article>

  <article class="project-card project-card--text">
    <div>
      <h3>RayOrch</h3>
      <p><a href="https://github.com/OpenDCAI/RayOrch">RayOrch</a> is a lightweight orchestration framework for asynchronous Ray pipelines. It provides <code>RayModule</code>, overlapped micro-batch execution, and DAG-style scheduling, making it easier to dynamically schedule and serve multiple deep learning models across NLP, CV, and multimodal inference pipelines.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/RayOrch">Code</a></p>
    </div>
  </article>
</div>

## 2. Data-Model Interaction Training

<div class="project-list">
  <article class="project-card">
    <a class="project-card__logo project-card__logo--banner" href="https://github.com/OpenDCAI/DataFlex" aria-label="DataFlex">
      <img src="/images/projects/dataflex-logo.png" alt="DataFlex logo">
    </a>
    <div>
      <h3>DataFlex</h3>
      <p><a href="https://github.com/OpenDCAI/DataFlex">DataFlex</a> is a data-centric dynamic training framework built on top of LLaMA-Factory. It supports three core paradigms of data optimization during training: sample selection, domain mixture adjustment, and sample reweighting. By integrating difficult-to-reproduce data selection and weighting methods into one framework, DataFlex improves reproducibility and enables more flexible model-data interaction.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/DataFlex">Code</a> / <a href="https://arxiv.org/abs/2603.26164">Technical Report</a> / <a href="https://opendcai.github.io/DataFlex-Doc/">Documentation</a></p>
    </div>
  </article>

  <article class="project-card">
    <a class="project-card__logo project-card__logo--square" href="https://github.com/OpenDCAI/One-Eval" aria-label="One-Eval">
      <img src="/images/projects/one-eval-logo.png" alt="One-Eval logo">
    </a>
    <div>
      <h3>One-Eval</h3>
      <p><a href="https://github.com/OpenDCAI/One-Eval">One-Eval</a> is an agentic system for automated and traceable LLM evaluation. It targets <strong>NL2Eval</strong>: starting from a natural-language evaluation requirement, the system plans benchmarks, prepares datasets, runs inference, selects metrics, and generates reports with traceable evidence and human-in-the-loop checkpoints.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/One-Eval">Code</a> / <a href="https://arxiv.org/abs/2603.09821">Technical Report</a></p>
    </div>
  </article>
</div>

## 3. World Models and Scientific Productivity

<div class="project-list">
  <article class="project-card">
    <a class="project-card__logo project-card__logo--banner" href="https://github.com/OpenDCAI/OpenWorldLib" aria-label="OpenWorldLib">
      <img src="/images/projects/openworldlib-logo.png" alt="OpenWorldLib logo">
    </a>
    <div>
      <h3>OpenWorldLib</h3>
      <p><a href="https://github.com/OpenDCAI/OpenWorldLib">OpenWorldLib</a> is a unified codebase and framework for advanced world models. It defines a world model as a model or framework centered on perception, equipped with interaction and long-term memory capabilities, for understanding and predicting the complex world. OpenWorldLib integrates tasks such as multimodal understanding, visual action prediction, visual generation, and simulation into a standardized research and development framework.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/OpenWorldLib">Code</a> / <a href="https://arxiv.org/abs/2604.04707">Technical Report</a></p>
    </div>
  </article>

  <article class="project-card">
    <a class="project-card__logo project-card__logo--square" href="https://github.com/OpenDCAI/Paper2Any" aria-label="Paper2Any">
      <img src="/images/projects/paper2any-logo.png" alt="Paper2Any logo">
    </a>
    <div>
      <h3>Paper2Any</h3>
      <p><a href="https://github.com/OpenDCAI/Paper2Any">Paper2Any</a> turns papers, text, topics, and screenshots into editable research assets. It supports model architecture diagrams, technical route diagrams, experimental plots, slide decks, rebuttals, posters, narrated videos, and citation exploration.</p>
      <p>The project focuses on paper multimodal workflows, making research communication artifacts editable rather than static.</p>
      <p class="project-card__links"><a href="https://github.com/OpenDCAI/Paper2Any">Code</a> / <a href="http://dcai-paper2any.nas.cpolar.cn/">Demo</a> / <a href="https://arxiv.org/abs/2511.18036">Paper2SysArch</a> / <a href="https://arxiv.org/abs/2602.09809">SciFlow-Bench</a></p>
    </div>
  </article>
</div>

## 4. Ecosystem Summary

| Project | Main Role | Links |
| --- | --- | --- |
| DataFlow | Unified LLM data preparation and workflow automation | [Code](https://github.com/OpenDCAI/DataFlow) / [Technical Report](https://arxiv.org/abs/2512.16676) / [Docs](https://opendcai.github.io/DataFlow-Doc/) |
| MinerU 2.5 | High-resolution document parsing VLM | [Code](https://github.com/opendatalab/MinerU) / [Technical Report](https://arxiv.org/abs/2509.22186) / [ACL 2026](https://openreview.net/forum?id=GqfnTTsSFr) |
| MinerU-HTML | AI-ready web-page main-content extraction | [Code](https://github.com/opendatalab/MinerU-HTML) / [Technical Report](https://arxiv.org/abs/2511.16397) / [Model](https://huggingface.co/opendatalab/MinerU-HTML-v1.1-hunyuan0.5B-compact) |
| Flash-MinerU | Ray-powered distributed acceleration for MinerU parsing | [Code](https://github.com/OpenDCAI/Flash-MinerU) / [PyPI](https://pypi.org/project/flash-mineru/) / [Benchmark](https://github.com/OpenDCAI/Flash-MinerU/blob/main/docs/BENCHMARK.md) |
| DataFlow-MM | Multimodal data preparation | [Code](https://github.com/OpenDCAI/DataFlow-MM) / [Docs](https://opendcai.github.io/DataFlow-MM-Doc/zh/mm_guide/intro/basicinfo/intro/) |
| AgentFlow | Agent data synthesis framework | [Code](https://github.com/OpenDCAI/AgentFlow) |
| RayOrch | Ray-based asynchronous model orchestration | [Code](https://github.com/OpenDCAI/RayOrch) |
| DataFlex | Data selection, mixture, and reweighting during training | [Code](https://github.com/OpenDCAI/DataFlex) / [Technical Report](https://arxiv.org/abs/2603.26164) / [Docs](https://opendcai.github.io/DataFlex-Doc/) |
| One-Eval | Agentic NL2Eval evaluation system | [Code](https://github.com/OpenDCAI/One-Eval) / [Technical Report](https://arxiv.org/abs/2603.09821) |
| OpenWorldLib | Unified framework for advanced world models | [Code](https://github.com/OpenDCAI/OpenWorldLib) / [Technical Report](https://arxiv.org/abs/2604.04707) |
| Paper2Any | Editable scientific figures, slides, and paper workflows | [Code](https://github.com/OpenDCAI/Paper2Any) / [Demo](http://dcai-paper2any.nas.cpolar.cn/) / [Paper2SysArch](https://arxiv.org/abs/2511.18036) / [SciFlow-Bench](https://arxiv.org/abs/2602.09809) |
