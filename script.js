// script.js
document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('inputReg');
    const btnSubmit = document.getElementById('btnSubmit');

    inputField.addEventListener('input', function (event) {
        let value = inputField.value;
        
        // Remove non-alphanumeric characters except spaces
        value = value.replace(/[^a-zA-Z0-9\s]/g, '');

        // Remove leading and trailing spaces
        value = value.trim();

        // Convert to uppercase
        value = value.toUpperCase();

        // Update the input field
        inputField.value = value;
    });

    // Listen for Enter key press in the input field
    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default Enter key behavior (form submission)
            btnSubmit.click(); // Programmatically click the submit button
        }
    });
});

async function submitReg() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";
    const url = proxyUrl + apiUrl;

    const reg = document.getElementById("inputReg").value;
    const data = JSON.stringify({ "registrationNumber": reg });

    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");

    // Clear previous results
    clearPreviousResults();

    // Show loading animation
    loading.style.display = 'block';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': '3PHZuTPn2a6vPsNxx2d4L1DBZ1v2xAL11i3V5Gdd',
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (response.ok) {
            const obj = await response.json();
            console.log(obj); // Log the full response to debug

            // Hide the error message
            errorMessage.style.display = 'none';

            // Display vehicle information
            document.getElementById("lblRegistration").textContent = (obj.registrationNumber || "Unknown");
            document.getElementById("lblMake").textContent =  (obj.make || "Unknown");
            document.getElementById("lblColour").textContent = (obj.colour || "Unknown");
            document.getElementById("lblTaxStatus").textContent = (obj.taxStatus || "Unknown");
            document.getElementById("lblMOTStatus").textContent = (obj.motStatus || "Unknown");
            document.getElementById("lblMOTExpiryDate").textContent =  (obj.motExpiryDate || "Unknown");
            document.getElementById("lblCO2Emissions").textContent = (obj.co2Emissions !== undefined ? obj.co2Emissions : "Unknown");
            document.getElementById("lblEngineCapacity").textContent =(obj.engineCapacity !== undefined ? obj.engineCapacity + "cc" : "Unknown");
            document.getElementById("lblFuelType").textContent = (obj.fuelType || "Unknown");
            document.getElementById("lblMarkedForExport").textContent =  (obj.markedForExport !== undefined ? (obj.markedForExport ? "Yes" : "No") : "Unknown");
            document.getElementById("lblTypeApproval").textContent =  (obj.typeApproval || "Unknown");
            document.getElementById("lblYearOfManufacture").textContent =  (obj.yearOfManufacture || "Unknown");
            document.getElementById("lblTaxDueDate").textContent = formatDate(obj.taxDueDate);
            document.getElementById("lblDateOfLastV5CIssued").textContent = formatDate(obj.dateOfLastV5CIssued);
            document.getElementById("lblWheelplan").textContent =  (obj.wheelplan || "Unknown");
            document.getElementById("lblMonthOfFirstRegistration").textContent =  formatDate(obj.monthOfFirstRegistration);
            document.getElementById("lblRevenueWeight").textContent = (obj.revenueWeight !== undefined ? obj.revenueWeight : "Unknown") + " kg";
        } else {
            // Show error message
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error("Error making request:", error);
        // Show error message
        errorMessage.style.display = 'block';
    } finally {
        // Hide loading animation
        loading.style.display = 'none';
    }
}

function clearPreviousResults() {
    document.getElementById("lblRegistration").textContent = "";
    document.getElementById("lblMake").textContent = "";
    document.getElementById("lblColour").textContent = "";
    document.getElementById("lblTaxStatus").textContent = "";
    document.getElementById("lblMOTStatus").textContent = "";
    document.getElementById("lblMOTExpiryDate").textContent = "";
    document.getElementById("lblCO2Emissions").textContent = "";
    document.getElementById("lblEngineCapacity").textContent = "";
    document.getElementById("lblFuelType").textContent = "";
    document.getElementById("lblMarkedForExport").textContent = "";
    document.getElementById("lblTypeApproval").textContent = "";
    document.getElementById("lblYearOfManufacture").textContent = "";
    document.getElementById("lblTaxDueDate").textContent = "";
    document.getElementById("lblDateOfLastV5CIssued").textContent = "";
    document.getElementById("lblWheelplan").textContent = "";
    document.getElementById("lblMonthOfFirstRegistration").textContent = "";
    document.getElementById("lblRevenueWeight").textContent = "";
}

function formatDate(dateString) {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
}
