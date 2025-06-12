type LocationDetails = {
    longitude: number;
    latitude: number;
};

export function getLocation(): Promise<LocationDetails[]> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
                const lat: number = position.coords.latitude;
                const lng: number = position.coords.longitude;

                resolve([{ longitude: lng, latitude: lat }]);
            },
            (error: GeolocationPositionError) => {
                let errorMessage = "An unknown error occurred.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Permission denied.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}