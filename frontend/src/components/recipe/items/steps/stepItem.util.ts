import type { DragEndEvent } from "@dnd-kit/core";

export const onDragEnd = (
  event: DragEndEvent,
  move: (indexA: number, indexB: number) => void
) => {
  const { over, active } = event;

  if (!over) return;

  const fromIndex = active.data.current?.index;
  const toIndex = over.data.current?.index;

  if (fromIndex === undefined || toIndex === undefined) return;

  move(fromIndex, toIndex);
};
