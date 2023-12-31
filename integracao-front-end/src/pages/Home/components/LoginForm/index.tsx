import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { showSnackbar } from '../../../../store/modules/Snackbar/snackbarSlice';
import { logarUsuario } from '../../../../store/modules/User/userSlice';

export const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const estadoUser = useAppSelector((estado) => estado.users);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (estadoUser.user.logged) {
			navigate('/dashboard');
		}
	}, [estadoUser, navigate]);

	function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();

		if (!email || !senha) {
			dispatch(
				showSnackbar({
					mensagem: 'Insira um email e senha para continuar',
					tipo: 'warning',
				}),
			);
			return;
		}

		const userLogged = {
			email: email,
			password: senha,
		};

		dispatch(logarUsuario(userLogged));
	}

	return (
		<Box
			component={'form'}
			marginX={'auto'}
			width={'80%'}
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
			justifyContent={'center'}
			onSubmit={(ev) => handleLogin(ev)}
			gap={3}
		>
			<TextField
				label={'Email'}
				variant="standard"
				sx={{
					'&:focus': {
						color: 'black',
					},
				}}
				type="email"
				onChange={(ev) => setEmail(ev.target.value)}
				fullWidth
			></TextField>
			<TextField
				label={'Senha'}
				variant="standard"
				fullWidth
				type="password"
				onChange={(ev) => setSenha(ev.target.value)}
			></TextField>
			<Button
				fullWidth
				type="submit"
				variant="contained"
				sx={{
					padding: '16px',
					borderRadius: '100px',
					background: '#576CA8',

					'&:hover': {
						background: '#F786AA',
					},
				}}
			>
				Entrar
			</Button>
		</Box>
	);
};
