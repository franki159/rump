﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public static class EUtil
    {
        public static string getMd5Hash(string texto)
        {
            string key = "ABCDEFGHIJKLMÃ‘OPQRSTUVWXYZabcdefghijklmnÃ±opqrstuvwxyz";
            byte[] keyArray;
            byte[] Arreglo_a_Cifrar = UTF8Encoding.UTF8.GetBytes(texto);
            MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
            keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
            hashmd5.Clear();
            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tdes.CreateEncryptor();
            byte[] ArrayResultado = cTransform.TransformFinalBlock(Arreglo_a_Cifrar, 0, Arreglo_a_Cifrar.Length);
            tdes.Clear();
            return Convert.ToBase64String(ArrayResultado, 0, ArrayResultado.Length);
        }

        static string key = "charpeTechnologyABCD51234PQRSWXYZabcd8528opqryz";

        public static string getEncriptar(string cadena)
        {
            //arreglo de bytes donde guardaremos la llave
            byte[] keyArray;
            //arreglo de bytes donde guardaremos el texto
            //que vamos a encriptar
            byte[] Arreglo_a_Cifrar = UTF8Encoding.UTF8.GetBytes(cadena);

            //se utilizan las clases de encriptación
            //provistas por el Framework
            //Algoritmo MD5
            MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
            //se guarda la llave para que se le realice
            //hashing
            keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

            hashmd5.Clear();

            //Algoritmo 3DAS
            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();

            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            //se empieza con la transformación de la cadena
            ICryptoTransform cTransform = tdes.CreateEncryptor();

            //arreglo de bytes donde se guarda la
            //cadena cifrada
            byte[] ArrayResultado = cTransform.TransformFinalBlock(Arreglo_a_Cifrar, 0, Arreglo_a_Cifrar.Length);

            tdes.Clear();

            //se regresa el resultado en forma de una cadena
            return Convert.ToBase64String(ArrayResultado, 0, ArrayResultado.Length);

        }

        public static string getDesencriptar(string clave)
        {
            try
            {
                byte[] keyArray;
                //convierte el texto en una secuencia de bytes
                byte[] Array_a_Descifrar = Convert.FromBase64String(clave);

                //se llama a las clases que tienen los algoritmos
                //de encriptación se le aplica hashing
                //algoritmo MD5
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();

                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

                hashmd5.Clear();

                TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();

                tdes.Key = keyArray;
                tdes.Mode = CipherMode.ECB;
                tdes.Padding = PaddingMode.PKCS7;

                ICryptoTransform cTransform = tdes.CreateDecryptor();

                byte[] resultArray = cTransform.TransformFinalBlock(Array_a_Descifrar, 0, Array_a_Descifrar.Length);

                tdes.Clear();
                //se regresa en forma de cadena
                return UTF8Encoding.UTF8.GetString(resultArray);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }

        public static string encriptaPHP(string _key24, string _iv, string _data)
        {
            byte[] key = Encoding.ASCII.GetBytes(_key24);

            byte[] iv = Encoding.ASCII.GetBytes(_iv);

            byte[] data = Encoding.ASCII.GetBytes(_data);

            byte[] enc = new byte[0];

            TripleDES tdes = TripleDES.Create();



            tdes.Mode = CipherMode.CBC;

            tdes.Padding = PaddingMode.Zeros;

            tdes.IV = iv;

            tdes.Key = key;



            ICryptoTransform ict = tdes.CreateEncryptor();

            enc = ict.TransformFinalBlock(data, 0, data.Length);

            return Convert.ToBase64String(enc);

        }

        public static string desencriptaPHP(string _key24, string _iv, string _data)
        {

            byte[] key = Encoding.ASCII.GetBytes(_key24);

            byte[] iv = Encoding.ASCII.GetBytes(_iv);

            byte[] data = Convert.FromBase64String(_data);

            byte[] enc = new byte[0];

            TripleDES tdes = TripleDES.Create();



            tdes.Mode = CipherMode.CBC;

            tdes.Padding = PaddingMode.Zeros;

            tdes.IV = iv;

            tdes.Key = key;



            ICryptoTransform ict = tdes.CreateDecryptor();

            enc = ict.TransformFinalBlock(data, 0, data.Length);

            string retorno = Encoding.ASCII.GetString(enc);

            retorno = retorno.Replace("\0", "");

            return retorno;

        }

        public static DateTime getFechaValida(DateTime fecha)
        {
            return (fecha <= new DateTime(1900, 12, 31) ? new DateTime(1900, 1, 1) : fecha);
        }

        public static string retornaDecimalToString(string valor)
        {
            if (valor.Contains("."))
            {
                return valor.Replace(",", "");
            }
            else if (valor.Contains(",") && valor.Contains("."))
            {
                return valor.Replace(".", "").Replace(",", ".");
            }
            else if (valor.Contains(","))
            {
                return valor.Replace(",", ".");
            }
            else
            {
                return valor;
            }
        }
    }
}
