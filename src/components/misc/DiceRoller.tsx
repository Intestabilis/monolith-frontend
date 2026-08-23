import { useState } from "react";
import Tooltip from "../ui/Tooltip";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import FantasyIcon from "../icons/FantasyIcon";

type ModType = "total" | "each";

interface RollResult {
  formula: string;
  rolls: { sides: number; value: number; sign: number }[];
  modifier: number;
  modType: ModType;
  total: number;
}

function DiceRoller() {
  const [quantity, setQuantity] = useState<number>(1);
  const [modifier, setModifier] = useState<string>("0");
  const [modType, setModType] = useState<ModType>("total");
  const [customFormula, setCustomFormula] = useState<string>("");

  const [dicePool, setDicePool] = useState<number[]>([]);
  const [result, setResult] = useState<RollResult | null>(null);
  const [error, setError] = useState<string>("");

  const diceTypes = [4, 6, 8, 10, 12, 20, 100];

  function handleAddDice(sides: number) {
    const newDice = Array(Math.max(1, quantity)).fill(sides);
    setDicePool((prev) => [...prev, ...newDice]);
  }

  function handleRemoveDice(index: number) {
    setDicePool((prev) => prev.filter((_, i) => i !== index));
  }

  function handleRollPool() {
    if (dicePool.length === 0) return;

    const modValue = parseInt(modifier, 10) || 0;

    const rolls = dicePool.map((sides) => ({
      sides,
      value: Math.floor(Math.random() * sides) + 1,
      sign: 1, // since I don't implement something like "negative dice pool" it's always positive
    }));

    let total = rolls.reduce((sum, roll) => sum + roll.value, 0);
    if (modType === "total") {
      total += modValue;
    } else {
      total += modValue * rolls.length;
    }

    const counts: Record<number, number> = {};
    dicePool.forEach((dice) => (counts[dice] = (counts[dice] || 0) + 1));
    let formula = Object.entries(counts)
      .map(([sides, count]) => `${count}d${sides}`)
      .join(" + ");

    if (modValue !== 0) {
      formula += modValue > 0 ? ` + ${modValue}` : ` - ${Math.abs(modValue)}`;
      if (modType === "each") formula += " (до кожного)";
    }

    setResult({
      formula,
      rolls,
      modifier: modValue,
      modType,
      total,
    });
    setError("");
  }

  function handleCustomRoll() {
    const formula = customFormula.trim().toLowerCase().replace(/\s+/g, "");
    if (!formula) return;

    // creating tokens for dices and constants
    const terms = formula.match(/[+-]?(?:\d*d\d+|\d+)/g);

    if (!terms || terms.join("") !== formula) {
      setError("Формат: 2d6+1d4-3");
      return;
    }

    let total = 0;
    let constantMod = 0;
    const rolls: { sides: number; value: number; sign: number }[] = [];

    terms.forEach((term) => {
      const sign = term.startsWith("-") ? -1 : 1;
      const cleanTerm = term.replace(/^[+-]/, "");

      if (cleanTerm.includes("d")) {
        const [qtyStr, sidesStr] = cleanTerm.split("d");
        const qty = qtyStr ? parseInt(qtyStr, 10) : 1;
        const sides = parseInt(sidesStr, 10);

        for (let i = 0; i < qty; i++) {
          const val = Math.floor(Math.random() * sides) + 1;
          total += val * sign;
          rolls.push({ sides, value: val, sign });
        }
      } else {
        const mod = parseInt(cleanTerm, 10);
        total += mod * sign;
        constantMod += mod * sign;
      }
    });

    setResult({
      formula: customFormula.toLowerCase(),
      rolls,
      modifier: constantMod,
      modType: "total",
      total,
    });
    setError("");
  }

  return (
    <Card
      variant="default"
      className="p-0 flex flex-col h-full border-2 border-border-strong rounded-none"
    >
      <div className="p-4 bg-surface">
        <h3 className="flex gap-2 items-center font-heading font-bold text-sm uppercase tracking-wider text-text-primary mb-4 border-b-2 border-border-strong pb-2">
          <span>
            <FantasyIcon
              name="d20"
              className="inline-block w-6 h-6 text-text-selected"
            />
          </span>
          Швидкі кості
        </h3>

        <div className="bg-background border-2 border-border-muted p-3 mb-4 grid grid-cols-3 gap-3 font-mono text-xs shadow-sm">
          <div>
            <label className="block text-text-muted mb-1 uppercase">
              Множник
            </label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="h-8 px-2 text-center rounded-none"
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1 uppercase">Мод.</label>
            <Input
              type="text"
              value={modifier}
              onChange={(e) => setModifier(e.target.value)}
              className="h-8 px-2 text-center rounded-none"
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1 uppercase">Тип</label>
            <select
              value={modType}
              onChange={(e) => setModType(e.target.value as ModType)}
              className="w-full h-8 px-1 bg-background border-2 border-border-strong text-text-primary rounded-none focus:outline-none focus:border-primary"
            >
              <option value="total">До суми</option>
              <option value="each">До кожного</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 font-mono text-xs mb-4">
          {diceTypes.map((sides) => (
            <Button
              key={sides}
              variant="ghost"
              onClick={() => handleAddDice(sides)}
              className="h-10 hover:border-primary border-border-strong hover:text-primary transition-colors"
            >
              d{sides}
            </Button>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-end mb-1">
            <span className="font-mono text-xs text-text-muted uppercase">
              Ваш пул:
            </span>
            {dicePool.length > 0 && (
              <button
                onClick={() => setDicePool([])}
                className="font-mono text-[10px] text-danger hover:underline"
              >
                Очистити
              </button>
            )}
          </div>
          <div className="min-h-16 border-2 border-dashed border-border-muted bg-background p-2 flex flex-wrap gap-2 items-start content-start">
            {dicePool.length === 0 ? (
              <span className="text-text-muted/50 italic text-xs m-auto">
                Оберіть кубики вище
              </span>
            ) : (
              dicePool.map((sides, idx) => (
                <Tooltip key={idx} content="Прибрати">
                  <button
                    onClick={() => handleRemoveDice(idx)}
                    className="border border-border-strong bg-surface px-2 py-1 text-xs font-bold hover:bg-danger hover:text-white hover:border-danger hover:line-through transition-all"
                  >
                    d{sides}
                  </button>
                </Tooltip>
              ))
            )}
          </div>
          <Button
            variant="default"
            className="w-full mt-2 h-10 font-heading uppercase text-lg tracking-widest"
            disabled={dicePool.length === 0}
            onClick={handleRollPool}
          >
            КИНУТИ ПУЛ
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={customFormula}
            onChange={(e) => setCustomFormula(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomRoll()}
            placeholder="Формула (2d4+6)"
            className="flex-1 h-9 font-mono text-xs rounded-none placeholder:normal-case"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCustomRoll}
            className="h-9 border-border-strong hover:border-primary hover:text-primary"
          >
            Кинути
          </Button>
        </div>
        {error && <p className="text-danger font-mono text-xs mt-2">{error}</p>}
      </div>

      <div className="mt-auto border-t-2 border-border-strong bg-background p-4 min-h-30 flex flex-col justify-center items-center">
        {result ? (
          <>
            <span className="font-mono text-xs text-text-muted mb-1 text-center">
              {result.formula}
            </span>
            <span className="font-heading text-5xl text-text-selected font-bold drop-shadow-sm">
              {result.total}
            </span>
            <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
              {result.rolls.map((roll, index) => {
                const isCrit = roll.value === roll.sides;
                const isFumble = roll.value === 1;

                let displayTotal = roll.value;
                let detailText = `d${roll.sides}`;

                if (result.modType === "each" && result.modifier !== 0) {
                  displayTotal = roll.value + result.modifier;
                  const sign = result.modifier > 0 ? "+" : "";
                  detailText = `d${roll.sides} (${roll.value}${sign}${result.modifier})`;
                } else if (roll.sign < 0) {
                  displayTotal = -roll.value;
                  detailText = `d${roll.sides}`;
                }

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center min-w-10 px-2 py-1 border-2 ${
                      isCrit
                        ? "border-success bg-success/10"
                        : isFumble
                          ? "border-danger bg-danger/10"
                          : "border-border-muted"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm font-bold ${
                        isCrit
                          ? "text-success"
                          : isFumble
                            ? "text-danger"
                            : "text-text-primary"
                      }`}
                    >
                      {displayTotal}
                    </span>
                    <span className="font-mono text-[10px] opacity-70 whitespace-nowrap">
                      {detailText}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <span className="font-mono text-sm text-text-muted italic opacity-50">
            Очікування кидка
          </span>
        )}
      </div>
    </Card>
  );
}

export default DiceRoller;
