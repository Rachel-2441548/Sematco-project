function getLocation() {
    const resultDiv = document.getElementById("locationResult");

    // SEMATCO Coordinates
    const sematcoLat = 29.305081;
    const sematcoLng = 47.931058;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                const distance = calculateDistance(userLat, userLng, sematcoLat, sematcoLng);

                resultDiv.innerHTML = `<p>You are approximately <strong>${distance}</strong> away from SEMATCO.</p>`;
            },
            (error) => {
                console.error(error);
                resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
            }
        );
    } else {
        resultDiv.innerHTML = "<p>Your browser does not support geolocation.</p>";
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;

    return distanceKm < 1
        ? Math.round(distanceKm * 1000) + " meters"
        : distanceKm.toFixed(2) + " km";
}

function toRad(value) {
    return value * Math.PI / 180;
}
