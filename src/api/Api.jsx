import getApiUrl from "./ApiUrl";

export async function logoutApi() {
    await fetch(getApiUrl() + "auth/logout", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function getUserByTokenApi() {
    return await fetch(getApiUrl() + "user/userByToken", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function downloadAllMoviesApi() {
    return await fetch(getApiUrl() + "movie/all", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function updateEmailApi(oldValue, newValue) {
    return await fetch(getApiUrl() + "user/change/email", {
            method: "POST",
            body: JSON.stringify({
                oldValue: {oldValue}.oldValue,
                newValue: {newValue}.newValue,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function updateFirstNameApi(oldValue, newValue) {
    return await fetch(getApiUrl() + "user/change/first_name", {
            method: "POST",
            body: JSON.stringify({
                oldValue: {oldValue}.oldValue,
                newValue: {newValue}.newValue,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function tryToActivateAccountApi(token) {
    return await fetch(getApiUrl() + "auth/confirm-account?token=" + token, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export async function downloadMovieByIdApi(id) {
    return await fetch(getApiUrl() + "movie/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function makeReservationApi(seats, normal, discount, showingId) {
    return await fetch(getApiUrl() + "reservation/add", {
            method: "POST",
            body: JSON.stringify({
                seatIds: seats,
                normal: normal,
                discount: discount,
                showingId: showingId
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function searchApi(query) {
    return await fetch(getApiUrl() + "search/" + query, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function getUserReservationsApi() {
    return await fetch(getApiUrl() + "reservation/user", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}