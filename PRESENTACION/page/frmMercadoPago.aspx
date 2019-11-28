<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frmMercadoPago.aspx.cs" Inherits="PRESENTACION.page.frmMercadoPago" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
    <script type="text/javascript">
        debugger;
        Mercadopago.setPublishableKey("WORLDPETS-TEST-98638d24-eb00-4dd5-82d8-4e573fac6a80");
        //var key = Mercadopago.createToken("frmMercadoPago", tokenHandler);
        //Mercadopago.setPublishableKey(key);
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
