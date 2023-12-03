const config = require('./shippingConfig');
const sql = require('mssql');

const getDeliveryPersonDetails = async (ID) => {
    try {
        let pool = await sql.connect(config);
        let deliveryPerson = await pool.request().query(`
            SELECT * FROM DeliveryPersonDetails WHERE DeliveryPersonID = '${ID}'
        `);
        return deliveryPerson;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const newDeliveryPerson = async (DeliveryPersonDetails) => {
    try {
        let pool = await sql.connect(config);
        let deliveryPerson = await pool
            .request()
            .query(`
                INSERT INTO DeliveryPersonDetails 
                VALUES (
                    '${DeliveryPersonDetails.DeliveryPersonID}',
                    '${DeliveryPersonDetails.FirstName}',
                    '${DeliveryPersonDetails.LastName}',
                    '${DeliveryPersonDetails.ContactNumber}',
                    '${DeliveryPersonDetails.Email}',
                    '${DeliveryPersonDetails.VehicleID}'
                )
            `);
        return deliveryPerson;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const fetchOrdersByDeliveryPersonID = async (deliveryPersonID) => {
    try {

        let pool = await sql.connect(config);
        let orders = await pool.request().query(`
            SELECT ord.OrderID,ord.OrderStatus,ord.DeliveryDate,ord.EstimatedDeliveryTime,ord.ActualDeliveryTime,pt.PName,pt.PAddress,pt.ContactNumber FROM Orders ord JOIN PickUpPoints pt ON pt.PickUpPointID = ord.PickUpPointID WHERE DeliveryPersonID = '${deliveryPersonID}'
        `);
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteOrder = async (orderid) => {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request().query(`
            Delete from Orders WHERE OrderID  = '${orderid}'
        `);
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deletePerson=async(personId)=>{
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request().query(`
            Delete from DeliveryPersonDetails WHERE DeliveryPersonID  = '${personId}'
        `);
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getDeliveryPersonDetails,
    newDeliveryPerson,
    fetchOrdersByDeliveryPersonID,
    deleteOrder,
    deletePerson
};
