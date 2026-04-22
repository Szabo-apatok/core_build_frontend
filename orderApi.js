const BACKEND_URL = 'https://nodejs308.dszcbaross.edu.hu/orders';

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