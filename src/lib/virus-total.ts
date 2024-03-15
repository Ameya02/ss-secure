// @ts-nocheck
export async function scanUrl(url: string): Promise<any> {

    const apiUrl = `https://www.virustotal.com/api/v3/urls?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': process.env.VIRUS_TOTAL_API_KEY,
        },
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch: ${response.status}. ${errorText}`);
    }

    return response.json();
}


export async function scanFile(file: File) {
    const apiUrl = "https://www.virustotal.com/api/v3/files";

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-apikey': process.env.VIRUS_TOTAL_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch: ${response.status}. ${errorText}`);
        }

        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send file to Virustotal API');
    }
}
