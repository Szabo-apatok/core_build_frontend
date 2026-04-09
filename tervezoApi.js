const BACKEND_URL = 'http://localhost:4000/tervezo';

export async function fetchProcessors() {
    const res = await fetch(`${BACKEND_URL}/processors`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data;
};

export async function fetchFans() {
    const res = await fetch(`${BACKEND_URL}/fans`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data
}

export async function fetchCases() {
    const res = await fetch(`${BACKEND_URL}/cases`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data;
}

export async function fetchPowerSupplies() {
    const res = await fetch(`${BACKEND_URL}/tapegyseg`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data;
}

export async function fetchCoolings() {
    const res = await fetch(`${BACKEND_URL}/coolings`, {
        method: 'GET',
        credentials: 'include',
    });
    const data = await res.json();

    return data;
}

export async function fetchStorages() {
    const res = await fetch(`${BACKEND_URL}/storages`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data;
}

export async function fetchBoards() {
    const res = await fetch(`${BACKEND_URL}/boards`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data;
}

export async function fetchRAM() {
    const res = await fetch(`${BACKEND_URL}/ram`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data;
}

export async function fetchGraphicsCards() {
    const res = await fetch(`${BACKEND_URL}/graphicsCard`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await res.json();

    return data;
}