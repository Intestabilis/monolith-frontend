import type { ComponentType } from "react";
import { InitiativeWidget } from "./InitiativeWidget";
import { NoteWidget } from "./NoteWidget";
import type {
  InitiativeContentDTO,
  NoteContentDTO,
  WidgetType,
} from "../../../schemas/widget.schema";

export interface BaseWidgetProps<T = unknown> {
  campaignId: string;
  widgetId: string;
  content: T;
}

// honestly I don't know how to properly use type there in ComponentType so typescript wouldn't give some error (like with BaseWidgetProps)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WIDGET_COMPONENTS: Record<WidgetType, ComponentType<any>> = {
  NOTE: NoteWidget,
  INITIATIVE: InitiativeWidget,
  // CALENDAR: CalendarWidget,
  // DICE_ROLLER: DiceRollerWidget,
};

// REVIEW 2 things: 1) placing in this file and not schemas (though I think it makes sense) 2) review if I could achieve this result in more simple way
// defaults config

interface WidgetContentMap {
  NOTE: NoteContentDTO;
  INITIATIVE: InitiativeContentDTO;
  // CALENDAR: Record<string, unknown>;
  // DICE_ROLLER: Record<string, unknown>;
}

// to "bound" defaultContent to proper content type from a map
type WidgetConfig<T extends WidgetType> = {
  w: number;
  h: number;
  defaultContent: WidgetContentMap[T];
};

type WidgetDefaults = {
  [K in WidgetType]: WidgetConfig<K>;
};

export const WIDGET_DEFAULTS: WidgetDefaults = {
  NOTE: {
    w: 300,
    h: 250,
    defaultContent: { text: "" },
  },
  INITIATIVE: {
    w: 400,
    h: 500,
    defaultContent: {},
    // defaultContent: { currentTurn: 0, combatants: [] },
  },
};
