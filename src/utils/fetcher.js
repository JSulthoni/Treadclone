const fetcher = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error(data.message)
        throw error;
    }

    const data = await res.json()
    return data;
};

export default fetcher;