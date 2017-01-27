var crypto = require('crypto');

// Definicion de la clase User:


        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
      },
      { instanceMethods: {
          verifyPassword: function (password) {
            return encryptPassword(password, this.salt) === this.password;
          }
        }    
      });
};


/*
 * Encripta un password en claro.
 * Mezcla un password en claro con el salt proporcionado, ejecuta un SHA1 digest, 
 * y devuelve 40 caracteres hexadecimales.
 */
function encryptPassword(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};