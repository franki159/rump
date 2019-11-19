

function mAlertMsg(msj, tipo) {
    debugger;
    if (tipo == 0) { //OK
        swal(
			'Good!',
			msj,
			'success'
		)
    }
    else
        if (tipo == 1) {//ERROR
            swal(
				'Ups!',
				msj,
				'error'
			)
        }
        else
            if (tipo == 2) {//ADVERTENCIA
                swal(
					'Warning!',
					msj,
					'warning'
				)
            }
}