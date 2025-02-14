interface GetDropdownHorizontalPositionOptions {
  /**
   * If `true`, the dropdown menu doesn't get cut off by the parent.
   */
  ignoreContainerBounds?: boolean;

  /**
   * The dropdown placement property.
   */
  position?: "left" | "right";

  /**
   * The minimum required space from the left or right dropdown edge to the edge of the viewport
   * in pixels.
   */
  spacingThreshold?: number;
}

interface GetDropdownVerticalPositionOptions {
  /**
   * If `true`, the dropdown menu doesn't get cut off by the parent.
   */
  ignoreContainerBounds?: boolean;

  /**
   * The dropdown placement property.
   */
  position?: "top" | "bottom";

  /**
   * The minimum required space from the left or right dropdown edge to the edge of the viewport
   * in pixels.
   */
  spacingThreshold?: number;
}

interface Rect {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

function _getElementRelativePosition(
  child: HTMLElement,
  parent: HTMLElement | null,
): Rect {
  const { bottom, left, right, top } = child.getBoundingClientRect();
  const relativePosition: Rect = { bottom, left, right, top };

  if (parent) {
    const parentRect = parent.getBoundingClientRect();
    relativePosition.left -= parentRect.left;
    relativePosition.right -= parentRect.left;
    relativePosition.top -= parentRect.top;
    relativePosition.bottom -= parentRect.top;
  }

  return relativePosition;
}

/**
 * Returns the closest element (either the element itself or one of its ancestors) that can
 * be vertically scrolled.
 *
 * @param el The element from which to search.
 */
export function findClosestScrollableElement(
  el: HTMLElement | null,
): HTMLElement | null {
  function isScrollableElement(element: HTMLElement): boolean {
    const { overflowY } = window.getComputedStyle(element);
    if (overflowY !== "scroll" && overflowY !== "auto") {
      return false;
    }
    const { offsetHeight, scrollHeight } = element;
    const scrollableHeight = scrollHeight - offsetHeight;

    return scrollableHeight >= 0;
  }

  function isFixedElement(element: HTMLElement): boolean {
    return window.getComputedStyle(element).position === "fixed";
  }

  let currentElement = el;
  while (currentElement) {
    if (isFixedElement(currentElement)) {
      return null;
    }
    if (isScrollableElement(currentElement)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
}

/**
 * Returns the adjusted position value (left, right) based on available horizontal space at the
 * edges of the viewport.
 */
export function getDropdownHorizontalPosition(
  dropdown: HTMLElement,
  options: GetDropdownHorizontalPositionOptions,
): "left" | "right" {
  if (!dropdown.parentElement) {
    throw new Error("Dropdown has no parent");
  }

  const {
    ignoreContainerBounds = false,
    position = "left",
    spacingThreshold = 10,
  } = options;

  const scrollableParent = ignoreContainerBounds
    ? null
    : findClosestScrollableElement(dropdown);
  const containerWidth = scrollableParent
    ? scrollableParent.clientWidth
    : window.innerWidth;

  const { left, right } = _getElementRelativePosition(
    dropdown.parentElement,
    scrollableParent,
  );
  const dropdownWidth = dropdown.clientWidth;

  const hasRoomOnRight =
    containerWidth - left - dropdownWidth >= spacingThreshold;
  const hasRoomOnLeft = right - dropdownWidth >= spacingThreshold;

  return hasRoomOnLeft && (!hasRoomOnRight || position === "left")
    ? "left"
    : "right";
}

/**
 * Returns the adjusted position value (bottom, top) based on available vertical
 * space at the edges of the viewport.
 */
export function getDropdownVerticalPosition(
  dropdown: HTMLElement,
  options: GetDropdownVerticalPositionOptions,
): "top" | "bottom" {
  if (!dropdown.parentElement) {
    throw new Error("Dropdown has no parent");
  }

  const {
    ignoreContainerBounds = false,
    position = "top",
    spacingThreshold = 0,
  } = options;

  const scrollableParent = ignoreContainerBounds
    ? null
    : findClosestScrollableElement(dropdown);

  const containerHeight = scrollableParent
    ? scrollableParent.clientHeight
    : window.innerHeight;

  const { bottom, top } = _getElementRelativePosition(
    dropdown.parentElement,
    scrollableParent,
  );
  const dropdownHeight = dropdown.clientHeight;

  const hasRoomAtBottom =
    containerHeight - bottom - dropdownHeight >= spacingThreshold;
  const hasRoomAtTop = top - dropdownHeight >= spacingThreshold;

  return hasRoomAtTop && (!hasRoomAtBottom || position === "top")
    ? "top"
    : "bottom";
}
