
import './LoginPage.css';

export const LoginPage = () => {
	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
							/>
						</div>
						<div className="d-flex mb-2 justify-content-center">
							<input
							
								type="submit"
								className="btnSubmit mt-4"
								value="Iniciar Sesion"
							/>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
							/>
						</div>

						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
							/>
						</div>

						<div className="form-group d-flex mb-2 justify-content-center">
							<input
								type="submit"
								className="btnSubmit mt-4"
								value="Crear cuenta"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
