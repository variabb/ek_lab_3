"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { stations } from "@/data/stations";
import ChartsPanel from "./ChartsPanel";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

type Station = (typeof stations)[number];
type FilterValue = "all" | "low" | "medium" | "high";

export default function MapSection() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredStations = useMemo(() => {
    if (filter === "all") {
      return stations;
    }

    return stations.filter((station) => station.pollutionLevel === filter);
  }, [filter]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-xl border p-4">
          <label className="mb-2 block text-sm font-medium">
            Фільтр за рівнем забруднення
          </label>

          <select
            value={filter}
            onChange={(event) => {
              const nextFilter = event.target.value as FilterValue;
              setFilter(nextFilter);

              if (
                selectedStation &&
                nextFilter !== "all" &&
                selectedStation.pollutionLevel !== nextFilter
              ) {
                setSelectedStation(null);
              }
            }}
            className="w-full rounded-lg border px-3 py-2 outline-none"
          >
            <option value="all">Усі станції</option>
            <option value="low">Низький рівень</option>
            <option value="medium">Середній рівень</option>
            <option value="high">Високий рівень</option>
          </select>
        </div>

        <MapView
          stationsToShow={filteredStations}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />

        <div className="space-y-3 rounded-xl border p-4">
          {selectedStation ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Обрана станція:{" "}
                <span className="font-semibold">{selectedStation.name}</span>
              </p>

              <button
                onClick={() => setSelectedStation(null)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Скинути вибір
              </button>
            </div>
          ) : (
            <p>Оберіть станцію на карті.</p>
          )}
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="mb-3 text-base font-semibold">Легенда карти</h3>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-green-600"></span>
              <span>Низький рівень забруднення</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-amber-500"></span>
              <span>Середній рівень забруднення</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-red-600"></span>
              <span>Високий рівень забруднення</span>
            </div>
          </div>
        </div>
      </div>

      <ChartsPanel station={selectedStation} />
    </div>
  );
}
