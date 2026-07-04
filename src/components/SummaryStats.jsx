import "./SummaryStats.css";

// Computes and displays summary statistics about the whole dataset.
function SummaryStats({ pokemon }) {
  const total = pokemon.length;

  // Average base experience (mean of a numeric attribute).
  const avgExp =
    total === 0
      ? 0
      : Math.round(
          pokemon.reduce((sum, p) => sum + p.baseExp, 0) / total
        );

  // Heaviest Pokémon (max of a numeric attribute).
  const heaviest = pokemon.reduce(
    (max, p) => (p.weight > max.weight ? p : max),
    pokemon[0] || { name: "—", weight: 0 }
  );

  // Most common type (mode of a categorical attribute).
  const typeCounts = {};
  pokemon.forEach((p) =>
    p.types.forEach((t) => (typeCounts[t] = (typeCounts[t] || 0) + 1))
  );
  const topType =
    Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const stats = [
    { label: "Total Pokémon", value: total },
    { label: "Avg. Base Exp", value: avgExp },
    { label: "Most Common Type", value: topType },
    { label: "Heaviest", value: `${heaviest.name} (${heaviest.weight}kg)` },
  ];

  return (
    <section className="stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat__value">{s.value}</div>
          <div className="stat__label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

export default SummaryStats;
