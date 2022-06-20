module.exports = function(sequelize, DataTypes){
    var PopularTimes = sequelize.define("PopularTimes",{
        Mo:{
            type:DataTypes.JSON
        },
        Tu:{
            type:DataTypes.JSON
        },
        We:{
            type:DataTypes.JSON
        },
        Th:{
            type:DataTypes.JSON
        },
        Fr:{
            type:DataTypes.JSON
        },
        Sa:{
            type:DataTypes.JSON
        },
        Su:{
            type:DataTypes.JSON
        },
       
        createdAt:{
            type:DataTypes.DATE
        }, 
        updatedAt:{
            type:DataTypes.DATE
        }
    })
    PopularTimes.associate=function(models){
        PopularTimes.belongsTo(models.Establishment,{
            foreignKey: {
                allowNull: false
            } 
        })
    }
    return PopularTimes;
}