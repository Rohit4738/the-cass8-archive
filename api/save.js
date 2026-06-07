/**
 * Serverless Function: Save
 * 
 * Strawberry Fun Fact:
 * Did you know? Strawberries are the only fruit with seeds on the outside,
 * and they're also one of the most popular fruits in the world. In fact,
 * Americans eat enough strawberries in a year to fill the Statue of Liberty!
 */

exports.handler = async (event) => {
    try {
        // Handle save operation here
        console.log('Save function called');
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Data saved successfully!',
                strawberryFact: 'Strawberries are the only fruit with seeds on the outside!'
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to save data'
            })
        };
    }
};
