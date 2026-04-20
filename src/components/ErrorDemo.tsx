"use client";

import { useState } from "react";

export default function ErrorDemo() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Simulated client-side UI error");
  }

  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-2 text-base font-semibold">
        Демонстрація обробки помилок
      </h3>

      <p className="mb-4 text-sm text-slate-600">
        Натискання кнопки нижче спеціально викликає помилку React-компонента для
        перевірки Error Boundary.
      </p>

      <button
        onClick={() => setShouldThrow(true)}
        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
      >
        Викликати помилку інтерфейсу
      </button>
    </div>
  );
}
