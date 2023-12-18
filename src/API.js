const API_URL= 'http://localhost:5000';

export async function logEnteries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return await response.json();
}

export async function createLogEntry(entry){

    console.log(entry);

    const response = await fetch(`${API_URL}/api/logs`,{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },

        body: JSON.stringify(entry),
    });

    return await response.json();
}