import DashboardLayout from "../layouts/DashboardLayout";

function Settings() {
    return (
        <DashboardLayout>
            <div className="settings-page">
                <div className="settings-page-header">
                    <h2>Settings</h2>
                    <p>
                        Manage your AgriPredict application preferences.
                    </p>
                </div>

                <div className="settings-card">
                    <h3>Application Settings</h3>

                    <p className="text-muted">
                        Settings options will be available here.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Settings;