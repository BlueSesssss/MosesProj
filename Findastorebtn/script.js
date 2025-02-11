let map;

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 14.5995, lng: 120.9842 }, // Example: Manila, Philippines
        zoom: 12,
    });

    // Add a marker for a sample store
    new google.maps.Marker({
        position: { lat: 14.5995, lng: 120.9842 },
        map: map,
        title: "DonArc Store - Manila",
    });
}

function showMap() {
    document.getElementById('map-container').style.display = 'block';
}
