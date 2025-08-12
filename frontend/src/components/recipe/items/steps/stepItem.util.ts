import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

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

export const sensors = useSensors(
  useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  }),
  useSensor(MouseSensor),
  useSensor(KeyboardSensor)
);
