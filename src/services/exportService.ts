import { getProducts } from "./storageService";

/**
 * Exports all products to a JSON file that can be downloaded
 * @param showInstructions Whether to show deployment instructions in a dialog
 */
export const exportProductsToJson = (
  showInstructions: boolean = true
): void => {
  try {
    // Get all products from storage
    const products = getProducts();

    // Convert to JSON string with pretty formatting
    const jsonString = JSON.stringify(products, null, 2);

    // Create a blob with the JSON data
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "initial-products.json";

    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the URL object
    URL.revokeObjectURL(url);

    // Show deployment instructions if requested
    if (showInstructions) {
      // Create a modal with instructions
      const instructionsModal = document.createElement("div");
      instructionsModal.style.position = "fixed";
      instructionsModal.style.top = "0";
      instructionsModal.style.left = "0";
      instructionsModal.style.width = "100%";
      instructionsModal.style.height = "100%";
      instructionsModal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      instructionsModal.style.zIndex = "9999";
      instructionsModal.style.display = "flex";
      instructionsModal.style.justifyContent = "center";
      instructionsModal.style.alignItems = "center";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.padding = "2rem";
      modalContent.style.borderRadius = "0.5rem";
      modalContent.style.maxWidth = "600px";
      modalContent.style.maxHeight = "80vh";
      modalContent.style.overflow = "auto";

      modalContent.innerHTML = `
        <h2 style="margin-top: 0; color: #333;">Deployment Instructions</h2>
        <p>To update your live site with these products:</p>
        <ol>
          <li>Replace the file <code>src/data/initial-products.json</code> in your repository with the downloaded file</li>
          <li>Commit and push the changes to GitHub</li>
          <li>GitHub Actions will automatically build and deploy your site</li>
        </ol>
        <p>Note: This will update the base product data. Any changes made in the admin interface will still be stored in your browser's localStorage.</p>
        <button id="close-instructions" style="background-color: #10b981; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer; margin-top: 1rem;">Close</button>
      `;

      instructionsModal.appendChild(modalContent);
      document.body.appendChild(instructionsModal);

      // Add event listener to close button
      document
        .getElementById("close-instructions")
        ?.addEventListener("click", () => {
          document.body.removeChild(instructionsModal);
        });
    }
  } catch (error) {
    console.error("Error exporting products:", error);
    throw error;
  }
};
