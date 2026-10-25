
import api from "./api";

// Register a farm
export const createFarm = async (farmData) => {
    const response = await api.post("/farms", farmData);
    return response.data;
};

// Fetch the logged-in user's farms
export const getMyFarms = async () => {
    const response = await api.get("/farms");
    return response.data;
};

// Update a farm
export const updateFarm = async (farmId, farmData) => {
    const response = await api.put(
        `/farms/${farmId}`,
        farmData
    );
    return response.data;
};

// Delete a farm
export const deleteFarm = async (farmId) => {
    const response = await api.delete(`/farms/${farmId}`);
    return response.data;
};
