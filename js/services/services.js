const postData = async (url, data) => { // Постим запросы с формы
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data // JSON объект
    });
    return await res.json();
};

const getResource = async (url) => { // получаем данные для карты c сервера  , функция асинхронная
    const res = await fetch(url);
    if (!res.ok) { // в случае если get запрос не пройдёт
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json(); // 
};

export {
    postData
};

export {
    getResource
};