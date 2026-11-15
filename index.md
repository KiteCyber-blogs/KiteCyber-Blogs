---
layout: default
title: KiteCyber Blog
description: Insights on data loss prevention, cybersecurity, regulatory compliance, and GenAI security.
---

<section class="hero">
  <span class="article-label">Kite cybersecurity insights</span>
  <h1>Protect your data. Stay ahead of emerging threats.</h1>
  <p>
    Practical writing on data loss prevention, cybersecurity, regulatory
    compliance, and GenAI security.
  </p>
</section>

<section class="home-section">
  <div class="article-grid">
    {% for post in site.posts %}
    <article class="article-card">
      <h3>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      <p class="article-date">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncatewords: 36 }}</p>
      <a href="{{ post.url | relative_url }}">Read article</a>
    </article>
    {% endfor %}
  </div>
</section>
