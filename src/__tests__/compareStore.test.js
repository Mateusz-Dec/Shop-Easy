import { describe, it, expect, beforeEach } from "vitest";
import { useCompareStore } from "../../store/compareStore.js";

describe("compareStore", () => {
  beforeEach(() => {
    useCompareStore.setState({ items: [] });
  });

  it("adds and removes items and limits to 3", () => {
    useCompareStore.getState().add({ id: 1, name: "A" });
    useCompareStore.getState().add({ id: 2, name: "B" });
    useCompareStore.getState().add({ id: 3, name: "C" });
    useCompareStore.getState().add({ id: 4, name: "D" });
    const items = useCompareStore.getState().items;
    expect(items.length).toBe(3);
    expect(items.map((i) => i.id)).toEqual([1, 2, 3]);

    useCompareStore.getState().remove(2);
    expect(useCompareStore.getState().items.map((i) => i.id)).toEqual([1, 3]);

    useCompareStore.getState().clear();
    expect(useCompareStore.getState().items.length).toBe(0);
  });
});
