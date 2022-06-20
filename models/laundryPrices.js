module.exports = function(sequelize, DataTypes){
    var LaundryPrices = sequelize.define("LaundryPrices", {
    // washing rates
        washerSingle:{
            type:DataTypes.STRING,
        },
        washerDouble:{
            type:DataTypes.STRING
        },
        washerTriple:{
            type:DataTypes.STRING
        },
        washerFour:{
            type:DataTypes.STRING
        },
        washerFive:{
            type:DataTypes.STRING
        },
        washerSix:{
            type:DataTypes.STRING
        },
        washerSeven:{
            type:DataTypes.STRING
        },
        washerEight:{
            type:DataTypes.STRING
        },
        washerOptional1:{
            type:DataTypes.STRING
        },
        washerOptional2:{
            type:DataTypes.STRING
        },
        washerOptional3:{
            type:DataTypes.STRING
        },


    // dryer rates
        dryerRate1:{
            type:DataTypes.STRING
        },
        dryerRate2:{
            type:DataTypes.STRING
        },
        dryerRate3:{
            type:DataTypes.STRING
        },
        dryerRate4:{
            type:DataTypes.STRING
        },
        dryerRate5:{
            type:DataTypes.STRING
        },
        dryerRate6:{
            type:DataTypes.STRING
        },
        dryerRate7:{
            type:DataTypes.STRING
        },

        laundryAddInfo:{
            type: DataTypes.TEXT,
        },

    // timestamps

        createdAt:{
            type:DataTypes.DATE
        }, 
        updatedAt:{
            type:DataTypes.DATE
        },
    })

    LaundryPrices.associate=function(models){
        LaundryPrices.belongsTo(models.Establishment,{
            foreignKey: {
                allowNull: false
            } 
        })
    }
    return LaundryPrices;
}
