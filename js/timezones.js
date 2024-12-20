// timezones.js

document.addEventListener('DOMContentLoaded', async () => {
    const timeZoneSelect = document.getElementById('timezone');
    console.log('Timezone select element:', timeZoneSelect);

    const timeZones = [
        // North America
        { value: 'UTC', label: 'UTC' },
        { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
        { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
        { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
        { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
        { value: 'America/Anchorage', label: 'Alaska (US)' },
        { value: 'Pacific/Honolulu', label: 'Hawaii (US)' },
        { value: 'America/Toronto', label: 'Toronto' },
        { value: 'America/Vancouver', label: 'Vancouver' },
        { value: 'America/Mexico_City', label: 'Mexico City' },

        // South America
        { value: 'America/Sao_Paulo', label: 'São Paulo' },
        { value: 'America/Buenos_Aires', label: 'Buenos Aires' },
        { value: 'America/Santiago', label: 'Santiago' },

        // Europe
        { value: 'Europe/London', label: 'London' },
        { value: 'Europe/Paris', label: 'Paris' },
        { value: 'Europe/Berlin', label: 'Berlin' },
        { value: 'Europe/Moscow', label: 'Moscow' },
        { value: 'Europe/Istanbul', label: 'Istanbul' },
        { value: 'Europe/Rome', label: 'Rome' },
        { value: 'Europe/Madrid', label: 'Madrid' },

        // Asia
        { value: 'Asia/Shanghai', label: 'Shanghai' },
        { value: 'Asia/Tokyo', label: 'Tokyo' },
        { value: 'Asia/Singapore', label: 'Singapore' },
        { value: 'Asia/Dubai', label: 'Dubai' },
        { value: 'Asia/Seoul', label: 'Seoul' },
        { value: 'Asia/Kolkata', label: 'Mumbai/New Delhi' },
        { value: 'Asia/Bangkok', label: 'Bangkok' },
        { value: 'Asia/Hong_Kong', label: 'Hong Kong' },

        // Oceania
        { value: 'Australia/Sydney', label: 'Sydney' },
        { value: 'Australia/Melbourne', label: 'Melbourne' },
        { value: 'Australia/Perth', label: 'Perth' },
        { value: 'Pacific/Auckland', label: 'Auckland' },

        // Africa
        { value: 'Africa/Cairo', label: 'Cairo' },
        { value: 'Africa/Johannesburg', label: 'Johannesburg' },
        { value: 'Africa/Lagos', label: 'Lagos' },
        { value: 'Africa/Nairobi', label: 'Nairobi' }
    ];

    console.log('Number of timezones:', timeZones.length);
    
    // Clear any existing options
    timeZoneSelect.innerHTML = '';
    
    // Sort the timezones by label for better UX
    timeZones.sort((a, b) => a.label.localeCompare(b.label));

    timeZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone.value;
        option.textContent = zone.label;
        timeZoneSelect.appendChild(option);
    });

    console.log('Final number of options:', timeZoneSelect.options.length);

    // Get timezone from IP
    try {
        const response = await fetch('http://worldtimeapi.org/api/ip');
        const data = await response.json();
        const ipTimezone = data.timezone;
        
        if (ipTimezone && timeZones.some(tz => tz.value === ipTimezone)) {
            timeZoneSelect.value = ipTimezone;
        } else {
            // Fallback to browser's timezone
            timeZoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        }
    } catch (error) {
        console.error('Error detecting timezone:', error);
        // Fallback to browser's timezone
        timeZoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    }
});
