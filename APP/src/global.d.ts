export {};

declare global {
    interface Window {
      googleMapsCallback: () => void;
    }
}