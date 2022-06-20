module.exports = function(sequelize, DataTypes){
    var DropOffPrices = sequelize.define("DropOffPrices",{
        dropOffPriceMinimum:{
            type:DataTypes.STRING,
            defaultValue: "Enter Info"
        },
        dropOffPricePerLb:{
            type:DataTypes.STRING
        }, 
    
        dropOffPrices:{
            type:DataTypes.STRING
        },
        dropOffPrices2:{
            type:DataTypes.STRING
        },
        dropOffPrices3:{
            type:DataTypes.STRING
        },
        dropOffPrices4:{
            type:DataTypes.STRING
        },
        dropOffPrices5:{
            type:DataTypes.STRING
        },
        dropOffPrices6:{
            type:DataTypes.STRING
        },
        dropOffPrices7:{
            type:DataTypes.STRING
        },
        dropOffPrices8:{
            type:DataTypes.STRING
        },
        dropOffPrices9:{
            type:DataTypes.STRING
        },
        dropOffPrices10:{
            type:DataTypes.STRING
        },
        dropOffPrices11:{
            type:DataTypes.STRING
        },
        dropOffPrices12:{
            type:DataTypes.STRING
        },
        dropOffPrices13:{
            type:DataTypes.STRING
        },
        dropOffPrices14:{
            type:DataTypes.STRING
        },
        dropOffPrices15:{
            type:DataTypes.STRING
        },
        dropOffAddInfo:{
            type: DataTypes.TEXT,
        },
        dropOffAddInfo2:{
            type: DataTypes.TEXT,
        },
        sameDayService:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }, 
        sameDayInfo:{
            type: DataTypes.TEXT,
        },
        createdAt:{
            type:DataTypes.DATE
        }, 
        updatedAt:{
            type:DataTypes.DATE
        }
    })
    DropOffPrices.associate=function(models){
        DropOffPrices.belongsTo(models.Establishment,{
            foreignKey: {
                allowNull: false
            } 
        })
    }
    return DropOffPrices;
}