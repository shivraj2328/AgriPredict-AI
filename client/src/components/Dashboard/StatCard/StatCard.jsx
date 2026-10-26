
function StatCard({
    title,
    value,
    icon,
    color,
    className = ""
}) {
    return (
        <div
            className={`card dashboard-stat-card dashboard-stat-${color} h-100 ${className}`}
        >
            <div className="card-body">
                <div className="dashboard-stat-heading">
                    <h5>{title}</h5>
                    <span className="dashboard-stat-icon">
                        {icon}
                    </span>
                </div>

                <h2 className="dashboard-stat-value">
                    {value}
                </h2>
            </div>
        </div>
    );
}

export default StatCard;
