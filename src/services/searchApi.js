const searchAPI = async (data) =>{
    const {specialization, limit, filter, page=1} = data;
    try{
        console.log(`Fetching coaches: page=${page}, limit=${limit}`);
        let url = `${API_BASE_URL}/coach/search?page=${page}`
        if (specialization){
            url+=`&specialization=${specialization}`
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching coaches:', error);
        return {
            success: false,
            message: error.message,
            data: {
                data: [],
                total_results: 0
            }
        }
    }
}
