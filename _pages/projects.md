---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

1.Angel
------
[Angel](https://github.com/Angel-ML/angel) is a high-performance distributed machine learning and graph computing platform based on the philosophy of Parameter Server. It is tuned for performance with big data from Tencent and has a wide range of applicability and stability, demonstrating increasing advantage in handling higher dimension model. Angel is jointly developed by Tencent and Peking University, taking account of both high availability  in industry and innovation in academia.

<p align="center">
<img src="/images/angel_logo.png" width="30%">
</p>

With model-centered core design concept, **Angel** partitions parameters of complex models into multiple parameter-server nodes, and implements a variety of machine learning algorithms and graph algorithms using efficient model-updating interfaces and functions, as well as flexible consistency model for synchronization.
**Angel** is developed with **Java** and **Scala**.  It supports running on **Yarn**. With **PS Service** abstraction, it supports **Spark on Angel**.  Graph computing and deep learning frameworks support is under development and will be released in the future.

We welcome everyone interested in machine learning or graph computing to contribute code, create issues or pull requests. Please refer to  [Angel Contribution Guide](https://github.com/Tencent/angel/blob/master/CONTRIBUTING.md) for more detail.

2.MindWare
------
[MindWare](https://github.com/PKU-DAIR/mindware) is an efficient open-source system to help users to automate the process of 1) data pre-processing, 2) feature engineering, 3) algorithm selection, 4) architecture design, 5) hyper-parameter tuning, and 6) model ensembling. It is capable of improving its AutoML power by decomposing the entire large AutoML search space into small ones, and solve each sub-problems jointly and efficiently.

<p align="center">
<img src="/images/mindware.png" width="30%">
</p>

MindWare is developed by <a href="http://net.pku.edu.cn/~cuibin/" target="_blank" rel="nofollow">DAIR Lab</a> at Peking University.
The goal of MindWare is to make machine learning easier to apply both in industry and academia.

3.OpenBox
------
[OpenBox](https://open-box.readthedocs.io/en/latest) is an efficient open-source system designed for solving generalized black-box optimization (BBO) problems.
<p align="center">
<img src="/images/Openbox.png" width="30%">
</p>
It owns the following characteristics:
1. BBO with multiple objectives and constraints.
2. BBO with transfer learning.
3. BBO with distributed parallelization.
4. BBO with multi-fidelity acceleration.
5. BBO with early stops.

