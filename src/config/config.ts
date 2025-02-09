// src/config.ts or src/lib/config.ts

interface ApiConfig {
    ENDPOINT_URL: string;
    API_KEY: string;
}

const API_CONFIG: ApiConfig = {
    ENDPOINT_URL: "https://imageclassifier.eastus.inference.ml.azure.com/score",
    API_KEY: "4vWmRX0emCciAmVTa0dNP5veQfDvO2kn"
} as const;

export { API_CONFIG, type ApiConfig };