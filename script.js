document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('inputReg');

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
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var apiUrl = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";
    var url = proxyUrl + apiUrl;

    var reg = document.getElementById("inputReg").value;
    var data = JSON.stringify({ "registrationNumber": reg });

    // Clear previous results
    clearPreviousResults();

    try {
        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': '3PHZuTPn2a6vPsNxx2d4L1DBZ1v2xAL11i3V5Gdd',
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (response.ok) {
            var obj = await response.json();
            console.log(obj); // Log the full response to debug

            // Hide the error message
            document.getElementById("errorMessage").style.display = 'none';

            // Display vehicle information
            document.getElementById("lblRegistration").textContent = "Registration: " + (obj.registrationNumber || "Unknown");
            document.getElementById("lblMake").textContent = "Vehicle Make: " + (obj.make || "Unknown");
            document.getElementById("lblColour").textContent = "Vehicle Colour: " + (obj.colour || "Unknown");
            document.getElementById("lblTaxStatus").textContent = "Vehicle Tax Status: " + (obj.taxStatus || "Unknown");
            document.getElementById("lblMOTStatus").textContent = "Vehicle MOT Status: " + (obj.motStatus || "Unknown");
            document.getElementById("lblMOTExpiryDate").textContent = "Vehicle MOT Expiry Date: " + (obj.motExpiryDate || "Unknown");
            document.getElementById("lblCO2Emissions").textContent = "CO2 Emissions: " + (obj.co2Emissions !== undefined ? obj.co2Emissions : "Unknown");
            document.getElementById("lblEngineCapacity").textContent = "Engine Capacity: " + (obj.engineCapacity !== undefined ? obj.engineCapacity + "cc" : "Unknown");
            document.getElementById("lblFuelType").textContent = "Fuel Type: " + (obj.fuelType || "Unknown");
            document.getElementById("lblMarkedForExport").textContent = "Marked for Export: " + (obj.markedForExport !== undefined ? (obj.markedForExport ? "Yes" : "No") : "Unknown");
            document.getElementById("lblTypeApproval").textContent = "Type Approval: " + (obj.typeApproval || "Unknown");
            document.getElementById("lblYearOfManufacture").textContent = "Year of Manufacture: " + (obj.yearOfManufacture || "Unknown");
            document.getElementById("lblTaxDueDate").textContent = "Tax Due Date: " + formatDate(obj.taxDueDate);
            document.getElementById("lblDateOfLastV5CIssued").textContent = "Date of Last V5C Issued: " + formatDate(obj.dateOfLastV5CIssued);
            document.getElementById("lblWheelplan").textContent = "Wheelplan: " + (obj.wheelplan || "Unknown");
            document.getElementById("lblMonthOfFirstRegistration").textContent = "Month of First Registration: " + formatDate(obj.monthOfFirstRegistration);
            document.getElementById("lblRevenueWeight").textContent = "Revenue Weight: " + (obj.revenueWeight !== undefined ? obj.revenueWeight : "Unknown");

        } else {
            // Show error message
            document.getElementById("errorMessage").style.display = 'block';
        }
    } catch (error) {
        console.error("Error making request:", error);
        // Show error message
        document.getElementById("errorMessage").style.display = 'block';
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
