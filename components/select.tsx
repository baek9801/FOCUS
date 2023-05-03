import React, { useState } from "react";
import Choice from "@/components/choice";

export default function Select({ numChoices }: { numChoices: number }) {
  const [selected, setSelected] = useState(-1);

  const choices = Array.from(
    { length: numChoices },
    (_, i) => `Chapter ${i + 1}`
  );

  const onChoiceClick = (index: number) => {
    if (selected !== index) {
      setSelected(index);
    } else {
      setSelected(-1);
    }
  };

  return (
    <div className="border-8 mt-3 rounded-xl border-blue-50">
      <div className="bg-blue-50 pb-2 rounded-xl text-4xl">Select Chapter</div>
      <div>
        {choices.map((choice, index) => (
          <Choice
            key={index}
            choice={choice}
            index={index}
            selected={selected}
            onClick={onChoiceClick}
          />
        ))}
      </div>
    </div>
  );
}
