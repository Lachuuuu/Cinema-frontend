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

export async function downloadAllHallsApi() {
    return await fetch(getApiUrl() + "hall/admin/all", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function addShowingApi(time, hall, movie, name) {
    return await fetch(getApiUrl() + "showing/admin/add", {
            method: "POST",
            body: JSON.stringify({
                movieId: movie,
                hallId: hall,
                showingStartTime: time,
                showingName: name
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function downloadAllShowingsApi() {
    return await fetch(getApiUrl() + "showing/admin/all", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function removeShowingApi(showingId) {
    return await fetch(getApiUrl() + "showing/admin/remove/" + showingId, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function updateShowingApi(showingId, name, hallId, movieId, startTime) {
    return await fetch(getApiUrl() + "showing/admin/update", {
            method: "PUT",
            body: JSON.stringify({
                showingId: showingId,
                movieId: movieId,
                hallId: hallId,
                showingStartTime: startTime,
                name: name
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}


export async function addHallApi(name, seatsMap) {
    return await fetch(getApiUrl() + "hall/admin/add", {
            method: "POST",
            body: JSON.stringify({
                seatsMap: seatsMap,
                name: name
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function removeHallApi(hallId) {
    return await fetch(getApiUrl() + "hall/admin/remove/" + hallId, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function removeMovieApi(movieId) {
    return await fetch(getApiUrl() + "movie/admin/remove/" + movieId, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function downloadAllGenresApi() {
    return await fetch(getApiUrl() + "genre/all", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function removeGenreApi(genreApi) {
    return await fetch(getApiUrl() + "genre/admin/remove?genreId=" + genreApi, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function addMovieApi(name, description, durationMin, premiereDate, genres, minAge, image) {
    return await fetch(getApiUrl() + "movie/admin/add", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                durationMin: durationMin,
                premiereDate: premiereDate,
                genres: genres,
                minAge: minAge,
                image: image
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}

export async function addGenreApi(name) {
    return await fetch(getApiUrl() + "genre/admin/add?name=" + name, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }
    )
}
