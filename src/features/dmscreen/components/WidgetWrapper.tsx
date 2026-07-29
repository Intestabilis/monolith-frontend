import type { PropsWithChildren } from "react";
import { Rnd } from "react-rnd";
import { GripHorizontal, X } from "lucide-react";
import { useTransformContext } from "react-zoom-pan-pinch";
import type { WidgetResponseDTO } from "../../../schemas/widget.schema";

interface WidgetWrapperProps {
  widget: WidgetResponseDTO;
  onUpdate: (id: string, updates: Partial<WidgetResponseDTO>) => void;
  onRemove: (id: string) => void;
  onBringToFront: (id: string) => void;
}
export function WidgetWrapper({
  widget,
  onUpdate,
  onRemove,
  onBringToFront,
  children,
}: PropsWithChildren<WidgetWrapperProps>) {
  const context = useTransformContext();
  const currentScale = context?.state?.scale || 1;

  return (
    <Rnd
      default={{
        x: widget.x,
        y: widget.y,
        width: widget.w,
        height: widget.h,
      }}
      scale={currentScale}
      onDragStop={(_, drag) => {
        const finalX = Math.round(drag.x);
        const finalY = Math.round(drag.y);

        // dirty checking to not spam server with requests on just clicks
        if (finalX !== widget.x || finalY !== widget.y) {
          onUpdate(widget.id, { x: finalX, y: finalY });
        }
      }}
      onResizeStop={(_, direction, _2, delta) => {
        const dir = direction.toLowerCase();
        const isLeft = dir.includes("left");
        const isTop = dir.includes("top");

        // for some reason position parameter (5th argument) is buggy and doesn't adjust to current scale = so it leads to bug with weird new positions
        // since it's trying to multiply current position on scale? not sure but like if our new x = 1000 and scale = 0.4 it gives us 400 in new x position
        onUpdate(widget.id, {
          w: Math.round(widget.w + delta.width),
          h: Math.round(widget.h + delta.height),
          // changing position accordingly on left/top changes
          x: Math.round(widget.x - (isLeft ? delta.width : 0)),
          y: Math.round(widget.y - (isTop ? delta.height : 0)),
        });
      }}
      minWidth={200}
      minHeight={150}
      className="bg-surface border-2 border-border-strong "
      style={{ zIndex: widget.zIndex }}
      onMouseDown={() => onBringToFront(widget.id)}
      dragHandleClassName="drag-handle"
      draggable={false}
    >
      <div
        className=" flex flex-col w-full h-full overflow-hidden bg-background"
        // probably this prop with draggable false fixed problem with "jumping" widgets on resizing
        // honestly the most weird/confusing bug I've seen during work on this project
        // still not sure what exactly fixed/caused it, if I'm correct it was because of native dnd handling from browsers that messed up with positions
        // and fired unexpected drag events on resizing(? not sure), but honestly I'm just glad it doesn't do that anymore and I can move on from this feature
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      >
        <header className="drag-handle shrink-0 bg-muted p-2 flex justify-between items-center cursor-grab active:cursor-grabbing border-b-2 border-border-strong">
          <div className="flex items-center gap-2 text-text-primary">
            <GripHorizontal size={16} />
            <span className="font-gothic text-sm uppercase tracking-wider">
              {widget.type}
            </span>
          </div>

          {/* CHANGE really should do some icon button variant and use it in cases like this */}
          <button
            onClick={() => onRemove(widget.id)}
            className="text-text-muted hover:text-danger transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X size={16} />
          </button>
        </header>

        <div
          className="flex-1 overflow-y-auto custom-scrollbar relative bg-surface"
          // to stop zooming when we're trying to scroll a widget
          // also on capture because default onWheel for bubbling doesn't work, probably because somehow zoom-pan-pinch lib captures it first? smth related to dom and event listeners under the hood
          onWheelCapture={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
}
