const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-bac-2',
    headers: {
        authorization: 'a5ca42b5-c1b9-4110-bd5e-3093d482a010',
        'Content-Type': 'application/json'
    }
}

const createRequest = (url, method, body) => {
    return fetch(`${config.baseUrl}${url}`, {
        method: method,
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

const getInitialCards = () => {
    return createRequest('/cards', 'GET');
}

const getUser = () => {
    return createRequest('/users/me', 'GET');
}

const editUser = (name, about) => {
    return createRequest('/users/me', 'PATCH', {name, about});
}

const editAvatar = (link) => {
    return createRequest('/users/me/avatar', 'PATCH', {avatar: link});
}

const addCard = (name, link) => {
    return createRequest('/cards', 'POST', {name, link});
}

const addLike = (cardId) => {
    return createRequest(`/cards/likes/${cardId}`, 'PUT');
}

const deleteLike = (cardId) => {
    return createRequest(`/cards/likes/${cardId}`, 'DELETE');
}

const changeLikeStatus = (cardId, isLiked) => {
    if (isLiked) {
        return deleteLike(cardId);
    } else {
        return addLike(cardId);
    }
}

const deleteCard = (cardId) => {
    return createRequest(`/cards/${cardId}`, 'DELETE');
}

export {getInitialCards, getUser, editUser, addCard, changeLikeStatus, deleteCard as deleteCardApi, editAvatar};