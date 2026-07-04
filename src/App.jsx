import { useEffect, useState, useMemo } from "react";
import SummaryStats from "./components/SummaryStats";
import Filters from "./components/Filters";
import PokemonTable from "./components/PokemonTable";
import "./App.css";

const GEN1_COUNT = 151;

function App() {
  const [pokemon, setPokemon] = useState([]); // full fetched dataset
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- filter state (each is a separate controlled input) ---
  const [search, setSearch] = useState(""); // text search by name
  const [typeFilter, setTypeFilter] = useState("all"); // dropdown by type
  const [minExp, setMinExp] = useState(""); // numeric lower bound
  const [maxExp, setMaxExp] = useState(""); // numeric upper bound

  // Fetch all Gen 1 Pokémon once, on mount, with useEffect + async/await.
  useEffect(() => {
    async function fetchPokemon() {
      try {
        // 1) get the list of the first 151 Pokémon (names + detail URLs)
        const listRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${GEN1_COUNT}`
        );
        if (!listRes.ok) throw new Error("Failed to load Pokémon list");
        const list = await listRes.json();

        // 2) fetch each Pokémon's details in parallel
        const details = await Promise.all(
          list.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        // 3) reshape the raw API data into just what we need
        const shaped = details.map((d) => ({
          id: d.id,
          name: d.name,
          image: d.sprites.front_default,
          height: d.height / 10, // decimetres -> metres
          weight: d.weight / 10, // hectograms -> kilograms
          baseExp: d.base_experience ?? 0,
          types: d.types.map((t) => t.type.name),
        }));

        setPokemon(shaped);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []); // empty dependency array = run once on mount

  // Every distinct type, for the dropdown options.
  const allTypes = useMemo(() => {
    const set = new Set();
    pokemon.forEach((p) => p.types.forEach((t) => set.add(t)));
    return ["all", ...[...set].sort()];
  }, [pokemon]);

  // Apply all filters together with .filter().
  const filtered = useMemo(() => {
    return pokemon.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType =
        typeFilter === "all" || p.types.includes(typeFilter);
      const aboveMin = minExp === "" || p.baseExp >= Number(minExp);
      const belowMax = maxExp === "" || p.baseExp <= Number(maxExp);
      return matchesSearch && matchesType && aboveMin && belowMax;
    });
  }, [pokemon, search, typeFilter, minExp, maxExp]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Gen 1 Pokédex Dashboard</h1>
        <p className="app__subtitle">
          Explore the original 151 Pokémon — search, filter, and see the stats
          behind the data.
        </p>
      </header>

      {loading && <p className="app__status">Loading Pokédex data…</p>}
      {error && <p className="app__status app__status--error">{error}</p>}

      {!loading && !error && (
        <>
          <SummaryStats pokemon={pokemon} />

          <Filters
            search={search}
            onSearch={setSearch}
            typeFilter={typeFilter}
            onType={setTypeFilter}
            allTypes={allTypes}
            minExp={minExp}
            maxExp={maxExp}
            onMinExp={setMinExp}
            onMaxExp={setMaxExp}
          />

          <p className="app__count">
            Showing <strong>{filtered.length}</strong> of {pokemon.length}{" "}
            Pokémon
          </p>

          <PokemonTable pokemon={filtered} />
        </>
      )}
    </div>
  );
}

export default App;
