function Topbar() {

  return (

    <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">

      <div>

        <h4>Dashboard</h4>

        <small>Welcome back, Shivraj!</small>

      </div>

      <div className="d-flex align-items-center gap-3">

        <span>🔔</span>

        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="rounded-circle"
        />

      </div>

    </header>

  );

}

export default Topbar;