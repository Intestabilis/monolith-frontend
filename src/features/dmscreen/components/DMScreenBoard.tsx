import { useRef, useState } from "react";
import { useUpdateWidgetsLayout } from "../hooks/useUpdateWidgetLayout";
import { useDeleteWidget } from "../hooks/useDeleteWidget";
import { useCreateWidget } from "../hooks/useCreateWidget";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { WIDGET_COMPONENTS, WIDGET_DEFAULTS } from "./WidgetRegistry";
import { WidgetWrapper } from "./WidgetWrapper";
import { useDebouncedCallback } from "../../../hooks/useDebouncedCallback";
import SyncStatus from "./SyncStatus";
import type {
  CreateWidgetDTO,
  WidgetResponseDTO,
  WidgetType,
} from "../../../schemas/widget.schema";
import BoardToolbar from "./BoardToolbar";

interface DMScreenBoardProps {
  campaignId: string;
  initialWidgets: WidgetResponseDTO[];
}

// REVIEW maybe create some file with constants and put it there
const BOARD_SIZE = 10000;
const CENTER = BOARD_SIZE / 2;

function DMScreenBoard({ campaignId, initialWidgets }: DMScreenBoardProps) {
  const [localWidgets, setLocalWidgets] =
    useState<WidgetResponseDTO[]>(initialWidgets);

  // to show saving during debouncing
  const [isSyncing, setIsSyncing] = useState(false);

  const [maxZIndex, setMaxZIndex] = useState(() =>
    Math.max(...initialWidgets.map((widget) => widget.zIndex), 0),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  // query hooks
  const { createWidget, isPending: isCreatingWidget } =
    useCreateWidget(campaignId);
  const { deleteWidget } = useDeleteWidget(campaignId);
  const { updateWidgetsLayout, isPending: isUpdatingLayout } =
    useUpdateWidgetsLayout(campaignId);

  const debouncedUpdateLayout = useDebouncedCallback(
    (widgetsToSave: WidgetResponseDTO[]) => {
      const layoutPayload = widgetsToSave.map((widget) => ({
        id: widget.id,
        x: Math.round(Number(widget.x)),
        y: Math.round(Number(widget.y)),
        w: Math.round(Number(widget.w)),
        h: Math.round(Number(widget.h)),
        zIndex: Math.round(Number(widget.zIndex)),
      }));

      updateWidgetsLayout(
        { widgets: layoutPayload },
        {
          onSuccess: () => {
            setIsSyncing(false);
          },
          onError: () => {
            setIsSyncing(false);
          },
        },
      );
    },
    1000,
  );

  // handlers

  function handleAddWidget(type: WidgetType) {
    const config = WIDGET_DEFAULTS[type];
    let spawnX = CENTER;
    let spawnY = CENTER;

    if (containerRef.current && transformRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const state = transformRef.current.state;

      spawnX = (clientWidth / 2 - state.positionX) / state.scale - config.w / 2;
      spawnY =
        (clientHeight / 2 - state.positionY) / state.scale - config.h / 2;

      const cascadeOffset = (localWidgets.length % 5) * 20;
      spawnX += cascadeOffset;
      spawnY += cascadeOffset;
    }

    const newWidget: CreateWidgetDTO = {
      id: crypto.randomUUID(),
      type,
      x: Math.round(spawnX),
      y: Math.round(spawnY),
      w: Math.round(config.w),
      h: Math.round(config.h),
      zIndex: maxZIndex + 1,
      content: config.defaultContent,
    };

    // optimistic update
    setLocalWidgets((prev) => [...prev, { ...newWidget, campaignId }]);
    setMaxZIndex((prev) => prev + 1);

    createWidget(newWidget);
  }

  function handleRemoveWidget(id: string) {
    setLocalWidgets((prev) => prev.filter((widget) => widget.id !== id));
    deleteWidget(id);
  }

  function handleUpdateWidgetLayout(
    id: string,
    updates: Partial<WidgetResponseDTO>,
  ) {
    setIsSyncing(true);
    // optimistic update
    setLocalWidgets((prev) => {
      const newWidgets = prev.map((widget) =>
        widget.id === id ? { ...widget, ...updates } : widget,
      );
      debouncedUpdateLayout(newWidgets);
      return newWidgets;
    });
  }

  function handleBringToFront(id: string) {
    setMaxZIndex((prev) => {
      const newZ = prev + 1;
      handleUpdateWidgetLayout(id, { zIndex: newZ });
      return newZ;
    });
  }

  const initialX = -CENTER + window.innerWidth / 2;
  const initialY = -CENTER + window.innerHeight / 2;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-background overflow-hidden"
    >
      <BoardToolbar
        onAddWidget={handleAddWidget}
        isCreating={isCreatingWidget}
      />
      <SyncStatus isSyncing={isSyncing} isSaving={isUpdatingLayout} />
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        initialPositionX={initialX}
        initialPositionY={initialY}
        minScale={0.2}
        maxScale={2}
        limitToBounds={false}
        panning={{
          excluded: ["react-draggable"],
        }}
        wheel={{
          step: 0.2,
        }}
        // step in wheel does not work with smooth={true}
        smooth={false}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing"
          // REVIEW maybe add some fantasy-like pattern like paper on background
          contentClass={`!w-[${BOARD_SIZE}px] !h-[${BOARD_SIZE}px] origin-top-left`}
        >
          <div className="relative w-full h-full">
            {localWidgets.map((widget) => {
              const WidgetComponent = WIDGET_COMPONENTS[widget.type];
              if (!WidgetComponent) return null;
              return (
                <WidgetWrapper
                  key={widget.id}
                  widget={widget}
                  onUpdate={handleUpdateWidgetLayout}
                  onRemove={handleRemoveWidget}
                  onBringToFront={handleBringToFront}
                >
                  <WidgetComponent
                    campaignId={campaignId}
                    widgetId={widget.id}
                    content={widget.content}
                  />
                </WidgetWrapper>
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <div className="absolute bottom-4 right-4 z-50 text-text-muted font-mono text-xs pointer-events-none">
        ЛКМ: Переміщення ширмою | Колесико: Масштаб
      </div>
    </div>
  );
}

export default DMScreenBoard;
