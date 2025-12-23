export function notify(message, type = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("shopeasy-toast", { detail: { message, type } })
  );
}
