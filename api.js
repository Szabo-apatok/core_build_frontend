const BACKEND_URL = '/users';

export async function register(email, username, password, phone) {
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({ email, username, password, phone })
    });

    const data = await res.json();

    return data
}

export async function login(email, password) {
    const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    return data
}

// valami