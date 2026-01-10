---
layout: page.njk
title: Workshops
locale: de
permalink: /de/workshops/
---

{% from "macros/workshopTile.njk" import workshopTile %}

<section class="mb-20 scroll-mt-20">
  <div class="horizontal-scroll-container overflow-x-auto overflow-y-hidden -mx-6 px-6 pb-6">
    <div class="flex gap-6 w-max">
      {% for workshop in collections.workshops_de %}
      <div class="w-80 flex-shrink-0">
        {{ workshopTile(
          workshop.data.title,
          ('/assets/pages/workshops/' + workshop.data.image) | url,
          workshop.url | url
        ) }}
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<style>
  {# Smooth horizontal scrolling #}
  .horizontal-scroll-container {
    scrollbar-width: thin;
    scrollbar-color: #8d5315 #1f1f1f;
  }
  
  .horizontal-scroll-container::-webkit-scrollbar {
    height: 8px;
  }
  
  .horizontal-scroll-container::-webkit-scrollbar-track {
    background: #1f1f1f;
  }
  
  .horizontal-scroll-container::-webkit-scrollbar-thumb {
    background: #8d5315;
    border-radius: 4px;
  }
  
  .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
    background: #a16419;
  }
</style>
