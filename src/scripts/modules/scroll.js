"use strict";

function scroll(options = {}) {
  const { distance = 0, scrollBarOnly = false, speed = 0 } = options;
  const dragState = this.dragState;
  const container = this.scrollState.container;
  const tabList = container.children[0];
  const scrollbarDistance = distance * this.scrollState.containerToContentRatio;

  const newThumbOffset = Math.max(
    0,
    Math.min(
      this.scrollState.thumbOffset + scrollbarDistance,
      this.scrollState.maxScrollbarThumbOffset
    )
  );

  this.scrollState.thumbOffset = newThumbOffset;
  requestAnimationFrame(() => {
    this.scrollState.scrollbarThumb.style.setProperty(
      "--thumb-offset",
      newThumbOffset + "px"
    );
  });

  if (dragState) {
    // if scrolling using drag (from onTabDragPointerMove)
    if (!scrollBarOnly) {
      dragState.tabListOffset += distance;
      dragState.tabListOffset = Math.min(
        dragState.tabListOffset,
        dragState.maxScrollTop - this.scrollState.scrollTop
      );
      dragState.tabListOffset = Math.max(
        dragState.tabListOffset,
        this.scrollState.scrollTop * -1
      );
      this.scrollState.tabListOffset = dragState.tabListOffset;
      tabList.classList.add("tab-list--scroll");
      const newOffset = dragState.tabListOffset * -1;
      tabList.style.setProperty("--y-offset", newOffset + "px");
    } else {
      dragState.tabListOffset = Math.min(
        dragState.tabListOffset,
        dragState.maxScrollTop - this.scrollState.scrollTop
      );
      dragState.tabListOffset = Math.max(
        dragState.tabListOffset,
        this.scrollState.scrollTop * -1
      );
      this.scrollState.tabListOffset = dragState.tabListOffset;
      const newOffset = dragState.tabListOffset * -1;
      tabList.style.setProperty("--y-offset", newOffset + "px");
    }
  }
}

module.exports = scroll;
