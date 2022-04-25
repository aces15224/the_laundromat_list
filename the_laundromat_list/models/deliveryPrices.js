module.exports = function(sequelize, DataTypes){
    var DeliveryPrices = sequelize.define("DeliveryPrices",{
        pickUpFee:{
            type:DataTypes.STRING,
        },
        freePickUp:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        pickUpMinimum:{
            type:DataTypes.STRING
        },
        deliveryPricePerLbs:{
            type:DataTypes.STRING
        },
        deliveryPricePerLbsDiscounted:{
            type:DataTypes.STRING
        },
        deliveryPrices1:{
            type:DataTypes.STRING
        },
        deliveryPrices2:{
            type:DataTypes.STRING
        },
        deliveryPrices3:{
            type:DataTypes.STRING
        },
        deliveryPrices4:{
            type:DataTypes.STRING
        },
        deliveryPrices5:{
            type:DataTypes.STRING
        },
        deliveryPrices6:{
            type:DataTypes.STRING
        },
        deliveryPrices7:{
            type:DataTypes.STRING
        },
        deliveryPrices8:{
            type:DataTypes.STRING
        },
        deliveryPrices9:{
            type:DataTypes.STRING
        },
        deliveryPrices10:{
            type:DataTypes.STRING
        },
        deliveryPrices11:{
            type:DataTypes.STRING
        },
        deliveryPrices12:{
            type:DataTypes.STRING
        },
        deliveryAddInfo:{
            type: DataTypes.TEXT,
        },
        deliveryAddInfo2:{
            type: DataTypes.TEXT,
        },
        deliveryAddInfo3:{
            type: DataTypes.TEXT,
        },
        sameDayService:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }, 
        sameDayInfo:{
            type: DataTypes.TEXT,
        }, 
        deliveryHours:{
            type:DataTypes.STRING 
        },
        pickUpHours:{
            type:DataTypes.STRING 
        },
        createdAt:{
            type:DataTypes.DATE

        }, 
        updatedAt:{
            type:DataTypes.DATE
        } 
    })
    DeliveryPrices.associate=function(models){
        DeliveryPrices.belongsTo(models.Establishment,{
            foreignKey: {
                allowNull: false
            } 
        })
    }
    return DeliveryPrices;
}