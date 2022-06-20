module.exports = function(sequelize, DataTypes){
    var Establishment = sequelize.define("Establishment", {
        businessName:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        
        wifi:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        categoryName:{
            type: DataTypes.STRING,
        },

        businessAddress:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        website:{
            type: DataTypes.STRING,
        },

        phone:{
            type: DataTypes.STRING,
            unique: true,
        },

        businessUrl:{
            type: DataTypes.STRING,
            unique: true,
        },

        businessLocation:{
            type: DataTypes.STRING,
            unique: true,
        },

        imageUrl:{
            type: DataTypes.STRING,
            unique: true,
        },

        atm:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        card:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        cardOrCoin:{
            type: DataTypes.STRING,
        },
        
        laundry:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        dropOff:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        options:{
            type: DataTypes.STRING,
        },

        zip:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [5],
                isInt: true
            }  
        },
        
        overview:{
            type: DataTypes.TEXT,
        },
        
        city:{
            type: DataTypes.STRING,
            allowNull: false,  
        },

        businessHours:{
            type: DataTypes.STRING,
        },

        supplies:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        promotions:{
            type: DataTypes.STRING,
        },
        
        delivery:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dryCleaning:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        //Business can be shown in results
        verified:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        //Owner has claimed Business
        claimed:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        //verification code for claiming business
        claimCode:{
            type: DataTypes.STRING,
        },
        createdAt:{
            type:DataTypes.DATE

        }, 
        updatedAt:{
            type:DataTypes.DATE
        } 
    })

    Establishment.associate=function(models){
        Establishment.hasOne(models.BusinessUser, {
            onDelete: "cascade"       
        });
        Establishment.hasOne(models.LaundryPrices, {
            onDelete: "cascade"
        });
        Establishment.hasOne(models.DropOffPrices, {
            onDelete: "cascade"
        });
        Establishment.hasOne(models.DeliveryPrices, {
            onDelete: "cascade"
        });
        Establishment.hasOne(models.DryCleaningPrices, {
            onDelete: "cascade"
        });
        Establishment.hasOne(models.PopularTimes, {
            onDelete: "cascade"
        });
    };

    return Establishment;
};


