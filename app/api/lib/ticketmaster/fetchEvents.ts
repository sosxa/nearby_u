export async function fetchEvents(
    date: string,
    lat: number,
    lng: number,
    radius: number = 50,
    unit: 'miles'
) {
    const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json');

    url.searchParams.set('apikey', process.env.NEXT_PRIVATE_TICKETMASTER_CONSUMER_SECRET!);
    url.searchParams.set('startDateTime', `${date}T00:00:00Z`);
    url.searchParams.set('endDateTime', `${date}T23:59:59Z`);
    url.searchParams.set('latlong', `${lat},${lng}`);
    url.searchParams.set('radius', radius.toString());
    url.searchParams.set('unit', unit);
    url.searchParams.set('sort', 'distance,asc'); // Closest events first

    try {
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data._embedded?.events || [];
    } catch (error) {
        console.error('Ticketmaster fetch failed:', error);
        return [];
    }
}
