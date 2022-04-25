module.exports = function(sequelize, DataTypes) {
    var BusinessUser = sequelize.define("BusinessUser", {
        email:{
            type: DataTypes.STRING,
            // primaryKey: true,
            allowNull: false,
            validate:{
                len: [1,100],
                isEmail: true, 
            },
        },
        businessAddress:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        businessName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        businessPhone:{
            type: DataTypes.STRING,
            allowNull:false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName:{
           type: DataTypes.STRING,
           allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1, 15]
            }
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [10],
            },
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[5,65]
                // include regex validation
            }
        },
        isVerified:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        createdAt:{
            type:DataTypes.DATE

        }, 
        updatedAt:{
            type:DataTypes.DATE
        } 
    });
    BusinessUser.associate = function(models){
        BusinessUser.belongsTo(models.Establishment, {
            foreignKey: {
                allowNull: false
            }        
        });
    };
    return BusinessUser;
}