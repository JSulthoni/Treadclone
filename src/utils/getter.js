export const getTags = async() => {
    const res = await fetch('http://localhost:3000/api/tags', {
        cache: 'no-store'
    })
    
    if (!res.ok) {
        throw new Error('Failed to get tags')
    }
    const data = await res.json();
    console.log('Popular tags: ', data);
    return data;
};


export const getPopular = async() => {
    const res = await fetch(`http://localhost:3000/api/posts?sort=views&limit=10`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to get popular post')
    }
    const data = await res.json();
    console.log('Popular post: ', data);
    return data;
}

export const getUser = async() => {
    const res = await fetch('http://localhost:3000/api/user?sort=post&limit=3', {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to get popular user')
    }
    const data = await res.json();
    console.log('Popular user: ', data);
    return data;
}