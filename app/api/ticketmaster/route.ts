// app/api/ticketmaster/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { coordinates, miles, category, priceMin, priceMax } = await request.json();

        console.log('Received filters:', {
            coordinates,
            miles,
            category,
            priceMin,
            priceMax
        });

        // Build Ticketmaster API URL
        const params = new URLSearchParams({
            apikey: process.env.TICKETMASTER_API_KEY!,
            latlong: `${coordinates.latitude},${coordinates.longitude}`,
            radius: miles?.toString() || '10',
            unit: 'miles',
            size: '50',
            sort: 'date,asc'
        });

        if (category) params.append('classificationName', category);
        if (priceMin) params.append('priceMin', priceMin.toString());
        if (priceMax) params.append('priceMax', priceMax.toString());

        const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?${params}`;
        if (priceMin == "undefined" || priceMax == "undefined" || category == undefined || miles == undefined || coordinates == undefined) {

        } else {
            console.log('Calling Ticketmaster API:', apiUrl);
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Log sample results
        if (data._embedded?.events) {
            console.log('First event:', {
                name: data._embedded.events[0]?.name,
                venue: data._embedded.events[0]?._embedded?.venues?.[0]?.name,
                date: data._embedded.events[0]?.dates?.start?.localDate
            });
        }

        return NextResponse.json({
            success: true,
            events: data._embedded?.events || [],
            total: data.page?.totalElements || 0
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}