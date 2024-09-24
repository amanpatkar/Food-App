const fetch = require('node-fetch');

exports.getAllProduct = async (req, res, next) => {
    try {
        const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
            {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36', // Example user-agent
                    'Accept': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        res.status(200).json({
            message: 'Data fetched successfully!',
            data: data,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);

        res.status(500).json({
            error: {
                message: 'Fetching data failed!',
                details: error.message
            }
        });
    }
};
