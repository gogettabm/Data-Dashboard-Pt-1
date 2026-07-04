import "./PokemonTable.css";

// The dashboard list: one row per Pokémon, several features per row.
function PokemonTable({ pokemon }) {
  if (pokemon.length === 0) {
    return <p className="table__empty">No Pokémon match your filters.</p>;
  }

  return (
    <div className="table__wrap">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Type(s)</th>
            <th>Height (m)</th>
            <th>Weight (kg)</th>
            <th>Base Exp</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((p) => (
            <tr key={p.id}>
              <td>
                <img className="table__img" src={p.image} alt={p.name} />
              </td>
              <td className="table__id">
                {String(p.id).padStart(3, "0")}
              </td>
              <td className="table__name">{p.name}</td>
              <td>
                <div className="table__types">
                  {p.types.map((t) => (
                    <span className={`badge badge--${t}`} key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td>{p.height}</td>
              <td>{p.weight}</td>
              <td>{p.baseExp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonTable;
