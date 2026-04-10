const BACKEND_URL = 'http://localhost:4000/orders';

export async function createOrder(productId, quantity, paymentMethod) {
    const res = await fetch(`${BACKEND_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ product_id: productId, quantity: quantity, fizetesi_mod: paymentMethod })
    });

    const data = await res.json();

    return { ok: res.ok, data };
}