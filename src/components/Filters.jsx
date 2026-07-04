import "./Filters.css";

// All the controls for searching and filtering the dashboard.
function Filters({
  search,
  onSearch,
  typeFilter,
  onType,
  allTypes,
  minExp,
  maxExp,
  onMinExp,
  onMaxExp,
}) {
  return (
    <section className="filters">
      {/* 1) Text search — filters by name */}
      <div className="filters__group">
        <label className="filters__label" htmlFor="search">
          Search by name
        </label>
        <input
          id="search"
          className="filters__input"
          type="text"
          placeholder="e.g. char…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* 2) Dropdown — filters by type (a different attribute) */}
      <div className="filters__group">
        <label className="filters__label" htmlFor="type">
          Type
        </label>
        <select
          id="type"
          className="filters__input"
          value={typeFilter}
          onChange={(e) => onType(e.target.value)}
        >
          {allTypes.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>
      </div>

      {/* 3) Numeric bounds — filters by base experience range */}
      <div className="filters__group">
        <label className="filters__label">Base Exp range</label>
        <div className="filters__range">
          <input
            className="filters__input filters__input--num"
            type="number"
            placeholder="min"
            value={minExp}
            onChange={(e) => onMinExp(e.target.value)}
          />
          <span className="filters__dash">–</span>
          <input
            className="filters__input filters__input--num"
            type="number"
            placeholder="max"
            value={maxExp}
            onChange={(e) => onMaxExp(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

export default Filters;
